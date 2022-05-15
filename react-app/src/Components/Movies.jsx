import React, { Component, Fragment, useEffect, useState } from "react"
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([
      {id: 1, title:"The Shawshank Redmption", runtime: 142},
      {id: 2, title:"The Godfather", runtime: 175},
      {id: 3, title:"The Dark Knight", runtime: 153},
    ]);
  useEffect(() => {
    console.log(movies)
  }, [])

  return (
    <Fragment>
      <h2>Select Movies</h2>

      <ul>
        {movies.map( (m) => (
          <li key={m.id}>
            <Link to={`/movies/${m.id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}
export default Movies