//import asyncHandler from 'express-async-handler';
const asyncHandler= require('express-async-handler');
//import Store from '../models/Store.js';
const Store= require('../models/Store.js');
const jwt= require('jsonwebtoken');

//custom
//import generateToken from '../utils/generateToken.js';
const generateToken= require('../utils/generateToken.js');

const login = asyncHandler (async(req, res)=>{

          let {email, password} = req.body;
          const store = await Store.findOne({email : email});

          if(store){
                if(await store.matchPassword(password)){
                       res.json({
                              _id: store._id,
                              storeName: store.storeName,
                              phoneNo: store.phoneNo,
                              address : store.address,
                              email: store.email,
                              userType: store.userType,
                              token: generateToken(store._id),
                       })
                }else{
                          res.status(500).json({message : `Password didn't match`, status : 500})
                }
          }else{
                    res.status(404).json({message : "Email Not Found", status : 404})
          }

});

const registerStore = asyncHandler(async(req, res)=>{
          try{       
                    let {email,phoneNo,liscenseNo} = req.body;

                    let emailExists = await Store.findOne({email : email});
                    let phoneNoExists = await Store.findOne({phoneNo : phoneNo});
                    if(emailExists){
                              res.status(500).json({message : "Email already in use", status : 500});
                    }
                    else if(phoneNoExists){
                              res.status(500).json({message : 'Phone No already in use', status : 500})
                    }else{
                              let store = await Store.create(req.body);
                              res.json({
                                     _id : store._id,
                                     token : generateToken(store._id),
                                     email : email,
                                     phoneNo : phoneNo
                              })
                              res.json({store : store});
                    }
          }catch(err){
                 res.status(500).json({message : err.message})
          }
})

const setStoreStatus = asyncHandler ( async (req, res)=>{
     try{
       let token = req.headers.authorization.split(' ')[1]
       let userid = jwt.verify(token, process.env.JWT_SECRET)
       console.log(userid.id);
        
       await Store.updateOne({_id : userid.id}, {active : req.body.status})
       res.json({msg : 'Updated'})

     }catch(err){
          res.status(500).json({status : 500, msg : err.msg});
     }
})

module.exports = { registerStore, login, setStoreStatus }
