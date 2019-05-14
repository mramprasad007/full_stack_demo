// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
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

exports.get = async (event, context) => {
    try {
        var req = event.queryStringParameters;
        var body = {
            message: `hello ${req.name}`,
        }
        response = createResponse(200,body);
    } catch (err) {
        return err;
    }
    return response
};

exports.post = async (event, context) => {
    try {
        var req = JSON.parse(event.body)
        var body = {
            message: `hello ${req.name}`,
        }
        response = createResponse(200,body);
    } catch (err) {
        return err;
    }
    return response
};

