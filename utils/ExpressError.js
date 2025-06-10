// Here we make our coustam error handlers to through our
class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
// export the file
module.exports = ExpressError;