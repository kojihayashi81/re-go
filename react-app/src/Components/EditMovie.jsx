import axios from 'axios'
import React, { Fragment, useEffect, useState } from "react"
import Alert from './UI-Components/Alert';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const EditMovie = (props) => {
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
        await axios.get("http://localhost:8000/v1/movie/" + id)
          .then((res) => {
            if (res.status !== 200) {
              let err = Error
              err.Message = "Invalid response code:" + res.status
              setMovie({ error: err })
            }
            setMovie({
              movie: res.data,
              isLoaded: true,
              error: "",
              alert: {
                type: "d-none",
                message: ""
              }
            })
          })
          .catch((res) => {
            setMovie({ error: { message: res.message } })
          })
      }
      fetchData()
    } else if (typeof id !== 'number') {
      setMovie({ isLoaded: true, error: { message: "Invalid param" } })
    } else {
      setMovie({ isLoaded: true })
    }
  }, [])

  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setMovie({ movie: { ...movie.movie, [name]: value }, isLoaded: movie.isLoaded, error: movie.error, alert: { ...movie.alert } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const payload = Object.fromEntries(data)
    axios.put("http://localhost:8000/v1/movie/" + id, payload)
      .then((res) => {
        console.log(res)
        if (res.error) {
          setMovie({
            movie: movie.movie,
            isLoaded: movie.isLoaded,
            alert: { type: "alert-danger", message: data.error.message }
          })
        }
      })
      .catch((res) => {
        console.log(res)
        setMovie({
          movie: {},
          isLoaded: movie.isLoaded,
          alert: { type: "alert-success", message: "Success Saved" }
        })
      })
  }
  const confirmDelete = (e) => {
    console.log("delete?")
    confirmAlert({
      title: 'Confirm to delete?',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete("http://localhost:8000/v1/movie/" + id)
              .then((res) => {
                console.log(res)
                if (res.error) {
                  setMovie({
                    movie: movie.movie,
                    isLoaded: movie.isLoaded,
                    alert: { type: "alert-danger", message: res.error.message }
                  })
                } else {
                  props.history.push({
                    pathname: "/admin"
                  })
                }
              })
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    })
  }


  if (movie.error) {
    return (<div>Error: {movie.error.message}</div>)
  } else if (!movie.isLoaded) {
    return (<div>Loading...</div>)
  } else {
    return (
      <Fragment>
        <h2>Edit Movies</h2>
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
          <Link to="/admin" className="btn btn-secondary ms-1">
            Cancel
          </Link>
          {movie.movie.id > 0 && (
            <a href='#!' className="btn btn-danger ms-1" onClick={() => confirmDelete()}>
              Delete
            </a>
          )}
        </form>
      </Fragment>
    )
  }
}
export default EditMovie