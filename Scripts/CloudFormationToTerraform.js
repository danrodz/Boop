/**
  {
    "api": 1,
    "name": "CloudFormation to Terraform",
    "description": "Convert basic AWS CloudFormation to Terraform (template)",
    "author": "Boop",
    "icon": "cloud",
    "tags": "aws,cloudformation,terraform,convert"
  }
**/

function main(state) {
  const template = `# Terraform equivalent

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Example: S3 Bucket
resource "aws_s3_bucket" "example" {
  bucket = "my-bucket-name"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

# Example: EC2 Instance
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "ExampleInstance"
  }
}

# Note: This is a template. CloudFormation resources need manual conversion.
# Use tools like cf2tf for complex conversions.`;

  state.text = template;
  state.postInfo("Generated Terraform template");
}
