const mongoose = require('mongoose');

const productSCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number
});
//model(ชื่อtable กับ columในด้าต้า)
module.exports = mongoose.model('Product',productSCHEMA);