import asyncHandler from 'express-async-handler';

const placeOrder = asyncHandler( async(req, res)=>{

          try{

          }catch(err){
                    res.status(500).json({status : 500,msg : err.message})
          }

})

export {placeOrder}