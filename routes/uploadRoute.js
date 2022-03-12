//import path from 'path'
const path= require('path');
//import express from 'express'
const express= require('express')
//import multer from 'multer'
const multer= require('multer')
//import fs from 'fs'
const fs= require('fs')
const router = express.Router()
var data;
var date = new Date();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) { 
      cb(null, file.originalname)
      cb(
        null,
        `${file.fieldname}-${Date.now()}${date.getTime()}${path.extname(file.originalname)}`
      )
    
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  data = file;
  console.log(data);
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log(file.originalname)
    checkFileType(file, cb)
  },
})

const uploadMulti = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log(file.originalname)
    checkFileType(file, cb)
  },
})

router.post('/' ,upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

router.post('/products' ,uploadMulti.array('image', 4), (req, res) => {
 
  res.send(req.files)
})





module.exports = router
