const mongoose = require('mongoose');

const userSCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:  { type: String,
              required: true ,
              unique:true,
              match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true},
});
//model(ชื่อtable กับ columในด้าต้า)
module.exports = mongoose.model('User',userSCHEMA);