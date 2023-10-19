const mongoose=require('mongoose');

const formSchema=new mongoose.Schema({
    vendorName:{type:String},
    bankAccountNo:{type:String},
    bankName:{type:String},
    addressLine1:{type:String},
    addressLine2:{type:String},
    city:{type:String},
    country:{type:String},
    zipCode:{type:String}
})

const ModelOfForm=mongoose.model('jsTigerFForm',formSchema)

module.exports={ModelOfForm}