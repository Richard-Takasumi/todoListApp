import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {useState} from 'react'
import { deleteTodo, updateTodo } from '../../api/todoService';
import editIcon from '../../assets/edit.png'
import deleteIcon from '../../assets/cross.png'
import "./todoItem.scss"

export const TodoItem = (props) => {
    const {todo, setTodos} = props
    const {searchTerm} = props
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)
    const [editing, setEditing] = useState(false)

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

    //create a function to handle editing when edit button is clicked 
    // and the id of the todo is passed in
    function handleEdit(id) {
        setEditing(true)
    }        

    const handleSubmit = (e) => {
        e.preventDefault()
        setTodos((prev) => {
            const category = Object.keys(prev).find((key) => prev[key].find((item) => item === todo)) 

            if (todo.title != title || todo.description != description) {
                updateTodo(todo.id, category, title, description) // update in database
            }
            return {
                ...prev,
                [category]: prev[category].map(item => {
                    if (item === todo) {
                        return {
                            ...item,
                            title: title,
                            description: description
                        }
                    }
                    return item
                })
            }
        })
        
        setEditing(false)
    }

    function handleDelete(id) {
        console.log("handle delete", id)
        setTodos(prev => {
            const category = Object.keys(prev).find((key) => prev[key].find((todo) => todo.id === id))
                // delete in our database
                deleteTodo(id, category)
            return {
                ...prev,
                [category]: prev[category].filter(todo => todo.id !== id)
            }
        })

    }

    // thank you github copilot
    function highlight(text, highlight) {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> { parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { background: "#FFC107" } : {} }>
                { part }
            </span>)
        } </span>;
    }

    
    return (
        <div ref={setNodeRef} style={style}>
            <div className="todo-item-container">
                {!editing && // draggable when not editing
                <div className="todo-item" {...attributes} {...listeners}>
                    {!editing && <p>{highlight(todo.title, searchTerm)}</p>}    
                    {!editing && <p>{highlight(todo.description, searchTerm)}</p>}    
                </div>
                }        
                {editing && // not draggable while editing
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                }
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