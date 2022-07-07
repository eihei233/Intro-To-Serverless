const multipart = require('parse-multipart');
const fetch = require('node-fetch');

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
    let params = new URLSearchParams({
        'returnFaceAttributes': 'emotion'
    });

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
      
      	//ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    });
    let data = await resp.json();
    
    return data; 
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const body = req.body;
    const boundary = multipart.getBoundary(req.headers['content-type']);
    const parts = multipart.Parse(body, boundary);
    let convertedResult = Buffer.from(parts[0].data).toString('base64');
    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: convertedResult
    // };
    const result = await analyzeImage(parts[0].data);
    context.res = {
        body: {
            result
        }
    };
    context.done();
    console.log(result);
}