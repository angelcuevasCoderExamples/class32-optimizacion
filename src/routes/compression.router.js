const express = require('express')
const router = express.Router();


router.get('/uncompressed', (req, res)=>{
    
    let content = 'this is content';
    for (let i = 0; i < 500*1000; i++) {
        content+="some more content"
    }

    res.send(content)
})


router.get('/compressed', (req, res)=>{
    
    let content = 'this is content';
    for (let i = 0; i < 250*1000; i++) {
        content+="some more content"
    }

    res.send(content)
})


module.exports = {
    compressionRouter: router 
}