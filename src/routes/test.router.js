const express = require('express')

const router = express.Router();

//Instalación de PM2 
//npm install pm2 -g

router.get('/ok', (req, res)=>{
    res.send('OK')
})

router.get('/error', (req, res)=>{
    setTimeout(()=>{
        throw new Error('Random exception')
        res.send('error')
    },10)

})


module.exports = {
    testsRouter: router 
}