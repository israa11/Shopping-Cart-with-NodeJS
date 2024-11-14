const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const orderSchema =  mongoose.Schema({
    user : {
        type : schema.Types.ObjectId  ,
        ref :  'User' ,
        required : true ,
    } ,
name:{
    type: String , 
    required: true 
},
address :{
    type: String ,
    required: true
},

cart: {
    type : Object ,
    required: true 
},
orderprice: {
    type: Number , 
    required: true
},
paymentId: {
    type: String ,
    required: true
}


})

module.exports = mongoose.model('order' , orderSchema)