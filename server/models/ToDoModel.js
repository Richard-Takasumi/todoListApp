// Stores the schema for our ToDo items

const mongoose = require('mongoose');



// store order, 
// when fetching,
// return by sorted order// poggies


ToDoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    id: String,
    key: String
});


const ToDoCategorySchema = new mongoose.Schema({
    todo: [ToDoSchema],    
    inProgress: [ToDoSchema],    
    archived: [ToDoSchema]    
});

module.exports = mongoose.model('ToDo', ToDoCategorySchema);
