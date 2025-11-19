/**
  {
    "api": 1,
    "name": "Environment Variable Generator",
    "description": "Generate .env template from code containing process.env references",
    "author": "Boop",
    "icon": "gearshape.2",
    "tags": "env,environment,variable,config,dotenv"
  }
**/

function main(state) {
  try {
    const code = state.text;
    const envVars = new Set();

    // Match process.env.VAR_NAME
    const pattern1 = /process\.env\.(\w+)/g;
    let match;
    while ((match = pattern1.exec(code)) !== null) {
      envVars.add(match[1]);
    }

    // Match process.env['VAR_NAME'] or process.env["VAR_NAME"]
    const pattern2 = /process\.env\[['"](\w+)['"]\]/g;
    while ((match = pattern2.exec(code)) !== null) {
      envVars.add(match[1]);
    }

    if (envVars.size === 0) {
      state.postError("No environment variables found in code");
      return;
    }

    const sorted = Array.from(envVars).sort();
    const result = sorted.map(v => `${v}=`).join('\n');

    state.text = result;
    state.postInfo(`Found ${envVars.size} environment variable(s)`);
  } catch (error) {
    state.postError("Error generating .env template: " + error.message);
  }
}
