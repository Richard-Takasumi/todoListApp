import { nanoid } from "nanoid";
import {React, useState} from 'react'
import "./todoInputBar.scss"

export const TodoInputBar = ({setTodos}) => {
        const [title, setTitle] = useState("")
        const [description, setDescription] = useState("")
    
        const handleSubmit = (e) => {
            e.preventDefault()
            const id = nanoid()
            setTodos((prevTodos) => {
                return {
                    "todo": [...prevTodos["todo"], {title: title, description: description, id: id, key: id}],
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