import os
import re

dir_path = r'd:\5Projects\BBHub-Clone\JavaPrep\src\app\subjects\mathematics-for-ai\topics'

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Simple replacement for exampleProblems fields
            # We know it looks exactly like:
            #     exampleProblems: [
            #         {
            #             question: "...",
            #             solution: "..."
            #         }
            #     ]
            
            # Replace question: with problem: ONLY inside exampleProblems matching block (or since there's only one exampleProblems per file)
            # Find the index of "exampleProblems: ["
            idx = content.find("exampleProblems: [")
            if idx != -1:
                before = content[:idx]
                after = content[idx:]
                
                after = after.replace("question: ", "problem: ")
                # Replace solution: "string" with steps: ["string"]
                after = re.sub(r'solution:\s*"(.*?)"', r'steps: ["\1"]', after, flags=re.DOTALL)
                
                content = before + after
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

print("exampleProblems scheme fixed")
