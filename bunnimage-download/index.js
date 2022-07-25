const fetch = require("node-fetch");

module.exports = async function (context, req) {

  const username = req.headers["username"];

  let download = "";
  let downloadpng =
    "https://eihei2332.blob.core.windows.net/images/" + username + ".png";
  let downloadjpg =
    "https://eihei2332.blob.core.windows.net/images/" + username + ".jpeg";

  let pngresp = await fetch(downloadpng, {
    method: "GET",
  });
  let pngdata = await pngresp;

  let jpgresp = await fetch(downloadjpg, {
    method: "GET",
  });
  let jpgdata = await jpgresp;

  let success = true;

  if (
    pngdata.statusText == "The specified blob does not exist." &&
    jpgdata.statusText == "The specified blob does not exist."
  ) {
    success = false;
    context.log("Does not exist: " + pngdata);
    context.log("Does not exist: " + jpgdata);
  } else if (pngdata.statusText != "The specified blob does not exist.") {
    
    download = downloadpng;
    context.log("Does exist: " + pngdata);
  } else if (jpgdata.statusText != "The specified blob does not exist.") {

    download = downloadjpg;
    context.log("Does exist: " + jpgdata);
  }
  context.res = {
    body: {
      downloadUri: download,
      success: success,
    },
  };
  context.log(download);
  context.done();
};
