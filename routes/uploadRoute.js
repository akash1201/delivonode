const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

var data;
var date = new Date();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(null, file.originalname);
    cb(
      null,
      `${file.fieldname}-${Date.now()}${date.getTime()}${path.extname(
        file.originalname
      )}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  data = file;
  console.log(data);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const maxSize = 1 * 1000 * 1000;

const upload = multer({
  storage: storage,
  limits: { filesize: maxSize },
  fileFilter: function (req, file, cb) {
    console.log(file.originalname);
    checkFileType(file, cb);
  },
});

const uploadMulti = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log(file.originalname);
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({ imagedata: `${req.file.path}` });
});

router.post("/uploadsMulti", uploadMulti.array("image", 5), (req, res) => {
  res.send({ imagedata: req.file });
});

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};
var storageExcel = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});
var uploadFile = multer({ storage: storageExcel, fileFilter: excelFilter });

router.post("/uploadExcel", uploadFile.single("image"), (req, res) => {
  console.log(req.file);
  res.status(200).json({ mess: req.file });
});

module.exports = router;
