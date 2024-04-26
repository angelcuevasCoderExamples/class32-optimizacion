const express = require('express');
const CustomError = require('../utils/errorHandling/CustomError');
const getUserErrorInfo = require('../utils/errorHandling/info');
const ErrorTypes = require('../utils/errorHandling/ErrorTypes');

const router = express.Router();

const users = [] //"DATABASE"
let usersIDs = 0; 

router.post('/', (req, res)=>{
    const {first_name, last_name, email} = req.body; 
    if(!first_name || !last_name || !email ){
       throw new CustomError({
            name: 'User creation error',
            cause: getUserErrorInfo({first_name, last_name, email}),
            message: 'Error creating user',
            code: ErrorTypes.INVALID_TYPE_ERROR
       })
    }

    const user = {id: ++usersIDs, first_name, last_name, email}
    users.push(user);

    res.send({status:'success', payload: user})
})


router.post('/async', async (req, res, next)=>{
    try {
        const {first_name, last_name, email} = req.body; 
        if(!first_name || !last_name || !email ){
           throw new CustomError({
                name: 'User creation error',
                cause: getUserErrorInfo({first_name, last_name, email}),
                message: 'Error creating user',
                code: ErrorTypes.INVALID_TYPE_ERROR
           })
        }
    
        const user = {id: ++usersIDs, first_name, last_name, email}
        users.push(user);
    
        res.send({status:'success', payload: user})
    } catch (error) {
        next(error)
    }
})

module.exports = {
    usersRouter: router 
}