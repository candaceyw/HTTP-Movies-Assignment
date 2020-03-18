import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MovieForm = (props) => {
    const [movie, setMovie] = useState({});



      const changeHandler = e => {
        e.persist();
        setMovie({...movie, [e.target.name]: e.target.value})  
      }


    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
        .then(res => {
          console.log(res);
          props.updateMovies(props.match.params.id, res.data)
          setMovie()
          props.history.push('/');
        })
        .catch(err => console.log(err));
      }


    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="title"
            placeholder="title" 
            onChange={changeHandler}/>

            <input
            type="text"
            name="director"
            placeholder="director" 
            onChange={changeHandler}/>

            <input
            type="text"
            name="metascore"
            placeholder="metascore" />

            <input
            type="text"
            name="stars"
            placeholder="stars" 
            onChange={changeHandler}/>
            <button> Add Star </button>
        </form>
    )
}

export default MovieForm
