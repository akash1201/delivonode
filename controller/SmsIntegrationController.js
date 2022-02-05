import asyncHandler from 'express-async-handler';
import fetch from 'node-fetch';
import otpGenerator from 'otp-generator';
import dotenv from 'dotenv';

dotenv.config();

const sendOtp = asyncHandler(async(req, res)=>{

          let {number} = req.body;

          try{
               let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
               
             
                    let  headers = {
                         "Content-Type" : "application/json",
                         "api-key" : process.env.SMS_API_KEY,
                    }
     
               let body = {
                    to : number,
                    type : 'OTP',
                    sender : process.env.SMS_API_SID,
                    body : `Dear Customer, ${otp} is your OTP (One Time Password) for the registration.`,

               }
               let response = await fetch(`${process.env.SMS_BASE_URL}/${process.env.SMS_API_SID}/messages`,
              { method: 'post',
               body: JSON.stringify(body),
               headers: headers})

               console.log(response);
          }catch(err){

          }


})

export { sendOtp }