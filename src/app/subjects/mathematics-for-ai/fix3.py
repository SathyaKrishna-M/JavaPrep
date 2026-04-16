import os

dir_path = r'd:\5Projects\BBHub-Clone\JavaPrep\src\app\subjects\mathematics-for-ai\topics'

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix PracticeQuestion 'explanation' -> 'solution'
            content = content.replace('explanation: "', 'solution: "')
            
            # Fix matrices in CO1/matrices-transformations/page.tsx
            if file == 'page.tsx' and 'matrices-transformations' in root:
                # Replace the exact strings
                content = content.replace(
                    r'$\begin{bmatrix} 2 & 1 \\ 0 & 1 \end{bmatrix}$',
                    r'{"$\\begin{bmatrix} 2 & 1 \\\\ 0 & 1 \\end{bmatrix}$"}'
                )
                
                content = content.replace(
                    r'$\begin{bmatrix} a & b \\ c & d \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} ax + by \\ cx + dy \end{bmatrix}$',
                    r'{"$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} ax + by \\\\ cx + dy \\end{bmatrix}$"}'
                )
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

print("Final TS fixes applied")
