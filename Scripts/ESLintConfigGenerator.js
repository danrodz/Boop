/**
  {
    "api": 1,
    "name": "Generate ESLint Config",
    "description": "Generate .eslintrc.json configuration file",
    "author": "Boop",
    "icon": "gear",
    "tags": "eslint,config,javascript,code-quality"
  }
**/

function main(state) {
  const framework = state.text.trim().toLowerCase();

  const configs = {
    'react': {
      env: {
        browser: true,
        es2021: true,
        node: true
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: ['react'],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off'
      }
    },
    'node': {
      env: {
        node: true,
        es2021: true
      },
      extends: ['eslint:recommended'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn'
      }
    },
    'typescript': {
      env: {
        browser: true,
        es2021: true,
        node: true
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn'
      }
    }
  };

  const config = configs[framework] || configs['node'];

  state.text = JSON.stringify(config, null, 2);
  state.postInfo("Generated ESLint config");
}
