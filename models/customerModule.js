const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    text: String,
    isComplete: Boolean,

})

const Todo = mongoose.model('Todo', toDoSchema);

module.exports = Todo;

const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name:String,
    age: Number,
}) 

const customers = mongoose.model('customers', customerSchema);
module.exports = customers;

