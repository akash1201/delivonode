//import asyncHandler from 'express-async-handler';
const asyncHandler= require('express-async-handler');
//import User from '../models/user.js';
const user= require('../models/user.js');
//import generateToken from '../utils/generateToken.js';
const generateToken= require('../utils/generateToken.js');


const register = asyncHandler( async (req, res) => {

         let user = await User.create(req.body);
         res.json(user);

});

const login = asyncHandler ( async (req, res) => {
          let {email, password} = req.body;
          const user = await User.findOne({userName : email});

          if (user && (await user.matchPassword(password))) {
                      res.json({
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        userType: user.userType,
                        token: generateToken(user._id),
                      });
          } else {
                res.status(401);
            throw new Error("Invalid email or password");
          }
});

export {register,login}