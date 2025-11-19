/**
  {
    "api": 1,
    "name": "Generate Django View",
    "description": "Generate Django view template",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "django,view,python,generate"
  }
**/
function main(state) {
  const model = state.text.trim() || 'Item';
  
  let code = `from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView\n`;
  code += `from .models import ${model}\n\n`;
  code += `class ${model}ListView(ListView):\n`;
  code += `    model = ${model}\n`;
  code += `    template_name = '${model.toLowerCase()}_list.html'\n`;
  code += `    context_object_name = '${model.toLowerCase()}s'\n\n`;
  code += `class ${model}DetailView(DetailView):\n`;
  code += `    model = ${model}\n`;
  code += `    template_name = '${model.toLowerCase()}_detail.html'`;
  
  state.text = code;
}