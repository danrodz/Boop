/**
  {
    "api": 1,
    "name": "Generate ORM Model (Sequelize)",
    "description": "Generate Sequelize ORM model from table name",
    "author": "Boop",
    "icon": "cylinder",
    "tags": "orm,sequelize,model,database,javascript"
  }
**/

function main(state) {
  try {
    const tableName = state.text.trim() || 'User';
    const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1);

    let model = `const { Model, DataTypes } = require('sequelize');\n\n`;
    model += `class ${modelName} extends Model {}\n\n`;
    model += `${modelName}.init({\n`;
    model += `  id: {\n`;
    model += `    type: DataTypes.INTEGER,\n`;
    model += `    primaryKey: true,\n`;
    model += `    autoIncrement: true\n`;
    model += `  },\n`;
    model += `  name: {\n`;
    model += `    type: DataTypes.STRING,\n`;
    model += `    allowNull: false\n`;
    model += `  },\n`;
    model += `  email: {\n`;
    model += `    type: DataTypes.STRING,\n`;
    model += `    allowNull: false,\n`;
    model += `    unique: true,\n`;
    model += `    validate: {\n`;
    model += `      isEmail: true\n`;
    model += `    }\n`;
    model += `  },\n`;
    model += `  isActive: {\n`;
    model += `    type: DataTypes.BOOLEAN,\n`;
    model += `    defaultValue: true\n`;
    model += `  }\n`;
    model += `}, {\n`;
    model += `  sequelize,\n`;
    model += `  modelName: '${modelName}',\n`;
    model += `  tableName: '${tableName.toLowerCase()}s',\n`;
    model += `  timestamps: true,\n`;
    model += `  underscored: true\n`;
    model += `});\n\n`;
    model += `module.exports = ${modelName};\n`;

    state.text = model;
  } catch (error) {
    state.postError("Failed to generate model: " + error.message);
  }
}
