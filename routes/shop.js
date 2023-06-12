
const express=require('express');
const router=express.Router();
const shopController=require('../controller/shop')
//getting shop page 
const isAuth=require('../middleware/is-auth')
 router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts)
 router.get('/products/:productId',shopController.getProduct)
  router.get('/cart',isAuth,shopController.getCart);
router.post('/cart',isAuth,shopController.postCart)
  router.post('/cart-delete-item',isAuth,shopController.postCartDeleteProducts);
 router.post('/create-order',isAuth,shopController.postOrder);
 router.get('/orders',isAuth,shopController.getOrder);
 router.get('/orders/:orderId',isAuth,shopController.getInvoice)
// // router.get('/checkout',shopController.getCheckout)
module.exports=router;  