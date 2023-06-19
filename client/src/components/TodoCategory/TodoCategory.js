import React, { useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { TodoItem } from "../TodoItem/TodoItem";
import "./todoCategory.scss"

const id_to_name = {
  "todo": "To do:",
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
  const { id, todos, setTodos } = props;
  const { setNodeRef } = useDroppable({
    id
  });

  useEffect(() => {
    console.log(`Todos in ${id}:`, todos);
  }, []);

  return (
    <SortableContext
      id={id}
      items={todos}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
          <h1 className='category-title' >{id_to_name[id]}</h1>
          {todos.map((todo) => <TodoItem todo={todo} key={todo.key} setTodos={setTodos}/>)}
      </div>
    </SortableContext>
  );
}
