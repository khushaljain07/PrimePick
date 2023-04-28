const Products = require("../model/product");
 
exports.getProducts = (req, res, next) => {
  Products.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Products.fetchProduct(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
exports.getIndex = (req, res, next) => {
  Products.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        docTitle: "shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Products.fetchProduct(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
 
};
exports.postCartDeleteProducts = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId)
  .then(result=>
    {
      res.redirect('/cart')
    }
    ).catch(err=>console.log(err))

};
// exports.getCart = (req, res, next) => {
//   req.user.getCart().then((cart) => {
//     return cart.getProducts().then((products) => {
//       res.render("shop/cart", {
//         path: "/cart",
//         docTitle: "Your Cart",
//         products: products,
//       });
//     });
//   });
// };

// exports.getCheckout = () => {
//   res.render("shop/checkout", {
//     prods: product,
//     docTitle: "shop",
//     path: "/",
//   });

exports.getOrder=(req,res,next)=>{
  req.user.getOrders().then(orders=>{
    res.render('shop/orders',{
      path:'/orders',
      docTitle:'your Orders',
      orders:orders
    })
  })
}
exports.postOrder=(req,res,next)=>{
  req.user.addOrder().then(result=>{
    res.redirect('/orders');
  })
}
