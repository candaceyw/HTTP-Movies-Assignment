import React from 'react'

const MovieForm = () => {
    return (
        <form>
            <input
            type="text"
            name="title"
            placeholder="title" />

            <input
            type="text"
            name="director"
            placeholder="director" />

            <input
            type="text"
            name="metascore"
            placeholder="metascore" />

            <input
            type="text"
            name="stars"
            placeholder="stars" />
            <button> Add Star </button>
        </form>
    )
}

export default MovieForm
