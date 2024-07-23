//MODULE IMPORTING
const express = require("express");
const morgan = require("morgan");
const prompt = require('prompt-sync')();
const dotenv = require("dotenv");
dotenv.config(); // Loads the environment variables from .env file
// const mongoose = require('mongoose'); -- THIS WAS MOVED TO DB FOLDER


//DATABASE 
require('./config/database');

const Customer = require("./models/customerModule.js");
const app = express();

//MIDDLEWARE
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//ROUTES
//test

//landing page - just to check if server is working
app.listen(3000, () => {
    // console.log("Listening on port 3000");
});

const start = () => {
 displayOptions();
};

//display all options
const displayOptions = () => {
    console.log('/////////////////////////')
    console.log("Welcome to the CRM");
    console.log("What would you like to do?");
    console.log("1. Create a customer");
    console.log("2. View all customers");
    console.log("3. Update a customer");
    console.log("4. Delete a customer");
    console.log("5. quit");

    const optionChosen = prompt("Number of action to run:");
    if (optionChosen === "1"){
        createCustomer();
    }
    else if (optionChosen === "2"){
        allCustomers();
    }
    else if (optionChosen === "3"){
       updateCustomer();
    }
    else if (optionChosen === "4"){
        deleteCustomer();
    }
    else if (optionChosen === "5"){
        quitApp();
    }
}
//1- create a customer
const createCustomer = async () => {
    const newCustomer = {
        name: prompt("What is the customer's name?"),
        age: prompt("What is the customer's age?"),
    };
    const newCustomerAdd = await Customer.create(newCustomer);
    console.log(`These are the details of the new customer added: ${newCustomerAdd}`);
    start();
}

//2-show all customers
const allCustomers = async () => {
    const customerList = await Customer.find();
    console.log(`These are all the customers: ${customerList}`);
    start();
};

//3- update a cutsomer
const updateCustomer = async () => {

    //first display all customers so that user can pick which one he'd like to edit
    const customerList = await Customer.find();
    console.log(`These are all the customers: ${customerList}`);

    //user enters ID of customer they wish to edit
    const updateID = prompt('Please add the ID of the customer you wish to edit:');
    const updatedCustomerID = await Customer.findById(updateID);

    //display the "old" data of customer
    console.log(`These are the customers old details: ${updatedCustomerID}`);

    //prompt to update data and actually update the customer's info
    const updateCustomer = await Customer.findByIdAndUpdate(updatedCustomerID, {name: prompt("What is the customer's updated name?"), age: prompt("What is the customer's updated age?"),});

    console.log(`This is the customer's updated info: ${updateCustomer}`);
    start();
}

//4- delete a customer
const deleteCustomer = async () => {
    //first display all customers so that user can pick which one he'd like to delete
    const customerList = await Customer.find();
    console.log(`These are all the customers: ${customerList}`);

    //user enters ID of customer they wish to delete
    const deleteID = prompt('Please add the ID of the customer you wish to delete:');
    const deletedCustomerID = await Customer.findByIdAndDelete(deleteID);

    console.log(`This customer was deleted: ${deletedCustomerID}`);
    start();
}

//5- quit
const quitApp = async () => {
    await mongoose.disconnect();
    console.log('quitting the app..');
    process.exit();
}

start();