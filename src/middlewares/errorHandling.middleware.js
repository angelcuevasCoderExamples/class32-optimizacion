const ErrorTypes = require("../utils/errorHandling/ErrorTypes");

const errorHandling = (error, req, res, next)=>{
    console.log(error.cause)
    switch (error.code) {
        case ErrorTypes.INVALID_TYPE_ERROR:
            res.status(400).send({status:'error', error: error.name})
            break;
        case ErrorTypes.INVALID_PARAM:
            res.status(400).send({status:'error', error: error.name})
            break;
        
        default:
            res.status(500).send({status:'error', error: 'Unhadled error'})
            break;
    } 
}

module.exports = errorHandling;