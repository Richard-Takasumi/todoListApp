import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { TodoItem } from "../TodoItem/TodoItem";
import "./todoCategory.scss"

const id_to_name = {
  "todo": "To do",
  "inProgress": "In progress",
  "archived": "Archived"
}

const containerStyle = {
  // background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
};

export function TodoCategory(props) {
  const { id, todos, setTodos, searchTerm, deleteTodo } = props;
  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <SortableContext
      id={id}
      items={todos}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
          <h1 className='category-title' >{id_to_name[id]}</h1>
          {todos.filter((todo) => 
              todo.title.toLowerCase().includes(searchTerm.toLowerCase())
           || todo.description.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((todo) => 
              <TodoItem deleteTodo={deleteTodo} todo={todo} key={todo.key} setTodos={setTodos} searchTerm={searchTerm}/>)}
      </div>
    </SortableContext>
  );
}
