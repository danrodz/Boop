/**
  {
    "api": 1,
    "name": "Generate TypeScript Config",
    "description": "Generate tsconfig.json for different project types",
    "author": "Boop",
    "icon": "gear",
    "tags": "typescript,tsconfig,config,code-quality"
  }
**/

function main(state) {
  const projectType = state.text.trim().toLowerCase();

  const configs = {
    'react': {
      compilerOptions: {
        target: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        jsx: 'react-jsx',
        module: 'ESNext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        allowJs: true,
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true
      },
      include: ['src'],
      exclude: ['node_modules']
    },
    'node': {
      compilerOptions: {
        target: 'ES2020',
        module: 'commonjs',
        lib: ['ES2020'],
        outDir: './dist',
        rootDir: './src',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        moduleResolution: 'node'
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist']
    },
    'library': {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        outDir: './dist',
        rootDir: './src',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true
      },
      include: ['src'],
      exclude: ['node_modules', 'dist', 'test']
    }
  };

  const config = configs[projectType] || configs['node'];

  state.text = JSON.stringify(config, null, 2);
  state.postInfo("Generated tsconfig.json");
}
