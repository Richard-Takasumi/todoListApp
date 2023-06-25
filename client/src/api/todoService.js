import axios from 'axios';

export async function fetchTodos() {
    try {
      const res = await fetch('http://localhost:4000/') 
      console.log('fetching: ', res)
      if (res.ok) {
        const fetchedTodos = await res.json()
        console.log('fetching async: ', fetchedTodos)
        return fetchedTodos
      }
    } catch (error) {
      console.log(error)
      return error;
    }
}

export async function saveTodo(newTodo) {
    try {
      const response = await axios.post('/save-todo', newTodo);
      console.log('Todo saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
}
export async function updateTodo(todoId, category, newTitle, newDescription) {
    try {
      const response = await axios.post('/update-todo', {
        todoId: todoId,
        category: category,
        newTitle: newTitle,
        newDescription: newDescription
      });
      console.log('Todo updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
}

export async function saveCategory(startCategory, endCategory, startCategoryTodos, endCategoryTodos) {
    try {
      const response = await axios.post('/save-category', {
        startCategory: startCategory,
        startCategoryTodos: startCategoryTodos, 
        endCategory: endCategory,
        endCategoryTodos: endCategoryTodos
      });
      console.log("todos arranged successfully in todoService.js", response.data)
    } catch (error) {
      console.error('Error rearranging todos', error)
    }
}

export async function deleteTodo(todoId, category) {
  try {
    const response = await axios.post('/delete-todo', 
    {
      todoId: todoId,
      category: category
    });
    console.log('Todo deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}
