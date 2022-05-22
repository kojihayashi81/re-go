import axios from 'axios'
import React, { Fragment, useState } from "react"
import Alert from './UI-Components/Alert';

const CreateMovie = () => {
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

  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setMovie({ movie: { ...movie.movie, [name]: value }, isLoaded: movie.isLoaded })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const payload = Object.fromEntries(data)
    axios.post("http://localhost:8000/v1/movies", payload)
      .then((res) => {
        console.log(res)
        if (res.error) {
          setMovie({
            movie: movie.movie,
            isLoaded: movie.isLoaded,
            alert: { type: "alert-danger", message: data.error.message }
          })
        } else {
          setMovie({
            movie: movie.movie,
            isLoaded: movie.isLoaded,
            alert: { type: "alert-success", message: "Success Saved" }
          })
        }
      })
  }

  return (
    <Fragment>
      <h2>Add Movies</h2>

      <Alert
        alertType={movie.alert.type}
        alertMessage={movie.alert.message}
      />

      <hr />

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movie.movie.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="release_date" className="form-label">
            Release Date
          </label>
          <input
            type="text"
            className="form-control"
            id="release_date"
            name="release_date"
            value={movie.movie.release_date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="runtime" className="form-label">
            Runtime
          </label>
          <input
            type="text"
            className="form-control"
            id="runtime"
            name="runtime"
            value={movie.movie.runtime}
            onChange={handleChange}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="mpaa_rating" className="form-label">
            MPAA Rating
          </label>
          <select name="mpaa_rating" className="form-control" value={movie.movie.mpaa_rating} onChange={handleChange}>
            <option className="form-control">Choose...</option>
            <option className="form-control" value="G">G</option>
            <option className="form-control" value="PG">PG</option>
            <option className="form-control" value="PG13">PG13</option>
            <option className="form-control" value="R">R</option>
            <option className="form-control" value="NC17">NC17</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <input
            type="text"
            className="form-control"
            id="rating"
            name="rating"
            value={movie.movie.rating}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea className="form-control" name="description" id="description" rows="3" onChange={handleChange}>
            {movie.movie.description}
          </textarea>
        </div>

        <hr />

        <button className="btn btn-primary">SAVE</button>

      </form>
    </Fragment>
  )
}

export default CreateMovie