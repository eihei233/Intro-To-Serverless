const fetch = require('node-fetch')

function getRandomName(){
    const names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"];
    let random_value = Math.floor(names.length * Math.random());
    let resultname = names[random_value];
    return resultname;
}

async function getBase64Image(){
    const THE_ENDPOINT = "https://cataas.com/cat/cute/says/Bitcamp";
    const resp = await fetch(THE_ENDPOINT, {
        method: 'GET'
    });
    const data = await resp.arrayBuffer();

    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob

    const base64data = Buffer.from(data).toString('base64');

    //put what you want to turn into base64 inside "originaldata"
    //"originaldata" will be encoded in base64.
    return base64data;

}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
   
    const name1 = getRandomName();
    const name2 = getRandomName();
    const Image1 = await getBase64Image();
    const Image2 = await getBase64Image();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: Image1,
            cat2: Image2,
            names: [name1, name2]
        }
    };
}

