const querystring = require('qs');
const fetch = require('node-fetch');

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
    let params = new URLSearchParams({
        'returnFaceAttributes': 'emotion,age'
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
    const queryObject = querystring.parse(req.body);
    let url = queryObject.MediaUrl0;
    let resp = await fetch(url,{
        /*The await expression causes async function execution to pause until a Promise is settled 
        (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. 
        When resumed, the value of the await expression is that of the fulfilled Promise*/
        method: 'GET',
    })

    // receive the response
    let data = await resp.arrayBuffer()
    // we are receiving it as a Buffer since this is binary data
    let result = await analyzeImage(data);
    let age = result[0].faceAttributes.age;
    let id = "";
    if (age > 5 && age < 25) {
        id = "GenZ"
    }
    else if (age > 24 && age < 41){
        id = "GenY"
    }
    else if(age > 40 && age < 57){
        id = "GenX"
    }
    else if(age > 56 && age < 76){
        id = "BabyBoomers"
    }
    else{
        id = "Unknown"
    }

    context.res = {
        body: id
        };
}