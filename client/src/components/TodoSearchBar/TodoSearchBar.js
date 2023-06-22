
// create a search bar component 
// react

import React from 'react'
import {useState} from 'react'



export const TodoSearchBar = (props) => {
    const {searchTerm, setSearchTerm} = props

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(searchTerm)
    }
    function handleKeyPress(e) {
        if (e.key === "Enter") {
          handleSubmit(e);  
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyPress} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}



