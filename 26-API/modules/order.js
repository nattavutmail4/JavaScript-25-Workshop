const mongoose = require('mongoose');

const orderSCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity:{ type: Number , default: 1}
});
//model(ชื่อtable กับ columในด้าต้า)
module.exports = mongoose.model('Order',orderSCHEMA);