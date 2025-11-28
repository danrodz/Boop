/**
  {
    "api": 1,
    "name": "Generate EditorConfig",
    "description": "Generate .editorconfig file for consistent coding styles",
    "author": "Boop",
    "icon": "gear",
    "tags": "editorconfig,config,format,code-quality"
  }
**/

function main(state) {
  const editorConfig = `# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
trim_trailing_whitespace = true

# 2 space indentation for most files
[*.{js,jsx,ts,tsx,json,yml,yaml,css,scss,html}]
indent_style = space
indent_size = 2

# 4 space indentation for Python
[*.py]
indent_style = space
indent_size = 4

# Tab indentation for Go
[*.go]
indent_style = tab

# Markdown
[*.md]
trim_trailing_whitespace = false
max_line_length = off

# Makefiles
[Makefile]
indent_style = tab`;

  state.text = editorConfig;
  state.postInfo("Generated .editorconfig");
}
