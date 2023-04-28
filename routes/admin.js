//require express
const express = require("express");

//requiring router here
const router = express.Router();

//requiring productController
const adminController = require("../controller/admin");

//getting add product page here
router.get("/add-product", adminController.getAddProducts);

router.post("/add-product", adminController.postAddProducts);
//admin/products
router.get('/products',adminController.getProducts);
// //posting new product in file
router.get("/edit-product/:productId",adminController.getEditProducts)

 router.post('/edit-product/:productId',adminController.postEditProducts) 
router.post('/delete-product/:productId',adminController.postDeleteProduct)
 
module.exports = router; 
