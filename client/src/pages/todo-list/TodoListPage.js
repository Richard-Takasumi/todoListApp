import {React, useEffect, useState} from 'react'
import { TodoInputBar } from '../../components/TodoInputBar/TodoInputBar'
import { TodoCategory } from '../../components/TodoCategory/TodoCategory'
import { TodoSearchBar } from '../../components/TodoSearchBar/TodoSearchBar'
import { fetchTodos } from '../../api/todoService'
import "./todoListPage.scss"

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { TodoItem } from '../../components/TodoItem/TodoItem';

export const TodoListPage = () => {

    //------------ Todo List ------------
    // const [todos, setTodos] = useState({
    //   "todo": [],
    //   "inProgress": [],
    //   "archived": []
    // })
    const [todos, setTodos] = useState({
      "todo": [{title: "Loading...", description: "", key:"1", id: "1"}],
      "inProgress": [{title: "Loading...", description: "", key:"2", id: "2"}],
      "archived": [{title: "Loading...", description: "", key:"3", id: "3"}]
    })

    //------------ Filter by search ------------
    const [searchTerm, setSearchTerm] = useState("") 

    useEffect(() => {
      const onInit = async () => {
        const fetchedTodos = await fetchTodos()
        setTodos(fetchedTodos)
      }
      onInit()

    }, [])


    // For detecting native device input
    const sensors = useSensors( 
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
      })
    );

    const [activeTodo, setActiveTodo] = useState(null); // the object of the draggable item that is currently being dragged
    

    return (
        <DndContext 
          collisionDetection={closestCorners}  // how to detect collisions between draggable and droppable elements
          sensors={sensors}                   // what sensors to use to detect native device input
          onDragStart={handleDragStart}       // what to do when a draggable item is picked up
          onDragOver={handleDragOver}         // what to do when a draggable item is moved over a droppable area
          onDragEnd={handleDragEnd}           // what to do when a draggable item is dropped
        >
          <div >
            <h1 > Todo List</h1> 
              <TodoSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
              <div className="add-todo-bar">
                <TodoInputBar setTodos={setTodos}/> 
              </div>
              <div className='todo-categories'>
                <TodoCategory id={"todo"} todos={todos["todo"]} setTodos={setTodos} searchTerm={searchTerm}/>
                <TodoCategory id={"inProgress"} todos={todos["inProgress"]} setTodos={setTodos} searchTerm={searchTerm}/>
                <TodoCategory id={"archived"} todos={todos["archived"]}  setTodos={setTodos} searchTerm={searchTerm}/>
                <DragOverlay>{activeTodo ? <TodoItem todo={activeTodo} key={activeTodo.key} setTodos={setTodos} searchTerm={searchTerm}/> : null}</DragOverlay>
              </div>
          </div>
        </DndContext>
    )
    // ---------------- Start of Drag and Drop Functions ----------------
    // ------------------------ REPURPOSED CODE FROM --------------------------- 
    // https://codesandbox.io/s/dnd-kit-multi-containers-forked-wxmnx9?file=/src/container.js:0-724
    function findContainer(id) {
      // if dragging in the same category, return the same category
      if (id in todos) {
        return id;
      }
      // otherwise, if moving to a different category, return that category
      return Object.keys(todos).find((key) => todos[key].find((todo) => todo.id === id));
    }

    function handleDragStart(event) {
      const { active } = event; // grab the active draggable item
      const { id } = active;    // grab the id of the active draggable item
      const category = findContainer(id); // find the category of the draggable item
      const activeTodo = todos[category].find((todo) => todo.id === id); // find the draggable item in the category
      setActiveTodo(activeTodo);
    }

    // this function handles the case where the user drags a todo to another category e.g from todo to inProgress
    function handleDragOver(event) {
      console.log('handledragover')
      const { active, over } = event;
      const { rect } = over; // rect is the bounding box of the droppable area
      const { id } = active;
      const { id: overId } = over;
  
      // Find the containers
      const activeContainer = findContainer(id);    // the container of the original todo
      const overContainer = findContainer(overId);  // the container of the todo that is being dragged over

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      ) {
        return;
      }

      // This is called when the draggable item is moved over a droppable area
      setTodos((prev) => {
        const overItems = prev[overContainer];
        
        // Find the indexes for the items
        const activeTodo = todos[activeContainer].find((todo) => todo.id === id);
        const overTodo = todos[overContainer].find((todo) => todo.id === overId);
    
        const activeIndex = todos[activeContainer].indexOf(activeTodo)
        const overIndex = todos[overContainer].indexOf(overTodo)
        let newIndex;
        if (overId in prev) {
          // We're at the root droppable of a container
          newIndex = overItems.length + 1;
        } else {
          // Math to determine the new index of the item after dropping
          const isBelowLastItem =
            over &&
            overIndex === overItems.length - 1 &&
            rect.offsetTop > over.rect.offsetTop + over.rect.height; 
          const modifier = isBelowLastItem ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        return {
          // keep the other containers the same
          ...prev,
          // remove the item from the original container
          [activeContainer]: [
            ...prev[activeContainer].filter((todo) => todo.id !== active.id)
          ],
          // add the item to the new container
          [overContainer]: [ 
            ...prev[overContainer].slice(0, newIndex),  
            todos[activeContainer][activeIndex],
            ...prev[overContainer].slice(newIndex, prev[overContainer].length)
          ]
        };
      });
    }


    // this function handles the case where the user re-orders todos in the same category/container
    function handleDragEnd(event) {
      console.log('handledragend')
      const { active, over } = event;
      if(!over) {
        return
      }
       
      const { id } = active;
      const { id: overId } = over;
  
      const activeContainer = findContainer(id);
      const overContainer = findContainer(overId);
  
      // if not the same category, return.
      if (
        !activeContainer ||
        !overContainer ||
        activeContainer !== overContainer
      ) {
        return;
      }
      const activeTodo = todos[activeContainer].find((todo) => todo.id === id);
      const overTodo = todos[overContainer].find((todo) => todo.id === overId);

      const activeIndex = todos[activeContainer].indexOf(activeTodo)
      const overIndex = todos[overContainer].indexOf(overTodo)

      if (activeIndex !== overIndex) {
        setTodos((todos) => ({
          ...todos,
          [overContainer]: arrayMove(todos[overContainer], activeIndex, overIndex)
        }));
      }
  
      setActiveTodo(null);
    }
    // ---------------- End of Drag and Drop Functions ----------------
  
}