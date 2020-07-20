const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const app = express();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const usermodel = require('./models/User');

const postmodel = require('./models/Post');


const checkAuth = require('./middlewares/check-auth');



const dburl = "mongodb+srv://Srinivas_586:G0oFWXtsGFl1TWVu@cluster0-fieuc.mongodb.net/Meandemoapp?retryWrites=true&w=majority"
mongoose.connect(dburl,{useNewUrlParser: true, useUnifiedTopology: true},(err,resp)=>{
    if(err)
        console.log("Some error in connecting database!\n",err);
    else
        console.log("Connected to database!");
});
app.use(body_parser.json());



app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
})

//till here copy paste


app.post('/users/signup',(req,response) => {
    usermodel.findOne( {email : req.body.email } , (err, documentfromdb) =>{
        if(err)
            console.log(err);
        else if(documentfromdb){
            response.json({message: "User exists"});
        }
        else{
            bcrypt.hash(req.body.password, 7, (err,hashedpassword)=>{

                const variable = new usermodel({
                    ...req.body,
                    password: hashedpassword
                });
                variable.save( (err,result) =>{
                    if(err){
                        console.log("error occured");
                    }
                    if(result){
                        
                        response.json({message: "User signedup successfully"});
                    }
                } );
            })
        }
    }) 
})


app.post('/users/login',(req,response)=>{

    usermodel.findOne( {email: req.body.email} , (err, documentfromdb) => {
        if(documentfromdb){
            bcrypt.compare(req.body.password , documentfromdb.password , (err, success)=>{
                if(err)
                    console.log(err);
                if(success){
                    jwt.sign( {email : documentfromdb.email , name: documentfromdb.name},'srinivas',(err,signedtoken)=>{
                        response.json({message: "Login Success", email : documentfromdb.email , signedToken: signedtoken});
                    });

                }
                else{
                    response.json({message: "Invalid password"});
                }
            })
        }
        else{
            response.json({message: "User not found"});
        }
        
    })

})

app.get('/users/profile/:email',checkAuth,(req,response)=>{
    

    usermodel.findOne( {email : req.params.email} ,(err,documentfromdb) =>{

        if(documentfromdb){
            response.json({message: "User found", data: documentfromdb});
        }
        else{
            response.json({message: "User not found"});
        }
    }).select("-password") ;


})

app.put('/users/editprofile/:email',checkAuth,(req,response)=>{
    
    usermodel.updateOne( {email : req.params.email} , req.body , (err, result) =>{
        if(err)
            console.log(err);
        if(result["n"] > 0){
            response.json({message: "Profile updation success"});
        }
        else{
            response.json({message: "Profile updation failed"});
        }
    } )

});

app.post('/users/post',checkAuth,(req,response)=>{

    const obj = new postmodel({
        ...req.body
    })
    console.log(obj);

    obj.save((err,result)=>{
        if(err)
            console.log("error in posting",err);
        else{
            response.json({message: "Posted successfully"});
        }
        
        
    })
})


app.get('/users/getposts',checkAuth, (req,response)=>{

    postmodel.find((err,allposts)=>{
        
        response.json({message:"posts fetched successfully", allposts: allposts})
    }).sort( {_id : -1} )

})

app.delete('/users/deletepost/:id', checkAuth , (req,response)=>{
    console.log(req.params.id);

    postmodel.deleteOne( {_id: req.params.id} , (err, result)=>{
        

        if(result["n"]>0){
            response.json({message: "Post deleted successfully"});
        }
        else{
            response.json({message: "Post deletion failed"});
        }
    })

    
})

module.exports= app;