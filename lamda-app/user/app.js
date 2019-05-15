// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
let dynamo;
let tableName;
if(process.env.AWS_SAM_LOCAL === 'true'){
    dynamo = new AWS.DynamoDB.DocumentClient({
        endpoint: 'http://docker.for.mac.localhost:8000',
      });
    tableName = "Users"
}else{
    dynamo = new AWS.DynamoDB.DocumentClient()
    tableName = process.env.TABLE_NAME;
}

const createResponse = (statusCode, body) => {
    return {
        "statusCode": statusCode,
        "body": JSON.stringify(body) || ""
    }
}
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.get = async (event, context, callback) => {
    try {
        var req = event.queryStringParameters;
        var params = {
            TableName: tableName,
            Key: {
                userName: req.name
            }
        };
        let getItem = new Promise((res, rej) => {
            dynamo.get(params, function(err, data) {
              if (err) {
                rej(err);
              } else {
                res(data.item);
              }
            }); 
        });
        const result = await getItem;
        return createResponse(200,result) 
    } catch (err) {
        return createResponse(500,err);
    }
};

exports.post = async (event, context, callback) => {
    try {
        var req = JSON.parse(event.body)
        var item = {
            userName: req.name,
            email: req.email
        };
        var params = {
            TableName: tableName,
            Item: item
        };
        let putItem = new Promise((res, rej) => {
            dynamo.put(params, function(err, data) {
              if (err) {
                rej(err);
              } else {
                res(data);
              }
            }); 
        });
        const result = await putItem;
        return createResponse(200,result) 
    } catch (err) {
        return createResponse(500,err);
    }
};

