const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/User');
const Cart = require('../models/Cart');

passport.serializeUser(function(user, done) { 
    done(null, user.id)
 });


 passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).select('email username');
       const cart = await Cart.findById(id);
       if(!cart){
        return done(null, user);
       }
       user.cart = cart ;
          return done(null, user);
    } catch (err) {

        return done(err);
    }
});

    passport.use('local-signup' , new LocalStrategy ({
        usernameField : 'email' ,
        passwordField : 'password' ,
        passReqToCallback : true
    } , async ( req  ,email , password , done)=>{
        try { 
            const user = await User.findOne({ email: email });
             if (user) { 
                return done(null, false); 

             }
              const newUser = new User({
                username : req.body.username,
                email: email, 
              password: new User().hashPassword(password)
                 }); 
        const savedUser = await newUser.save();
         return done(null, savedUser); 
        } 
         catch (err) {
             return done(err);
             }
        
    }))

    passport.use('local-signin', new LocalStrategy({
        usernameField : 'email' ,
        passwordField : 'password' ,
        passReqToCallback : true,
    }, async (req , email , password , done) =>{
        try{
            const user = await User.findOne({ email: email });
if(!user){
    return done(null , false)
}
if(! user.comparePassword(password)){
    return done(null , false)
}
return done(null , user)
        }catch(err){

        }
    }
)
)