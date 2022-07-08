const querystring = require('qs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const queryObject = querystring.parse(req.body);
    let url = queryObject.MediaUrl0;
    context.res = {
        body: url
        };
}