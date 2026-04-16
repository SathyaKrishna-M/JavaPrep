import os
import re

dir_path = r'd:\5Projects\BBHub-Clone\JavaPrep\src\app\subjects\mathematics-for-ai\topics'

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix PracticeQuestions (remove options and correctAnswer)
            content = re.sub(r'\s*options:\s*\[.*?\],', '', content)
            content = re.sub(r'\s*correctAnswer:\s*\d+,', '', content)
            
            # Fix ExampleProblems
            # Find steps: ["..."] and convert to solution: "...", steps: [...]
            def fix_example(match):
                inner_text = match.group(1)
                return f'''solution: "{inner_text}",
            steps: [{{ step: "Explanation", explanation: "{inner_text}" }}]'''
            
            content = re.sub(r'steps:\s*\["(.*?)"\]', fix_example, content, flags=re.DOTALL)
            
            # Fix the matrix issue in matrices-transformations
            if 'matrices-transformations' in root and file == 'page.tsx':
                content = content.replace(r'$\begin{bmatrix} 2 & 1 \\ 0 & 1 \end{bmatrix}$', r'{"$\\begin{bmatrix} 2 & 1 \\\\ 0 & 1 \\end{bmatrix}$"}')
                content = content.replace(r'$\begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} ax + by \\ cx + dy \end{bmatrix}$', r'{"$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} ax + by \\\\ cx + dy \\end{bmatrix}$"}')

            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

print("Schemas fixed")
