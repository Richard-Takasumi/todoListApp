import {BrowserRouter} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import { TodoListPage } from './pages/todo-list/TodoListPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
