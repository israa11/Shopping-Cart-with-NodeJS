const db =  require('../config/database')
const Product = require('../models/Products');
const products = [
    new Product ({

        imagePath: '/images/Huawei Y9 2019 Dual SIM - 64GB, 4GB RAM, 4G LTE, Arabic Blue.jpg' ,
    
        productName: 'Huawei Y9' ,
    
        information: {
            storageCapacity: 64 ,
            numberOfSIM: 'Dual SIM' , 
            cameraResolution: 16 , 
            displaySize : 6.5 ,
    
        } ,
    
        price: 220 ,
    }),
    new Product({
        imagePath: '/images/Apple iPhone X with FaceTime - 64GB, 4G LTE, Space Grey.jpg' ,
    
        productName: 'Apple iPhone X' ,
    
        information: {
            storageCapacity: 64 ,
            numberOfSIM: 'Dual SIM' , 
            cameraResolution: 12 , 
            displaySize : 5.5 ,
    
        } ,
    
        price: 200 ,
    }),
    new Product({
        imagePath: '/images/Oppo A3S Dual SIM - 16GB, 2GB RAM, 4G LTE, Purple.jpg' ,
    
    productName: 'Oppo A3S' ,

    information: {
        storageCapacity: 64 ,
        numberOfSIM: 'Dual SIM' , 
        cameraResolution: 20 , 
        displaySize : 5.5 ,

    } ,

    price: 230 ,
    }),
    new Product({
        
        imagePath: '/images/Samsung Galaxy Note 9 Dual SIM - 128GB, 6GB RAM, 4G LTE, Midnight Black.jpg' ,
    
        productName: 'Samsung Galaxy Note 9' ,
    
        information: {
            storageCapacity: 128 ,
            numberOfSIM: 'Dual SIM' , 
            cameraResolution: 12 , 
            displaySize : 6.4 ,
    
        } ,
    
        price: 250 ,
    }),
    new Product ({

        imagePath: '/images/Huawei Y9 2019 Dual SIM - 64GB, 4GB RAM, 4G LTE, Arabic Blue.jpg' ,
    
        productName: 'Huawei Y9' ,
    
        information: {
            storageCapacity: 64 ,
            numberOfSIM: 'Dual SIM' , 
            cameraResolution: 16 , 
            displaySize : 6.5 ,
    
        } ,
    
        price: 220 ,
    }),
    new Product({
        imagePath: '/images/Apple iPhone X with FaceTime - 64GB, 4G LTE, Space Grey.jpg' ,
    
        productName: 'Apple iPhone X' ,
    
        information: {
            storageCapacity: 64 ,
            numberOfSIM: 'Dual SIM' , 
            cameraResolution: 12 , 
            displaySize : 5.5 ,
    
        } ,
    
        price: 200 ,
    }),
    new Product({
        imagePath: '/images/Oppo A3S Dual SIM - 16GB, 2GB RAM, 4G LTE, Purple.jpg' ,
    
    productName: 'Oppo A3S' ,

    information: {
        storageCapacity: 64 ,
        numberOfSIM: 'Dual SIM' , 
        cameraResolution: 20 , 
        displaySize : 5.5 ,

    } ,

    price: 230 ,
    }),
    new Product({
        
        imagePath: '/images/Samsung Galaxy Note 9 Dual SIM - 128GB, 6GB RAM, 4G LTE, Midnight Black.jpg' ,
    
        productName: 'Samsung Galaxy Note 9' ,
    
        information: {
            storageCapacity: 128 ,
            numberOfSIM: 'Dual SIM' , 
            cameraResolution: 12 , 
            displaySize : 6.4 ,
    
        } ,
    
        price: 250 ,
    })
]

products.forEach((product)=>{
    product.save()
    
})