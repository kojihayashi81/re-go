import React, { Component, Fragment, useEffect, useState } from "react"
import { Link } from 'react-router-dom';

const OneMovie = (props) => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    setMovie({
      id: props.match.params.id,
      title:"Some Movie",
      runtime: 150
    })
  }, [])

  return (
    <Fragment>
      <h2>Movie: {movie.title}</h2>

      <table className="table table-compact table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <td>Run Time:</td>
            <td>{movie.runtime} min</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  )
}
export default OneMovie