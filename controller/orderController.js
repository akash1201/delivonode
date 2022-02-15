//import asyncHandler from 'express-async-handler';
const asyncHandler= require('express-async-handler');
const jwt= require('jsonwebtoken');

exports.placeOrder = asyncHandler( async(req, res)=>{

          try{

          }catch(err){
                    res.status(500).json({status : 500,msg : err.message})
          }

})

exports.getOrders = asyncHandler ( async (req, res)=>{

     try{
          let token = req.headers.authorization.split(' ')[1]
          let userid = jwt.verify(token, process.env.JWT_SECRET)
          console.log(userid.id);

          let pageNo = req.params.pageNo? req.params.pageNo : 1

          let type = req.params.type;
          if(type == 'all'){
             
                    let data = [{
                              _id : userid.id,
                              name : 'Devesh Goplani',
                              userId : userid.id,
                              date : new Date(),
                              paymenType : 'COD',
                              status : 'accepted',
                              },
                              {
                                        _id : userid.id,
                                        name : 'Devesh Goplani',
                                        userId : userid.id,
                                        date : new Date(),
                                        payment_type : 'COD',
                                        status : 'accepted',
                                        totalAmount : 100,
                                        itemCount : 5
                              },
                              {
                                        _id : userid.id,
                                        name : 'Akash Chhetri',
                                        userId : userid.id,
                                        date : new Date(),
                                        payment_type : 'COD',
                                        status : 'accepted',
                                        totalAmount : 150,
                                        itemCount : 6
                              },
                              {
                                        _id : userid.id,
                                        name : 'Harshit Gupta',
                                        userId : userid.id,
                                        date : new Date(),
                                        payment_type : 'COD',
                                        status : 'accepted',
                                        totalAmount : 150,
                                        itemCount : 1
                              }
                   ]

                    res.status(200).json({status : 200, msg : 'Success', data : data});

          }else if (type == 'pending'){
                    let data = [{
                              _id : userid.id,
                              name : 'Devesh Goplani',
                              userId : userid.id,
                              date : new Date(),
                              payment_type : 'COD',
                              status : 'pending',
                              },
                              {
                                        _id : userid.id,
                                        name : 'Devesh Goplani',
                                        userId : userid.id,
                                        date : new Date(),
                                        payment_type : 'COD',
                                        status : 'pending',
                                        totalAmount : 100,
                                        itemCount : 5
                              },
                              {
                                        _id : userid.id,
                                        name : 'Akash Chhetri',
                                        userId : userid.id,
                                        date : new Date(),
                                        payment_type : 'COD',
                                        status : 'pending',
                                        totalAmount : 150,
                                        itemCount : 6
                              },
                              {
                                        _id : userid.id,
                                        name : 'Harshit Gupta',
                                        userId : userid.id,
                                        date : new Date(),
                                        payment_type : 'COD',
                                        status : 'pending',
                                        totalAmount : 150,
                                        itemCount : 1
                              }
                   ]

                    res.status(200).json({status : 200, msg : 'Success', data : data});
          }else{
                    res.status(400).json({status : 400, msg : 'Invalid type'})
          }
     }catch(err){
               res.status(500).json({status : 500, msg : err.message});
     }


})


exports.orderDetails = asyncHandler ( async (req, res)=>{
          try{
              
                    let orderId = req.params.orderId;
                    let token = req.headers.authorization.split(' ')[1]
                    let userid = jwt.verify(token, process.env.JWT_SECRET)
                    console.log(userid.id);

                    let data = {
                                _id : userid.id,
                                userId : userid.id,
                                name : 'Devesh Goplani',
                                contact : '7431979503',
                                items : [
                                          {
                                                    name : 'Onion',
                                                    amount : 1,
                                                    unit : 'kg',
                                                    qty : 1,
                                                    price : 3
                                          },
                                          {
                                                  name : 'Potato',
                                                  amount : 1,
                                                  unit : 'kg',
                                                  qty : 1,
                                                  price : 3
                                        }
                                ],
                                paymentType : 'COD',
                                note : 'Please keep tomato in separate bags',
                                deliveryDetails : {
                                          name : 'Ram Nath',
                                          _id : userid.id,
                                          phoneNo : '7545678976',
                                }

                    }

                    res.status(200).json({status : 200, msg : 'success', data : data});

          }catch(err){
                    res.status(500).json({msg : err.message});
          }
})