/**
  {
    "api": 1,
    "name": "Generate Flask Route",
    "description": "Generate Flask route template",
    "author": "Boop",
    "icon": "arrow.turn.down.right",
    "tags": "flask,route,python,generate"
  }
**/
function main(state) {
  const route = state.text.trim() || 'api';
  
  let code = `from flask import Flask, request, jsonify\n\n`;
  code += `app = Flask(__name__)\n\n`;
  code += `@app.route('/${route}', methods=['GET'])\n`;
  code += `def get_${route}():\n`;
  code += `    return jsonify({'message': 'GET /${route}'})\n\n`;
  code += `@app.route('/${route}', methods=['POST'])\n`;
  code += `def post_${route}():\n`;
  code += `    data = request.get_json()\n`;
  code += `    return jsonify({'message': 'POST /${route}', 'data': data}), 201`;
  
  state.text = code;
}