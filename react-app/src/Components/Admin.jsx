import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admin = (props) => {
  const [movies, setMovies] = useState([
    {
      movies: [],
      isLoaded: false,
      error: ""
    }
  ]);

  useEffect(() => {
    if (props.jwt === "") {
      props.history.push({
        pathname: "/login"
      })
      return
    }
    async function fetchData() {
      const movies = await axios.get("http://localhost:8000/v1/movies")
        .then((res) => {
          if (res.status !== 200) {
            let err = Error
            err.Message = "Invalid response code:" + res.status
            setMovies({ error: err })
          }
          return res.data
        })
      setMovies({ movies: movies, isLoaded: true })
    }
    fetchData()
  }, [])


  if (movies.error) {
    return (<div>Error: {movies.error.message}</div>)
  } else if (!movies.isLoaded) {
    return (<div>Loading...</div>)
  } else {
    return (
      <Fragment>
        <h2>Select Movies</h2>

        <ul>
          {movies.movies.map((m) => (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={`/admin/movie/${m.id}`}
            >
              {m.title}
            </Link>
          ))}
        </ul>
      </Fragment>
    )
  }
}
export default Admin
