const express = require('express');
const { getCategories } = require('../controller/categoryController')
const router = express.Router();

router.get(`/get-categories`, getCategories);

module.exports = router;