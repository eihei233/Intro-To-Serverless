const multipart = require("parse-multipart");
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

async function uploadFile(parsedBody, ext, filename) {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerName = "images";
  const containerClient = blobServiceClient.getContainerClient(containerName); // Get a reference to a container
  const blobName = filename + "." + ext; // Create the container
  const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client
  const uploadBlobResponse = await blockBlobClient.upload(
    parsedBody[0].data,
    parsedBody[0].data.length
  );
  return "File Saved";
}

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let responseMessage = "";
  try {
    let password = req.headers["codename"]; // get the header called "codename"
    const boundary = multipart.getBoundary(req.headers["content-type"]);
    const body = req.body;
    const parsedBody = multipart.Parse(body, boundary);
    let filetype = parsedBody[0].type;
    let ext;
    if (filetype == "image/png") {
      ext = "png";
    } else if (filetype == "image/jpeg") {
      ext = "jpeg";
    } else if (filetype == "image/jpg") {
      ext = "jpg";
    } else {
      username = "invalidimage";
      ext = "";
    }
    // determine the file-type here!
    responseMessage = await uploadFile(parsedBody, ext, password);
    // fill the parameters in!
  } catch (err) {
    context.log(err);
    context.log("Undefined body image");
    responseMessage = "Sorry! No image attached.";
  }
  context.res = {
    body: responseMessage,
  };
};
