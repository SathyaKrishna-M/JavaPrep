import os
import re

dir_path = r'd:\5Projects\BBHub-Clone\JavaPrep\src\app\subjects\mathematics-for-ai\topics'

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Revert the previous script's changes
            content = content.replace(r"{`\$\(`}", r"$\(")
            content = content.replace(r"{`\)\$`}", r"\)$")
            
            # Find and replace all math blocks
            def math_replacer(match):
                inner = match.group(1)
                # Escape backslashes for JS string, and quotes
                inner_escaped = inner.replace('\\', '\\\\').replace('"', '\\"')
                return '{"$\\\\(' + inner_escaped + '\\\\)$"}'
            
            content = re.sub(r'\$\\\((.*?)\\\)\$', math_replacer, content, flags=re.DOTALL)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

print("Formatting applied")
