const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name:String,
    age: Number,
}) 

const customers = mongoose.model('customers', customerSchema);
module.exports = customers;

