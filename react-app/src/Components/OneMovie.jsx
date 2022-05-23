import axios from "axios";
import React, { Fragment, useEffect, useState } from "react"

const OneMovie = (props) => {
  const [movie, setMovie] = useState(
    {
      movie: { id: 0, title: "", release_date: "", runtime: "", mpaa_rating: "", rating: "", description: "" },
      isLoaded: false,
      error: "",
      alert: {
        type: "d-none",
        message: ""
      }
    }
  );

  const id = props.match.params.id
  useEffect(() => {
    if (id > 0) {
      async function fetchData() {
        const movie = await axios.get("http://localhost:8000/v1/movie/" + id)
          .then((res) => {
            if (res.status !== 200) {
              let err = Error
              err.Message = "Invalid response code:" + res.status
              setMovie({ error: err })
            }
            return res.data
          })
          .catch((res) => { console.log(res) })
        setMovie({
          movie: movie, isLoaded: true, alert: {
            type: "d-none",
            message: ""
          }
        })
      }
      fetchData()
    } else if (typeof id !== 'number') {
      setMovie({ isLoaded: true, error: { message: "Invalid param" } })
    } else {
      setMovie({ isLoaded: true })
    }
  }, [])

  return (
    <Fragment>
      <h2>Movie: {movie.title}</h2>

      <hr />

      <table className="table table-compact table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>{movie.movie.title}</td>
          </tr>
          <tr>
            <td>Run Time:</td>
            <td>{movie.movie.runtime} min</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  )
}
export default OneMovie