//require product class from the model folder
const { validationResult } = require("express-validator");
const Product = require("../model/product");
const fileHelper = require("../util/file");
//this will render the view add-product file here--->(admin/add-product) is refering to add-product file of view

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add product",
    path: "/admin/edit-product",
    editing: false,
    errorMessage: null,
    hasError: false,
  });
};

//adding new product and redirect to home
exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;

  const userId = req.user;
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/add-product", {
      path: "/admin/edit-product",
      docTitle: "Add product",
      hasError: true,
      editing: false,
      errorMessage: errors.array()[0].msg,
      title: title,
      price: price,
      description: description,
    });
  }
  const imageUrl = image.path;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: userId,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProducts = (req, res, next) => {
  const id = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  Product.findById(id)
    .then((product) => {
      res.render("admin/edit-product", {
        product: product,
        docTitle: "Edit product",
        path: "/admin/edit-product",
        editing: editMode,
        errorMessage: null,
        hasError: false,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
      if (!product) return next(new Error("product not found"));
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: id, userId: req.user._id });
    })
    .then(() => {
      console.log("deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProducts = (req, res, next) => {
  const id = req.params.productId;
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDesc,
        _id: prodId,
      },
      errorMessage: errors.array()[0].msg,
    });
  }
  Product.findById(id)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString())
        return res.redirect("/");
      product.title = title;
      product.price = price;
      product.description = description;
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }

      return product.save().then((result) => {
        console.log("updated");
        res.redirect("/admin/products");
      });
    })

    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id }).then((product) => {
    res.render("admin/products", {
      prods: product,
      docTitle: "Admin products",
      path: "/admin/products",
    });
  });
};
