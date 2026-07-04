import glob

replacements = {
    "text-white": "text-[var(--text-black-custom)]",
    "border-white/10": "border-[var(--border-color-custom)]",
    "border-white/5": "border-[var(--border-color-custom)]",
    "bg-white/5": "bg-[var(--card)]",
    "bg-white/10": "bg-[var(--card)] shadow-sm",
    "placeholder-slate-500": "placeholder-slate-400 dark:placeholder-slate-500",
}

files = ['components/Contact.jsx', 'components/Footer.jsx']

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
