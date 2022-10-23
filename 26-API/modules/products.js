const mongoose = require('mongoose');

const productSCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price:{ type: Number, required: true},
    productImage:{ type: String, required: true}
});
//model(ชื่อtable กับ columในด้าต้า)
module.exports = mongoose.model('Product',productSCHEMA);