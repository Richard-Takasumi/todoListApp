const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
    const todos = await ToDoModel.findOne({}, { _id: false, __v: false });
    res.send(todos);
}


//reference the schema from the model in ToDoModel.js
// create a saveToDo function that takes in the request and response
// use the request to get the title and description from the body
// create a new todo object with the title and description
// push the todo object into the todo array
// save the todo array
// send the todo array back to the client

module.exports.saveToDo = async (req, res) => {

    const {title, description, key, id} = req.body
    const todo = {title: title, description: description, key: key, id: id}
    ToDoModel.findOne({})
        .then((todoDoc) => {
            if (!todoDoc) {
                // if the ToDo document doesn't exist, create a new one with an empty todo array
                todoDoc = new ToDoModel({
                    todo: [],
                    inProgress: [],
                    archived: []
                }, { id: false });
            }
            // push the new todo to the 'todo' array
            todoDoc.todo.push(todo);
            // save the document
            return todoDoc.save();
        })
        .then(() => {
            console.log('New todo added successfully');
        })
        .catch((err) => {
            console.error(err);
        });
}



// module.exports.saveToDo()