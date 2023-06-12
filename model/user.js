const mongoose=require('mongoose');
const schema=mongoose.Schema
const userSchema=new schema({
  
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  resetToken:String,
  resetTokenExpiration:Date,
  cart:{
      items:[ {productId:{type:schema.Types.ObjectId,ref:'Product',required:true},quantity:{type:Number,required:true}}],
        total:{type:Number,required:true}

    }

  })
   
  userSchema.methods.addToCart=function(product){
    const cartProductIndex = this.cart.items.findIndex(
            (cp) => cp.productId.toString() == product._id.toString()
          ); 
          let newQuantity = 1;
         let cartTotal=this.cart.total+product.price;
       
          const updateCartItems = [...this.cart.items];
          if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updateCartItems[cartProductIndex].quantity = newQuantity;
            
          } else {
            updateCartItems.push({
              productId: product._id,
              quantity: newQuantity,
            });
          }
          const updatedCart = { items: updateCartItems,total:cartTotal};
          this.cart=updatedCart
          return this.save()
        }
  userSchema.methods.removeFromCart=function(productId,price){
            const cartTotal=this.cart.total;
          const updatedCartItems=this.cart.items.filter(item=>{ 
                return item.productId.toString()!==productId.toString();
              })
            
              this.cart={items:updatedCartItems,total:cartTotal-price} 
            
              return this.save();
        }
  userSchema.methods.clearCart=function(){
    const updatecart={items:[],total:0}
    this.cart=updatecart;
    this.save()
  }
   
  module.exports = mongoose.model('User',userSchema);
 



//   addOrder(){
//     const db=getdb();
//     return this.getCart().then(products=>{
//       const order={
//         items:products,
//         user:{
//           _id:new ObjectId(this._id),
//           name:this.name}
//       }
//       return db.collection('orders').insertOne(order)
//     })
//       .then(result=>{
//       this.cart={items:[]};
//       return db.collection('user').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:[]}}})
//     })
//   } 

//   getOrders(){
//     const db=getdb();
//     return db.collection('orders').find({'user._id':new ObjectId(this._id)}).toArray();
//   }

// deleteItemFromCart(productId){ 
//   
//   const db=getdb();
//   return db.collection('user').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:updatedCartItems}}})
// }

//   static findById(id) {
//     const db = getdb();
//     return db
//       .collection("user")
//       .find({ _id: new ObjectId(id) })
//       .next()
//       .then((user) => {
//         return user;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
