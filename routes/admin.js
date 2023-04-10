//require express
const express = require("express");

//requiring router here
const router = express.Router();

//requiring productController
const adminController = require("../controller/admin");

//getting add product page here
router.get("/add-product", adminController.getNewProducts);

//admin/products
router.get('/products',adminController.getProducts);
//posting new product in file
router.post("/add-product", adminController.addNewProducts);

exports.routes = router;
