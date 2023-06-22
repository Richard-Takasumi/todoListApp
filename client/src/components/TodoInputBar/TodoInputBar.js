import { nanoid } from "nanoid";
import {React, useState} from 'react'
import "./todoInputBar.scss"
import { saveTodo } from "../../api/todoService";

export const TodoInputBar = ({setTodos}) => {
        const [title, setTitle] = useState("")
        const [description, setDescription] = useState("")
    
        const handleSubmit = (e) => {
            e.preventDefault()
            if (title === "") return
            const id = nanoid()
            const newTodo = {title: title, description: description, id: id, key: id}

            saveTodo(newTodo)

            setTodos((prevTodos) => {
                return {
                    "todo": [...prevTodos["todo"], newTodo],
                    "inProgress": prevTodos["inProgress"],
                    "archived": prevTodos["archived"]
                }
            })
            setTitle("")
            setDescription("")
        }
    
        return (
            <div className="bar-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }