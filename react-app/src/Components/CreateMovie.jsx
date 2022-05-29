import axios from 'axios'
import React, { Fragment, useState } from "react"
import Alert from './UI-Components/Alert';
import Input from './Form-Components/Input';
import TextArea from './Form-Components/TextArea';
import Select from './Form-Components/Select';

const CreateMovie = () => {
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

  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setMovie(
      {
        movie: { ...movie.movie, [name]: value },
        mpaaOptions: movie.mpaaOptions,
        isLoaded: movie.isLoaded,
        error: movie.error,
        alert: { ...movie.alert }
      })
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

      </form>
    </Fragment>
  )
}

export default CreateMovie