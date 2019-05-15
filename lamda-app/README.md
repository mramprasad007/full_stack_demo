#upload to S3
sam package --template-file template.yaml --s3-bucket ram-lambda-demo --output-template-file out.yaml

#create cloud formation stack

sam deploy --template-file ./out.yaml --stack-name cfdemo --capabilities CAPABILITY_IAM

#create dynamo db local

docker run -p 8000:8000 -v $(pwd)/local/dynamodb:/data/ amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /data

