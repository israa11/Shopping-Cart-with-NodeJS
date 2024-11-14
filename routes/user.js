const express  =  require('express');
const Order = require('../models/Order')
const {body, validationResult } = require('express-validator');

const router = express.Router()

const passport = require('passport');

const isAusentecated = ((req , res , next) =>{
    if(req.isAuthenticated()){
        
       res.redirect('/')
       return
    }
    next()
    })

    const isnotAutenticated = ((req , res , next) =>{
        if(!req.isAuthenticated()){
           res.redirect('signin')
           return
        }
     
        next()
        })

router.get('/signup' ,isAusentecated, (req, res , next)=>{
    res.render('user/signup')
})
router.post('/signup' ,[
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('confirm-password').custom((value, { req }) => {
         if (value !== req.body.password) { 
        throw new Error('Password confirmation does not match password');
     } 
     return true; 
    })

] ,(req, res , next)=>{

const errors = validationResult(req);
if(!errors.isEmpty()){
    
    const validationMsg = []
    for(let i = 0; i <errors.errors.length ; i++){
        validationMsg.push(errors.errors[i].msg)
    }
  
   req.flash('error_msg' ,validationMsg)
   res.redirect('signup')
    return
}
 next()

}, passport.authenticate('local-signup', {
    
    successRedirect : 'signin' ,
    failureRedirect : 'signup' ,
    failureMessage : true
}))

router.get('/signin' ,isAusentecated, (req, res)=>{
    res.render('user/signin')
})


router.post('/signin' ,[
    body('email').notEmpty().withMessage('please enter  your email'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('email').notEmpty().withMessage('please enter  your password'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
   

] ,(req, res , next)=>{

const errors = validationResult(req);
if(!errors.isEmpty()){
    console.log(errors)
    const validationMsg = []
    for(let i = 0; i <errors.errors.length ; i++){
        validationMsg.push(errors.errors[i].msg)
    }
   console.log(validationMsg)
   req.flash('error_msg' ,validationMsg)
   res.redirect('signin')
    return
}
 next()

}, passport.authenticate('local-signin', {
    
    successRedirect : 'profile' ,
    failureRedirect : 'signin' ,
    failureMessage : true
}))

router.get('/profile' ,isnotAutenticated, (req, res , next)=>{
    if (req.user.cart) {
       
        totalproducts = req.user.cart.totalQuantity;
      
        
      } else {
        totalproducts = 0;
      }

    
        Order.find({user : req.user._id}).then((order)=>{
            
            res.render('user/profile.ejs' , {checkuser : true, 
                username: req.user.username , 
                totalproducts: totalproducts,
                userorder : order
            })
        })

    

  
    
})

router.get('/logout' ,(req , res ,next)=>{
    {
        req.logout((err) => 
        { if (err) {
             return next(err); 
         }
          res.redirect('signin')
          
        })
}
})


module.exports = router