const querystring = require('qs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);

    context.log(queryObject);

    context.res = {
        body: queryObject.Body
     };
}