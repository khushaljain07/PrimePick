const getdb = require("../util/database").getdb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getdb();
    return db
      .collection("user")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId.toString() == product._id.toString()
    );
    let newQuantity = 1;
    const updateCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updateCartItems.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    }
    const updatedCart = { items: updateCartItems };
    const db = getdb();
    return db
      .collection("user")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }



  getCart(){
   const productId=this.cart.items.map(i=>{
        return i.productId;
    })
    const db=getdb();
    return db.collection('product').find({_id:{$in:productId}}).toArray()
    .then(product=>{
        return product.map(p=>{
            return {...p,quantity:this.cart.items.find(i=>{
                return i.productId.toString()===p._id.toString();
            }).quantity
        }
        })
    })

  }

  addOrder(){
    const db=getdb();
    return this.getCart().then(products=>{
      const order={
        items:products,
        user:{
          _id:new ObjectId(this._id),
          name:this.name}
      }
      return db.collection('orders').insertOne(order)
    })
      .then(result=>{
      this.cart={items:[]};
      return db.collection('user').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:[]}}})
    })
  } 

  getOrders(){
    const db=getdb();
    return db.collection('orders').find({'user._id':new ObjectId(this._id)}).toArray();
  }

deleteItemFromCart(productId){
  const updatedCartItems=this.cart.items.filter(item=>{
    return item.productId.toString()==productId.toString();
  })
  const db=getdb();
  return db.collection('user').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:updatedCartItems}}})
}

  static findById(id) {
    const db = getdb();
    return db
      .collection("user")
      .find({ _id: new ObjectId(id) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
