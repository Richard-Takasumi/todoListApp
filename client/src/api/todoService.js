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
    }
}

export async function saveTodo(newTodo) {
    try {
      const response = await axios.post('/save', newTodo);
      console.log('Todo saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  }

export async function deleteTodo(category, id) {

}


