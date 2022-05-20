import React, { Fragment, useEffect, useState } from "react"

const EditMovie = () => {
  const [movie, setMovie] = useState(
    { id: 1, title: "The Shawshank Redmption", runtime: 142 },
  );
  useEffect(() => {
    console.log(movie)
  }, [movie])

  return (
    <Fragment>
      <h2>Add/Edit Movies</h2>

      <hr />

      <form method="POST">

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movie.title}
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
            value={movie.release_date}
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
            value={movie.runtime}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="mpaa_Rating" className="form-label">
            MPAA Rating
          </label>
          <select className="form-control" value={movie.mpaa_rating}>
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
            value={movie.rating}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea className="form-control" name="description" id="description" rows="3">
            {movie.description}
          </textarea>
        </div>

        <hr />

        <button className="btn btn-primary">SAVE</button>

      </form>
      <div className="mt-3">
        <pre>{JSON.stringify(movie)}</pre>
      </div>
    </Fragment>

  )
}
export default EditMovie