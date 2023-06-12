const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const Products = require("../model/product");
const Order = require("../model/order");

exports.getProducts = (req, res, next) => {
  Products.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        docTitle: "shop",
        path: "/",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Products.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Products.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        docTitle: "shop",
        path: "/",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Products.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProducts = (req, res, next) => {
  const prodId = req.body.productId;
  const price = req.body.price;
  req.user
    .removeFromCart(prodId, price)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user.populate("cart.items.productId").then((user) => {
    const products = user.cart.items;
    const total = user.cart.total;
    console.log(products);
    res.render("shop/cart", {
      path: "/cart",
      docTitle: "Your Cart",
      products: products,
      total: total,
    });
  });
};

// exports.getCheckout = () => {
//   res.render("shop/checkout", {
//     prods: product,
//     docTitle: "shop",
//     path: "/",
//   });

exports.getOrder = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        docTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId).then((order) => {
    if (!order) {
      return next(new Error("No order found"));
    }
    if (order.user.userId.toString() !== req.user._id.toString()) {
      return next(new Error("unauthorized"));
    }
    const invoiceName = "invoice-" + orderId + ".pdf";
    const invoicePath = path.join("data", "invoices", invoiceName);
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(14).text("Invoice", {
      underline: true,
    });
    pdfDoc.text("--------------");
    let total = 0;
    order.products.forEach((prod) => {
      total = total + prod.quantity * prod.product.price;
      pdfDoc.text(
        prod.product.title +
          "-" +
          prod.quantity +
          "x" +
          "$" +
          prod.product.price
      );
    });
    pdfDoc.text("--------------");
    pdfDoc.fontSize(20).text("Total Price $" + total);
    pdfDoc.end();
    // const file=fs.createReadStream(invoicePath);
    // fs.readFile(invoicePath,(err,data )=>{
    //   if(err){
    //     return next(err);
    //   }
    // })
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline;filename="' + invoiceName + '"'
    );
    // res.send(data);
    // file.pipe(res);
  });
};
