import express from 'express';
import {addCategory, addProduct, getProducts, updateProduct, deleteProduct} from '../controller/ProductController.js'
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post(`/add-category`, addCategory);
router.post(`/add-product`, protect, addProduct);
router.get(`/vendor/get-products/:categoryId`, protect, getProducts);
router.put(`/update-product/:productId`, protect, updateProduct);
router.delete(`/delete-product/:productId`, protect, deleteProduct);

export default router;