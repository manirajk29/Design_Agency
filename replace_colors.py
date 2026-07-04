import os
import glob

# Hex color to replace: #b4fe1e -> #9b87f5
# rgba to replace: 180, 254, 30 -> 155, 135, 245
# bg-[#bef264] -> bg-[#a78bfa] (hover color for button)
# text-green-450 -> text-purple-400
# bg-green-500/10 -> bg-purple-500/10
# border-green-500/30 -> border-purple-500/30
# emerald-400 -> purple-400

replacements = {
    "#b4fe1e": "#9b87f5",
    "rgba(180, 254, 30": "rgba(155, 135, 245",
    "#bef264": "#a78bfa",
    "text-green-450": "text-purple-400",
    "bg-green-500": "bg-purple-500",
    "border-green-500": "border-purple-500",
    "emerald-400": "purple-400"
}

files = glob.glob("**/*.jsx", recursive=True) + glob.glob("**/*.js", recursive=True) + glob.glob("**/*.css", recursive=True)

for filepath in files:
    if "node_modules" in filepath or ".next" in filepath:
        continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
