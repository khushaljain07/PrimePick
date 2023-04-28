const mongodb=require('mongodb')
const getdb=require('../util/database').getdb;
class Product{
  constructor(title,price,description,imageUrl,id,userId){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
    this._id=id?new mongodb.ObjectId(id):null;
    this.userId=userId;
  }
  save() {
  
  const db=getdb();
  let dbOp;
  console.log(this._id);
  if(this._id){ 
    
    dbOp=db.collection('product').updateOne({_id:this._id},{$set:this});
  }
   else{
dbOp=db.collection('product').insertOne(this)
    console.log(this);
  }

 return dbOp.then(result=>{
  
  console.log(result);
 })
 .catch(err=>{
  console.log(err);
 })
  }
    
static fetchAll(){
  const db=getdb();
  return db.collection('product').find().toArray().then(products=>{
  
    return products;
  }).catch(err=>{
    console.log(err);
  });

}
 static fetchProduct(id){
  const db=getdb();
  return db.collection('product').find({_id:new mongodb.ObjectId(id)}).next().then(product=>{
    console.log(product);
    return product;
  }).catch(err=>{
    console.log(err);
  })
 }

 static deleteProduct(id){
  const db=getdb();
 return db.collection('product').deleteOne({_id:new mongodb.ObjectId(id)})
 .then(result=>{
    console.log('deleting');
  }).catch(err=>{
    console.log(err)
  })
 }
}



module.exports = Product;
 