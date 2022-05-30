import axios from 'axios'
import React, { Fragment, useEffect, useState } from "react"
import Alert from './UI-Components/Alert';
import Input from './Form-Components/Input';
import TextArea from './Form-Components/TextArea';
import Select from './Form-Components/Select';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EditMovie = (props) => {
  const [movie, setMovie] = useState(
    {
      movie: { id: 0, title: "", release_date: "", runtime: "", mpaa_rating: "", rating: "", description: "" },
      mpaaOptions: [
        { id: "G", value: "G" },
        { id: "PG", value: "PG" },
        { id: "PG13", value: "PG13" },
        { id: "R", value: "R" },
        { id: "NC17", value: "NC17" },
      ],
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
    if (props.jwt === "") {
      props.history.push({
        pathname: "/login"
      })
      return
    }
    if (id > 0) {
      async function fetchData() {
        await axios.get("http://localhost:8000/v1/movie/" + id)
          .then((res) => {
            if (res.status !== 200) {
              let err = Error
              err.Message = "Invalid response code:" + res.status
              setMovie({ error: err })
            }
            console.log(res.data)
            setMovie({
              movie: res.data,
              mpaaOptions: [
                { id: "G", value: "G" },
                { id: "PG", value: "PG" },
                { id: "PG13", value: "PG13" },
                { id: "R", value: "R" },
                { id: "NC17", value: "NC17" },
              ],
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
    setMovie({
      movie: { ...movie.movie, [name]: value },
      mpaaOptions: movie.mpaaOptions,
      isLoaded: movie.isLoaded,
      error: movie.error,
      alert: { ...movie.alert }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (props.jwt === "") {
      props.history.push({
        pathname: "/login"
      })
      return
    }
    const data = new FormData(e.target)
    const payload = Object.fromEntries(data)
    const myHeader = new Headers()
    myHeader.append("Content-Type", "application/json")
    myHeader.append("Authorization", "Bearer " + props.jwt)

    axios.put("http://localhost:8000/v1/movie/" + id, {
      headers: myHeader,
      body: payload,
    })
      .then((res) => {
        console.log(res)
        if (res.error) {
          setMovie({
            movie: movie.movie,
            mpaaOptions: movie.mpaaOptions,
            isLoaded: movie.isLoaded,
            alert: { type: "alert-danger", message: data.error.message }
          })
        }
      })
      .catch((res) => {
        console.log(res)
        setMovie({
          movie: {},
          mpaaOptions: movie.mpaaOptions,
          isLoaded: movie.isLoaded,
          alert: { type: "alert-success", message: "Success Saved" }
        })
      })
  }
  const confirmDelete = () => {
    if (props.jwt === "") {
      props.history.push({
        pathname: "/login"
      })
      return
    }
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

          <Input
            title={"Title"}
            type={"text"}
            name={"title"}
            defaultValue={movie.movie.title}
            handleChange={handleChange}
          />

          <Input
            title={"Release Date"}
            type={"text"}
            name={"release_date"}
            defaultValue={movie.movie.release_date}
            handleChange={handleChange}
          />

          <Input
            title={"Runtime"}
            type={"text"}
            name={"runtime"}
            defaultValue={movie.movie.runtime}
            handleChange={handleChange}
          />

          <Select
            title={"MPAA Rating"}
            name={"mpaa_rating"}
            options={movie.mpaaOptions}
            defaultValue={movie.movie.mpaa_rating}
            handleChange={handleChange}
            placeholder={'Chose...'}
          />

          <Input
            title={"Rating"}
            type={"text"}
            name={"rating"}
            defaultValue={movie.movie.rating}
            handleChange={handleChange}
          />

          <TextArea
            title={"Description"}
            name={"description"}
            defaultValue={movie.movie.description}
            handleChange={handleChange}
            rows={3}
          />

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