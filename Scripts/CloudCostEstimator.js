/**
  {
    "api": 1,
    "name": "AWS Cost Estimator",
    "description": "Rough cost estimate for common AWS services",
    "author": "Boop",
    "icon": "money",
    "tags": "aws,cost,estimate,pricing,cloud"
  }
**/

function main(state) {
  const service = state.text.trim().toLowerCase();

  const pricing = {
    'ec2': {
      't2.micro': '$0.0116/hour = ~$8.50/month',
      't2.small': '$0.023/hour = ~$17/month',
      't3.medium': '$0.0416/hour = ~$30/month'
    },
    's3': {
      'storage': '$0.023 per GB/month (first 50 TB)',
      'requests': 'GET: $0.0004 per 1000, PUT: $0.005 per 1000'
    },
    'rds': {
      'db.t3.micro': '$0.017/hour = ~$12.50/month',
      'db.t3.small': '$0.034/hour = ~$25/month',
      'storage': '$0.115 per GB/month (gp2)'
    },
    'lambda': {
      'requests': '$0.20 per 1M requests',
      'compute': '$0.0000166667 per GB-second',
      'free_tier': '1M requests + 400,000 GB-seconds per month'
    },
    'dynamodb': {
      'on_demand': 'Write: $1.25/million, Read: $0.25/million',
      'provisioned': 'Write: $0.00065/hour, Read: $0.00013/hour per unit',
      'storage': '$0.25 per GB/month'
    }
  };

  let output = `AWS ${service.toUpperCase()} Pricing Estimates (US East):\n\n`;

  if (pricing[service]) {
    for (const [key, value] of Object.entries(pricing[service])) {
      output += `${key}:\n  ${value}\n\n`;
    }
    output += 'Note: Prices are approximate and may vary by region.\nCheck aws.amazon.com/pricing for current rates.';
  } else {
    output = 'Service not found. Available: ec2, s3, rds, lambda, dynamodb\n\n';
    output += 'Visit https://calculator.aws for detailed estimates.';
  }

  state.text = output;
  state.postInfo("Generated cost estimate");
}
