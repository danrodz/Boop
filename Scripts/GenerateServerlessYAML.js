/**
  {
    "api": 1,
    "name": "Generate Serverless Config",
    "description": "Generate serverless.yml template for AWS Lambda",
    "author": "Boop",
    "icon": "cloud",
    "tags": "serverless,aws,lambda,yaml,config"
  }
**/

function main(state) {
  const functionName = state.text.trim() || 'myFunction';

  const yaml = `service: my-service

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  stage: \${opt:stage, 'dev'}
  memorySize: 256
  timeout: 30

  environment:
    STAGE: \${self:provider.stage}

  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - logs:CreateLogGroup
            - logs:CreateLogStream
            - logs:PutLogEvents
          Resource: "*"

functions:
  ${functionName}:
    handler: src/${functionName}.handler
    events:
      - http:
          path: /${functionName}
          method: get
          cors: true

plugins:
  - serverless-offline

custom:
  serverless-offline:
    httpPort: 3000`;

  state.text = yaml;
  state.postInfo("Generated serverless.yml");
}
