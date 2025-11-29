/**
  {
    "api": 1,
    "name": "Generate AWS IAM Policy",
    "description": "Generate AWS IAM policy JSON template",
    "author": "Boop",
    "icon": "cloud",
    "tags": "aws,iam,policy,cloud,security"
  }
**/

function main(state) {
  const service = state.text.trim().toLowerCase() || 's3';

  const policies = {
    's3': {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: [
          's3:GetObject',
          's3:PutObject',
          's3:DeleteObject'
        ],
        Resource: 'arn:aws:s3:::bucket-name/*'
      }]
    },
    'dynamodb': {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: [
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:Query'
        ],
        Resource: 'arn:aws:dynamodb:region:account-id:table/table-name'
      }]
    },
    'lambda': {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: [
          'lambda:InvokeFunction'
        ],
        Resource: 'arn:aws:lambda:region:account-id:function:function-name'
      }]
    },
    'ec2': {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: [
          'ec2:DescribeInstances',
          'ec2:StartInstances',
          'ec2:StopInstances'
        ],
        Resource: '*'
      }]
    }
  };

  const policy = policies[service] || policies['s3'];

  state.text = JSON.stringify(policy, null, 2);
  state.postInfo(`Generated ${service.toUpperCase()} IAM policy`);
}
