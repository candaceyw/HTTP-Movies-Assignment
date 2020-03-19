import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory()

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {
   
    const id = (match.params.id)
    console.log(id)

    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res);
        // setMovie(res.data);

        console.log("going to push to new url");
        history.push("/item-list");
        console.log("past push to new url");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <a class="save-button waves-effect waves-light btn  blue lighten-2" onClick={saveMovie}>Save</a>
      <a class="edit-button waves-effect waves-light btn amber lighten-1" onClick= {() => history.push(`/update-movie/${match.params.id}`)}>Edit</a>
      <a class="delete-button waves-effect waves-light btn red lighten-2" onClick={deleteMovie}>Delete</a>
  
    </div>
  );
}

export default Movie;
