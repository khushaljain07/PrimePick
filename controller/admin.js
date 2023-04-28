//require product class from the model folder
const Product= require("../model/product");
//this will render the view add-product file here--->(admin/add-product) is refering to add-product file of view
exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add product",
    path: "/admin/add-product",
    editing:false
  });
};

//adding new product and redirect to home
exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product=new Product(title,price,description,imageUrl,null,req.user._id)
  
 product.save()
 .then(result=>{
  console.log(result);
  res.redirect('/admin/products');
 })
 .catch(err=>{
  console.log(err)
 })
  
 
  
};

exports.getEditProducts = (req, res, next) => {
  const id=req.params.productId;
   const editMode=req.query.edit;
   if(!editMode)
   return res.redirect('/');
   Product.fetchProduct(id)
  .then((product)=>{
  
 res.render("admin/edit-product", {
      product:product,
      docTitle: "Edit product",
      path: "/admin/edit-product",
      editing:editMode
    });
  })
  .catch(err=>{console.log(err)})
   
};
exports.postDeleteProduct=(req,res,next)=>{
  const id=req.params.productId;
  Product.deleteProduct(id).then(()=>{
    console.log('deleted')
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err)
  })
  
}
exports.postEditProducts=(req,res,next)=>{
  const id=req.params.productId;
  const title=req.body.title;
  const imageUrl=req.body.imageUrl;
  const price=req.body.price;
  const description=req.body.description
const updateproduct=new Product(title,price,description,imageUrl,id);
      
updateproduct.save().then(result=>{
  console.log('updated')
  res.redirect('/admin/products');
}).catch(err=>{
  console.log(err);
})

}   
  exports.getProducts=(req,res,next)=>{
 Product.fetchAll().then(product => {
        res.render("admin/products", {
          prods: product,
          docTitle: "Admin products",
          path: "/admin/products",
        });
      });
}
