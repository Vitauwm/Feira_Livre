import os
import glob

folders = ['components', 'views']

for folder in folders:
    for filepath in glob.glob(f"{folder}/*.html"):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Escape backticks and ${} to prevent template literal issues
        content = content.replace('`', '\\`').replace('${', '\\${')
        
        filename = os.path.basename(filepath)
        id_name = filename.split('.')[0] + '-placeholder'
        
        js_content = f"""
(function() {{
    const html = `{content}`;
    const placeholder = document.getElementById('{id_name}');
    if (placeholder) {{
        placeholder.outerHTML = html;
    }}
}})();
"""
        js_filepath = filepath.replace('.html', '.js')
        with open(js_filepath, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        os.remove(filepath)
        print(f"Converted {filepath} to JS")

print("Conversão concluída!")
