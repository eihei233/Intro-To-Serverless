const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const THE_ENDPOINT = "https://bit-cat.azurewebsites.net/cat/says/serverless";
    const resp = await fetch(THE_ENDPOINT, {
        method: 'GET'
    });
    
    const data = await resp.arrayBuffer()
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob

    const base64data = Buffer.from(data).toString('base64')
//put what you want to turn into base64 inside "originaldata"
//"originaldata" will be encoded in base64.
    const password = req.query.password;
    const response = password == "letmein" ? "Access granted." : "Access denied.";
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: base64data
    };
}