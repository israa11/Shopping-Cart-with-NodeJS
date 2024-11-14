const express  =  require('express');
const router = express.Router()
const Product = require('../models/Products');

const Cart = require('../models/Cart');
const Order = require('../models/Order')
const stripe = require('stripe')('sk_test_51QHjb0P2SIAA7X34u84gnLXgBDNoNnDSKUCaJC7tensSXlSCwtiGDOUf96EIEX2GNTZyotItoyN0BQWQDAmhoyuB00QKQgFJyy');
router.get('/' , (req , res)=>{
let totalproducts ;
   if (req.isAuthenticated()) {
    
      if (req.user.cart) {
       
        totalproducts = req.user.cart.totalQuantity;
        
      } else {
        totalproducts = 0;
      }
  
    }
  
   
   Product.find({}).then((products)=>
       res.render('index.ejs' , {
      products : products,
      checkuser: req.isAuthenticated(),
      totalproducts: totalproducts,
     
   }))
  
})

router.get('/addTocart/:id/:productname/:price' , (req , res , next)=>{
  
  
const newproductprice = parseInt(req.params.price , 10)

const newproduct = {
   _id: req.params.id ,
  name: req.params.productname,
  price: newproductprice ,
  quantity : 1, 
}

const cartID = req.user._id ;

 Cart.findById(cartID).then((cart) => {
   
   if(!cart){
      
const newcart = new Cart ({
   _id: cartID ,
   totalQuantity : 1 ,
   totalPrice :  newproductprice ,
   selectedProduct : [newproduct]
   
})
newcart.save().then(() => res.redirect('/'))
}

if(cart){
let indexOfproduct  ;
for(let i = 0; i < cart.selectedProduct.length ; i++){

   if(cart.selectedProduct[i]._id === req.params.id){
indexOfproduct = i ;
   }
}
if(indexOfproduct !== undefined){
cart.selectedProduct[indexOfproduct].price =  cart.selectedProduct[indexOfproduct].price + newproductprice ;
cart.selectedProduct[indexOfproduct].quantity =  cart.selectedProduct[indexOfproduct].quantity+ 1;
cart.totalQuantity =  cart.totalQuantity +1;
cart.totalPrice = cart.totalPrice +newproductprice ;
Cart.updateOne({_id: cartID} , {$set: cart}).then((cart)=> console.log(cart))
}else{
   cart.totalQuantity =  cart.totalQuantity +1;
cart.totalPrice = cart.totalPrice +newproductprice ;
cart.selectedProduct.push(newproduct);
Cart.updateOne({_id: cartID} , {$set: cart}).then((cart)=> console.log(cart))
}
res.redirect('/')
}
})


})

router.get('/shopping-cart' , (req, res , next)=>{
   if(!req.isAuthenticated()){
      res.redirect('/users/signin')
      return
    }
    
    const usercart = req.user.cart;
    if(!usercart){
      res.render('shopping-cart' , {
         checkuser: req.isAuthenticated(),
         usercart: 0,
         totalproducts: 0
        
      })
    }else{
      res.render('shopping-cart' , {
         checkuser: req.isAuthenticated(),
         usercart: usercart,
         totalproducts: req.user.cart.totalQuantity
      })
    }



   
})

router.get('/deleteProduct/:index', (req, res , next)=>{

if(req.user.cart){
   const usercart = req.user.cart;
   const index = req.params.index
if(usercart.selectedProduct.length <= 1){
  Cart.deleteOne({_id: usercart._id}).then(()=>  res.redirect('/shopping-cart'));
}

   else{
      usercart.totalPrice =  usercart.totalPrice - usercart.selectedProduct[index].price;
      usercart.totalQuantity =  usercart.totalQuantity -  usercart.selectedProduct[index].quantity;
      usercart.selectedProduct.splice(index , 1);
      Cart.updateOne({_id: usercart._id}, {$set: usercart}).then(()=>  res.redirect('/shopping-cart'));
   }
  
  
 
}else{
   res.redirect('/shopping-cart')
 }
})

router.get('/increaseProduct/:index', (req, res ,next)=>{
   if(req.user.cart){
      const usercart = req.user.cart;
      const index = req.params.index

      usercart.totalPrice =  usercart.totalPrice +  ( usercart.selectedProduct[index].price /  usercart.selectedProduct[index].quantity);
      usercart.totalQuantity =  usercart.totalQuantity +  1;
      usercart.selectedProduct[index].price =  usercart.selectedProduct[index].price +
       ( usercart.selectedProduct[index].price /  usercart.selectedProduct[index].quantity);
       usercart.selectedProduct[index].quantity = usercart.selectedProduct[index].quantity +1; 

       Cart.updateOne({_id: usercart._id}, {$set: usercart}).then(()=>  res.redirect('/shopping-cart'));
   }else{
      res.redirect('/shopping-cart')
    }

})

router.get('/decreaseProduct/:index' , (req, res, next)=>{
   if(req.user.cart){
      const usercart = req.user.cart;
      const index = req.params.index

      usercart.totalPrice =  usercart.totalPrice -  ( usercart.selectedProduct[index].price /  usercart.selectedProduct[index].quantity);
      usercart.totalQuantity =  usercart.totalQuantity -  1;
      usercart.selectedProduct[index].price =  usercart.selectedProduct[index].price -
       ( usercart.selectedProduct[index].price /  usercart.selectedProduct[index].quantity);
       usercart.selectedProduct[index].quantity = usercart.selectedProduct[index].quantity - 1; 

       Cart.updateOne({_id: usercart._id}, {$set: usercart}).then(()=>  res.redirect('/shopping-cart'));
   }else{
      res.redirect('/shopping-cart')
    }
})

router.get('/checkout' ,  (req, res, next)=>{
   if(req.user.cart){
   res.render('checkout', {
      checkuser: req.isAuthenticated(),
         
         totalproducts: req.user.cart.totalQuantity,
         totalPrice: req.user.cart.totalPrice 
   })
}else{
   res.redirect('/shopping-cart')
}
})

router.post('/checkout',async  (req, res, next)=>{
   try{
const charge = await stripe.charges.create({
   amount: req.user.cart.totalPrice ,
   currency: "usd",
   source: req.body.stripeToken,
   description: "charge for test@example.com"
})

const order = new Order({
         user: req.user._id,
         name: req.body.name,
         address: req.body.address , 
         cart : req.user.cart,
         orderprice: req.user.cart.totalPrice,
         paymentId: charge.id
      })
      const saveorder = await order.save();
     const deletecart = await Cart.deleteOne({_id: req.user.cart._id})
    
      
     
   
     res.redirect('');
   }catch(err){
      
      res.redirect('/checkout');
   } 
  

})

module.exports = router