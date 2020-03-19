import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from "react-router-dom";

const MovieForm = (props) => {
  const { id } = useParams();
  const [item, setItem] = useState({ id });
  const history = useHistory()

  console.log("props.match.params.id", props.match.params.id);

  useEffect(() => {
    if(props.movies == null) {
      return 
    }

    const itemToUpdate = props.movies.find( movie => `${movie.id}` === id);

    if (itemToUpdate) {
      setItem(itemToUpdate);
    }
  }, [props.movies, id]);


    const changeHandler = ev => {
      setItem({
        ...item,
        [ev.target.name]: ev.target.value
      });
    };
     
    const handleSubmit = (e) => {
      e.preventDefault()

      console.log("Testing handlesubmit",{
        id: id,
        title: item.title,
        director: item.director,
        metascore: item.metascore,
        stars: [item.stars]
      })
      axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        id: id,
        title: item.title,
        director: item.director,
        metascore: item.metascore,
        stars: [item.stars]
      })
      .then(putRes => {
        console.log("putRes", putRes)
        axios
        .get("http://localhost:5000/api/movies")
        .then(getRes => {
         console.log("getRes", getRes)
         props.setMovieList([...getRes.data.filter(item => item.id !== props.movie.id), putRes.data]);
         history.push(`/movies/${id}`)}
        )
        .catch(err => console.log(err.response));

        // console.log(res);
       //  history.push("/");

   

      })
      .catch(err => {
        console.log(err);
      });
  };


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
            placeholder="metascore"
            onChange={changeHandler} />

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
