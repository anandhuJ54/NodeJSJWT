"use strict";

//require('dotenv').config();
var express = require("./Config/express");
var config = require("./Config/db");
var app = express();

var server = app.listen(3000, function () {
    console.log(`port 3000 running !!!!!`);
});

module.export = {
    app: app,
    server: server
};

// const express = require('express')
// const jwt = require('jsonwebtoken')

// const app = express();

// app.get('/get', (req, res)=>{
//     res.send('welcome...')
// })

// app.post('/login',(req, res)=>{
//     const userData ={
//         email:'anandhu@gmail.com',
//         password: 'pass123'
//     }

//     jwt.sign({userData},'ourkey',(err, token)=>{
//         if(err)
//         {
//             res.send('error')
//         }
//         else{
//             res.send(token)
//         }
//     })
// })

// app.post('/register',verifyToken,(req, res)=>{
//     jwt.verify(req.token, 'ourkey',(err, authData)=>{
//         if(err)
//         {
//             res.send(err)
//         }
//         else{
//             res.json({
//                 result:"registered successfully...",
//                 authData
//             })
//         }
//     })

// })

// function verifyToken(req,res,next) {
//     const header = req.headers['authorization'];
//     if(typeof header == 'undefined')
//     {
//         res.sendStatus(403);
//     }
//     else{
//         const bearerToken = header;
//         req.token = bearerToken;
//         next();
//     }
// }
// app.listen(3000,()=>{console.log('started')})