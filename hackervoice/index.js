module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const password = req.query.password;
    const response = password == "letmein" ? "Access granted." : "Access denied.";
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };
}