import os

dir_path = r'd:\5Projects\BBHub-Clone\JavaPrep\src\app\subjects\mathematics-for-ai\topics'

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content = content.replace(r'$\(', r"{`\$\(`}")
            content = content.replace(r'\)$', r"{`\)\$`}")
            # Also replace any stray \ or \) that are not escaped? Just in case.
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

print("Fixed TSX files")
