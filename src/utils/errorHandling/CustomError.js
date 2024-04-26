const ErrorTypes = require("./ErrorTypes");

class CustomError extends Error{
    constructor({name="error", cause, message, code=ErrorTypes.UNKOWN}){
        super(message) //throw new Error('')
        this.name = name; 
        this.code = code; 
        this.cause = cause;   
    }
}

module.exports = CustomError; 