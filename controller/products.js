const Products=require('../models/product');
exports.getAddProduct=(req,res,next)=>{
    res.render('add-product',{docTitle:'Add product',path:'/admin/add-product'})
 }
 exports.postAddProduct=(req,res,next)=>{
  const product=new Products(req.body.title);
  product.save();
     res.redirect('/');
}
exports.getProduct=(req,res,next)=>{
    Products.fetchAll(products=>{
        res.render('shop',{
            prods:products,
            docTitle:'shop',path:'/',
            docTitle:'shop',
            hasProduct:products.length>0,
            activeShop:true,
            productCSS:true
        });
    });
  
 }