import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {useState} from 'react'
import editIcon from '../../assets/edit.png'
import deleteIcon from '../../assets/cross.png'
import "./todoItem.scss"

export const TodoItem = (props) => {
    const {todo} = props

    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    function handleEdit(id) {
        console.log("edit handle", id)
    }
    function handleDelete(id) {
        console.log("handle delete", id)
    }

    return (
        <div ref={setNodeRef} style={style}>
            <div className="todo-item-container">
                <div className="todo-item" {...attributes} {...listeners}>
                    <p>{title}</p>    
                    <p>{description}</p>    
                </div>        
                <div className="todo-options">
                    <div className="edit-btn" onClick={() => handleEdit(todo.id)}>
                        <img src={editIcon} alt="edit" />  
                    </div>
                    <div className="delete-btn" onClick={() => handleDelete(todo.id)}>
                        <img src={deleteIcon} alt="delete" />
                    </div>

                </div>        
            </div>
        </div>
    );
}