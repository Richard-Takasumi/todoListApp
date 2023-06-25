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
    console.log("todo: ", todo)
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
            res.status(200).json({ message: "New todo added successfully." });
        })
        .catch((err) => {
            console.error(err);
        });
}
module.exports.deleteToDo = async (req, res) => {
    const {todoId, category} = req.body
    console.log("todo to delete ID: ", todoId)
    ToDoModel.findOne({})
        .then((todoDoc) => {
            // delete the todo in the category
            todoDoc[category].pull( { id: todoId } )
            // save the document
            return todoDoc.save();
        })
        .then(() => {
            res.status(200).json({ message: `Todo with ID, ${todoId}, "deleted successfully.` });
        })
        .catch((err) => {
            console.error(err);
        });
}

module.exports.updateToDo = async (req, res) => {
    const {todoId, category, newTitle, newDescription} = req.body
    console.log("todo to update ID: ", todoId)
    ToDoModel.findOneAndUpdate(
        { [category]: { $elemMatch: { id: todoId } } },
        { $set: { [`${category}.$[elem].title`]: newTitle, [`${category}.$[elem].description`]: newDescription } },
        { arrayFilters: [{ 'elem.id': todoId }], new: true }
      )
        .then(() => {
            res.status(200).json({ message: `Todo with ID, ${todoId}, "updated successfully.` });
        })
        .catch((err) => {
            console.error(err);
        });
}



module.exports.saveCategory = async (req, res, id) => {
    console.log(req.body)
    const { startCategory, startCategoryTodos, endCategory, endCategoryTodos } = req.body
    ToDoModel.findOne({})
    .then((todoDoc) => {
        
        // update where the todo started if it has ended in a different category
        if (startCategory != endCategory) {
            todoDoc[startCategory] = startCategoryTodos
        }
        todoDoc[endCategory] = endCategoryTodos
        // save the document
        return todoDoc.save();
    })
    .then(() => {
        res.status(200).json({ message: "Rearranged todos successfully." });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error rearranging todos inside category." });
    });
    
}