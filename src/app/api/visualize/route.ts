import { NextRequest, NextResponse } from 'next/server'

interface ExecutionStep {
  line: number
  variables: Record<string, any>
  output: string
  explanation: string
  arrayState?: Array<{ index: number; value: any; highlighted?: boolean }>
  conditionResult?: boolean
}

interface Variable {
  name: string
  value: any
  type: string
}

class JavaInterpreter {
  private variables: Map<string, Variable> = new Map()
  private output: string = ''
  private steps: ExecutionStep[] = []
  private lines: string[] = []
  private currentLine: number = 0
  private arrayStates: Map<string, any[]> = new Map()

  constructor(code: string) {
    this.lines = code.split('\n').map(line => line.trim())
  }

  private addStep(line: number, explanation: string, arrayState?: any[], conditionResult?: boolean) {
    const vars: Record<string, any> = {}
    this.variables.forEach((variable, name) => {
      vars[name] = variable.value
    })

    this.steps.push({
      line: line + 1, // 1-indexed for display
      variables: { ...vars },
      output: this.output,
      explanation,
      arrayState,
      conditionResult,
    })
  }

  private evaluatePrintExpression(expr: string): string {
    // Handle string concatenation (e.g., "i + \" \"" or "i + ' '")
    expr = expr.trim()
    
    // If it's a simple string literal, return it
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1)
    }
    
    // Handle concatenation with +
    if (expr.includes('+')) {
      const parts = expr.split('+').map(p => p.trim())
      let result = ''
      
      for (const part of parts) {
        if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
          result += part.slice(1, -1)
        } else {
          const evaluated = this.evaluateExpression(part)
          result += String(evaluated)
        }
      }
      
      return result
    }
    
    // Otherwise, evaluate as expression and convert to string
    return String(this.evaluateExpression(expr))
  }

  private evaluateExpression(expr: string): any {
    expr = expr.trim()
    
    // Handle string literals
    if (expr.startsWith('"') && expr.endsWith('"')) {
      return expr.slice(1, -1)
    }
    
    // Handle numbers
    if (/^-?\d+$/.test(expr)) {
      return parseInt(expr, 10)
    }
    
    // Handle variable references
    if (this.variables.has(expr)) {
      return this.variables.get(expr)!.value
    }
    
    // Handle array access (e.g., arr[0])
    const arrayAccessMatch = expr.match(/^(\w+)\[(\d+)\]$/)
    if (arrayAccessMatch) {
      const arrayName = arrayAccessMatch[1]
      const index = parseInt(arrayAccessMatch[2], 10)
      const array = this.arrayStates.get(arrayName)
      if (array && array[index] !== undefined) {
        return array[index]
      }
    }
    
    // Handle simple arithmetic (e.g., "i + 1", "i <= 5")
    try {
      // Replace variables with their values
      let evalExpr = expr
      this.variables.forEach((variable, name) => {
        // Use word boundary to avoid partial matches (e.g., "i" shouldn't match "if")
        const regex = new RegExp(`\\b${name}\\b`, 'g')
        evalExpr = evalExpr.replace(regex, String(variable.value))
      })
      
      // Handle array access in expressions (e.g., arr[i])
      const arrayMatches = evalExpr.match(/(\w+)\[(\w+|\d+)\]/g)
      if (arrayMatches) {
        arrayMatches.forEach(match => {
          const matchResult = match.match(/(\w+)\[(\w+|\d+)\]/)
          if (matchResult) {
            const [, arrName, idxExpr] = matchResult
            const idx = /^\d+$/.test(idxExpr) ? parseInt(idxExpr, 10) : this.evaluateExpression(idxExpr)
            const arr = this.arrayStates.get(arrName)
            if (arr && typeof idx === 'number' && arr[idx] !== undefined) {
              evalExpr = evalExpr.replace(match, String(arr[idx]))
            }
          }
        })
      }
      
      // Evaluate safely (only numbers and basic operators)
      // Check if expression contains only safe characters after variable replacement
      if (/^[\d+\-*/().<=>!&\s]+$/.test(evalExpr)) {
        // Use Function constructor to evaluate the expression safely
        // This handles comparisons like <=, >=, ==, != correctly
        try {
          return Function(`"use strict"; return (${evalExpr})`)()
        } catch (e) {
          // If evaluation fails, try to parse as boolean
          if (evalExpr.includes('<=') || evalExpr.includes('>=') || evalExpr.includes('==') || evalExpr.includes('!=')) {
            // For comparisons, we need to handle them specially
            if (evalExpr.includes('<=')) {
              const parts = evalExpr.split('<=')
              if (parts.length === 2) {
                return Number(parts[0].trim()) <= Number(parts[1].trim())
              }
            }
            if (evalExpr.includes('>=')) {
              const parts = evalExpr.split('>=')
              if (parts.length === 2) {
                return Number(parts[0].trim()) >= Number(parts[1].trim())
              }
            }
            if (evalExpr.includes('==')) {
              const parts = evalExpr.split('==')
              if (parts.length === 2) {
                return Number(parts[0].trim()) === Number(parts[1].trim())
              }
            }
            if (evalExpr.includes('!=')) {
              const parts = evalExpr.split('!=')
              if (parts.length === 2) {
                return Number(parts[0].trim()) !== Number(parts[1].trim())
              }
            }
          }
        }
      }
    } catch (e) {
      // If evaluation fails, return the original expression
    }
    
    return expr
  }

  private parseArrayInitializer(init: string): any[] {
    // Handle {1, 2, 3} format
    const match = init.match(/\{([^}]+)\}/)
    if (match) {
      return match[1].split(',').map(item => this.evaluateExpression(item.trim()))
    }
    return []
  }

  interpret(): ExecutionStep[] {
    try {
      // Find main method
      let inMain = false
      let braceCount = 0
      
      for (let i = 0; i < this.lines.length; i++) {
        const line = this.lines[i]
        
        // Skip empty lines and comments
        if (!line || line.startsWith('//') || line.startsWith('/*')) continue
        
        // Check if we're entering main method
        if (line.includes('public static void main')) {
          inMain = true
          braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
          continue
        }
        
        if (!inMain) continue
        
        // Track braces
        braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
        
        // Exit main method
        if (braceCount <= 0 && inMain) {
          break
        }
        
        // Parse variable declaration (e.g., "int x = 5;")
        const varDeclMatch = line.match(/(int|String|double|float|boolean)\s+(\w+)\s*=\s*(.+?);/)
        if (varDeclMatch) {
          const [, type, name, value] = varDeclMatch
          const evaluatedValue = this.evaluateExpression(value)
          this.variables.set(name, { name, value: evaluatedValue, type })
          this.addStep(i, `Declaring ${type} variable ${name} = ${evaluatedValue}`)
          continue
        }
        
        // Parse array declaration (e.g., "int[] arr = {1, 2, 3};")
        const arrayDeclMatch = line.match(/(int|String)\[\]\s+(\w+)\s*=\s*(.+?);/)
        if (arrayDeclMatch) {
          const [, type, name, init] = arrayDeclMatch
          const array = this.parseArrayInitializer(init)
          this.arrayStates.set(name, array)
          this.variables.set(name, { name, value: array, type: `${type}[]` })
          const arrayState = array.map((val, idx) => ({ index: idx, value: val }))
          this.addStep(i, `Declaring array ${name} with ${array.length} elements`, arrayState)
          continue
        }
        
        // Parse variable assignment (e.g., "x = 10;")
        const assignMatch = line.match(/(\w+)\s*=\s*(.+?);/)
        if (assignMatch && this.variables.has(assignMatch[1])) {
          const [, name, value] = assignMatch
          const evaluatedValue = this.evaluateExpression(value)
          const variable = this.variables.get(name)!
          variable.value = evaluatedValue
          this.variables.set(name, variable)
          this.addStep(i, `Assigning ${name} = ${evaluatedValue}`)
          continue
        }
        
        // Parse array assignment (e.g., "arr[0] = 10;")
        const arrayAssignMatch = line.match(/(\w+)\[(\d+)\]\s*=\s*(.+?);/)
        if (arrayAssignMatch) {
          const [, name, idx, value] = arrayAssignMatch
          const array = this.arrayStates.get(name)
          if (array) {
            const index = parseInt(idx, 10)
            const evaluatedValue = this.evaluateExpression(value)
            array[index] = evaluatedValue
            this.arrayStates.set(name, array)
            const arrayState = array.map((val, i) => ({ 
              index: i, 
              value: val, 
              highlighted: i === index 
            }))
            this.addStep(i, `Assigning ${name}[${index}] = ${evaluatedValue}`, arrayState)
          }
          continue
        }
        
        // Parse System.out.println
        const printlnMatch = line.match(/System\.out\.println\((.+?)\);?/)
        if (printlnMatch) {
          const content = this.evaluatePrintExpression(printlnMatch[1])
          this.output += content + '\n'
          this.addStep(i, `Printing: ${content}`)
          continue
        }
        
        // Parse System.out.print
        const printMatch = line.match(/System\.out\.print\((.+?)\);?/)
        if (printMatch) {
          const content = this.evaluatePrintExpression(printMatch[1])
          this.output += content
          this.addStep(i, `Printing: ${content}`)
          continue
        }
        
        // Parse for loop
        const forLoopMatch = line.match(/for\s*\(\s*(int\s+)?(\w+)\s*=\s*(.+?);\s*(.+?);\s*(.+?)\s*\)/)
        if (forLoopMatch) {
          const [, hasInt, varName, init, condition, update] = forLoopMatch
          
          // Initialize loop variable
          if (hasInt) {
            const initValue = this.evaluateExpression(init)
            this.variables.set(varName, { name: varName, value: initValue, type: 'int' })
            this.addStep(i, `For loop: initializing ${varName} = ${initValue}`)
          }
          
          // Find loop body lines (before starting iterations)
          let bodyStart = i + 1
          let bodyBraceCount = 1
          const bodyLines: number[] = []
          
          for (let j = bodyStart; j < this.lines.length && bodyBraceCount > 0; j++) {
            const bodyLine = this.lines[j]
            bodyBraceCount += (bodyLine.match(/\{/g) || []).length - (bodyLine.match(/\}/g) || []).length
            if (bodyBraceCount > 0 && bodyLine.trim() && !bodyLine.trim().startsWith('//')) {
              bodyLines.push(j)
            }
          }
          
          // Check initial condition
          let conditionResult = this.evaluateExpression(condition)
          this.addStep(i, `For loop: checking condition (${condition}) = ${conditionResult}`, undefined, conditionResult)
          
          // Simulate loop iterations (max 50 iterations to prevent infinite loops)
          let iterations = 0
          const maxIterations = 50
          
          while (conditionResult && iterations < maxIterations) {
            iterations++
            
            // Execute loop body
            for (const j of bodyLines) {
              const bodyLine = this.lines[j]
              
              // Handle System.out.print/println
              const bodyPrintMatch = bodyLine.match(/System\.out\.(print|println)\((.+?)\);?/)
              if (bodyPrintMatch) {
                const content = this.evaluatePrintExpression(bodyPrintMatch[2])
                if (bodyPrintMatch[1] === 'println') {
                  this.output += content + '\n'
                } else {
                  this.output += content
                }
                this.addStep(j, `Loop iteration ${iterations}: printing ${content}`)
                continue
              }
              
              // Handle variable assignment
              const bodyAssignMatch = bodyLine.match(/(\w+)\s*=\s*(.+?);/)
              if (bodyAssignMatch && this.variables.has(bodyAssignMatch[1])) {
                const [, name, value] = bodyAssignMatch
                const evaluatedValue = this.evaluateExpression(value)
                const variable = this.variables.get(name)!
                variable.value = evaluatedValue
                this.variables.set(name, variable)
                this.addStep(j, `Loop iteration ${iterations}: ${name} = ${evaluatedValue}`)
                continue
              }
              
              // Handle array assignment in loop
              const bodyArrayAssignMatch = bodyLine.match(/(\w+)\[(\w+|\d+)\]\s*=\s*(.+?);/)
              if (bodyArrayAssignMatch) {
                const [, arrName, idxExpr, value] = bodyArrayAssignMatch
                const idx = /^\d+$/.test(idxExpr) ? parseInt(idxExpr, 10) : this.evaluateExpression(idxExpr)
                const array = this.arrayStates.get(arrName)
                if (array && typeof idx === 'number') {
                  const evaluatedValue = this.evaluateExpression(value)
                  array[idx] = evaluatedValue
                  this.arrayStates.set(arrName, array)
                  const arrayState = array.map((val, idx2) => ({ 
                    index: idx2, 
                    value: val, 
                    highlighted: idx2 === idx 
                  }))
                  this.addStep(j, `Loop iteration ${iterations}: ${arrName}[${idx}] = ${evaluatedValue}`, arrayState)
                }
                continue
              }
            }
            
            // Update loop variable BEFORE checking condition again
            let updateValue: any
            if (update.includes('++')) {
              const currentValue = this.variables.get(varName)?.value || 0
              updateValue = currentValue + 1
            } else if (update.includes('--')) {
              const currentValue = this.variables.get(varName)?.value || 0
              updateValue = currentValue - 1
            } else {
              // For expressions like "i = i + 1", evaluate with current variable value
              updateValue = this.evaluateExpression(update)
            }
            
            if (this.variables.has(varName)) {
              const variable = this.variables.get(varName)!
              variable.value = updateValue
              this.variables.set(varName, variable)
              this.addStep(i, `For loop: updating ${varName} = ${updateValue}`)
            }
            
            // Check condition again with updated variable value
            conditionResult = this.evaluateExpression(condition)
            if (!conditionResult) {
              this.addStep(i, `For loop: condition (${condition}) = false, exiting loop`, undefined, false)
              break
            }
          }
          
          if (iterations >= maxIterations) {
            this.addStep(i, `For loop: Maximum iterations (${maxIterations}) reached, stopping to prevent infinite loop`, undefined, false)
          }
          
          continue
        }
        
        // Parse if statement
        const ifMatch = line.match(/if\s*\((.+?)\)/)
        if (ifMatch) {
          const condition = this.evaluateExpression(ifMatch[1])
          this.addStep(i, `If statement: checking condition (${ifMatch[1]}) = ${condition}`, undefined, condition)
          
          if (condition) {
            // Execute if block (simplified)
            let ifBraceCount = 1
            for (let j = i + 1; j < this.lines.length && ifBraceCount > 0; j++) {
              const ifLine = this.lines[j]
              ifBraceCount += (ifLine.match(/\{/g) || []).length - (ifLine.match(/\}/g) || []).length
              
              const ifPrintMatch = ifLine.match(/System\.out\.(print|println)\((.+?)\);?/)
              if (ifPrintMatch) {
                const content = this.evaluatePrintExpression(ifPrintMatch[2])
                if (ifPrintMatch[1] === 'println') {
                  this.output += content + '\n'
                } else {
                  this.output += content
                }
                this.addStep(j, `Executing if block: printing ${content}`)
              }
            }
          }
          continue
        }
      }
      
      return this.steps
    } catch (error: any) {
      throw new Error(`Interpretation error: ${error.message}`)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid code provided' },
        { status: 400 }
      )
    }
    
    const interpreter = new JavaInterpreter(code)
    const steps = interpreter.interpret()
    
    if (steps.length === 0) {
      return NextResponse.json(
        { error: 'No execution steps generated. Make sure your code has a main method.' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ steps })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to visualize code' },
      { status: 500 }
    )
  }
}

