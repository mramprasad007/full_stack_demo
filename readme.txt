//S3 bucket policy

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3ObjectPolicy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "*",
            "Resource": [
                "arn:aws:s3:::devops-artifacts-codebuild",
                "arn:aws:s3:::devops-artifacts-codebuild/*"
            ]
        }
    ]
}

//userdat

#!/bin/bash
sudo apt-get update -y
sudo apt-get install ruby -y
sudo apt-get install wget -y
cd /home/ubuntu
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
service codedeploy-agent start
rm install

//Iam roles to create

codedeploy - service role
Ec2 IAM Role - codedeploy, s3 full access