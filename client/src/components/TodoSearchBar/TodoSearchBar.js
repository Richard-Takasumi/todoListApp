
import React from 'react'
import './todoSearchBar.scss'

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
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyPress} />
            </form>
        </div>
    )
}



