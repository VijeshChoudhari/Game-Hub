const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('node:path')


const app = express();
app.use(express.json())

//Routing
const Signup = require('./routes/Signup')
const User = require('./routes/User')
const Project = require('./routes/Project');
const nodemon = require('nodemon');



app.use('/signup' , Signup )
app.use('/user' , User )
app.use('/projects' , Project )



//Library used
app.use(cors({
    credentials : true,
    origin : ['http://localhost:3000']
}))
app.use(cookieParser())

//Database Connection

    mongoose.connect("process.env.DBCONNECTION", { useNewUrlParser: true } , ()=>{
        console.log('connected to db')
    })


//Server Production 
if("production"==="production"){
    app.use(express.static(path.join("./client/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client', 'build','index.html'))
    })
}

//Listening server on port 5000
app.listen(5000);
