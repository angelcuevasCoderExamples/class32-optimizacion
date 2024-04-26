const express = require('express');
const CustomError = require('../utils/errorHandling/CustomError');
const {getUserErrorInfo, getInvalidIdParamInfo} = require('../utils/errorHandling/info');
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


/***
 * Cuando el endpoint contiene código asyncrónico [aqui simplemente tiene un "async"]
 * tenemos que agregar el parametro "next" a nuestro endpoint y captar el error en un try catch
 * una vez captado el error se lo pasamos como argumento a next() y express se lo hará llegar a nuestro middleware de errores ["errorHandling"]
 */
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

/***
 * método para retornar un determinado user por id numérico
 */
router.get('/:id', (req, res)=>{
    const {id} = req.params; 

    if(!id || isNaN(id)){
        throw new CustomError({
            name: 'Id param error',
            cause: getInvalidIdParamInfo(id),
            message: 'Id is missing or unvalid',
            code: ErrorTypes.INVALID_PARAM_ERROR
        })
    }

    const foundUser = users.find(u=>u.id = id)
    if(!foundUser){
        throw new CustomError({
            name: 'Id param error',
            cause: getInvalidIdParamInfo(id),
            message: 'Id does not exist',
            code: ErrorTypes.INVALID_PARAM_ERROR
        })
    }

    res.send({status:'success', payload: foundUser})
})

module.exports = {
    usersRouter: router 
}