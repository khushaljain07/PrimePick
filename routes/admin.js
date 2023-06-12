//require express
const express = require("express");

//requiring router here
const router = express.Router();
const {check}=require('express-validator');

//requiring productController
 const adminController = require("../controller/admin");
 
 const isAuth=require('../middleware/is-auth');
// //getting add product page here
 router.get("/add-product",isAuth,adminController.getAddProducts);

router.post("/add-product",[
   check('title').isLength({min:5}).isString().trim(),
   check('price').isFloat(),
   check('description').isLength({min:5,max:400}).trim()

],isAuth, adminController.postAddProducts);
// //admin/products




 router.get('/products',isAuth,adminController.getProducts);
// // //posting new product in file



 router.get("/edit-product/:productId",isAuth,adminController.getEditProducts)



 router.post('/edit-product/:productId',[
    check('title').isLength({min:5,max:20}).isString().trim(),
    check('price').isFloat(),
    check('description').isLength({min:5,max:400}).trim()

 ],isAuth,adminController.postEditProducts) 
router.post('/delete-product/:productId',isAuth,adminController.postDeleteProduct)
 
module.exports = router; 
