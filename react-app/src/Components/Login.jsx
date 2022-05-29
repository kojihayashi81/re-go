import axios from 'axios'
import { Fragment, useState } from "react"
import Alert from './UI-Components/Alert'
import Input from './Form-Components/Input'

const Login = ({ props, handleJWTChange }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    error: null,
    errors: [],
    alert: {
      type: "d-none",
      message: "",
    }
  });

  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    setLogin({
      ...login,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errors = []

    if (login.email === "") {
      errors.push("email")
    }

    if (login.password === "") {
      errors.push("password")
    }

    setLogin({ ...login, errors: errors })

    if (errors.length > 0) {
      return false
    }

    const data = new FormData(e.target)
    const payload = Object.fromEntries(data)
    axios.post("http://localhost:8000/v1/signin", payload)
      .then((res) => {
        setLogin({
          ...login,
          alert: { type: "alert-success", message: "Success Login" }
        })
        console.log(res.data)
        handleJWTChange(res.data)
      })
      .catch((err) => {
        setLogin({
          ...login,
          alert: { type: "alert-danger", message: err.response.data.error }
        })
      })
  }

  const hasError = (key) => {
    return login.errors.indexOf(key) !== -1
  }

  return (
    <Fragment>
      <h2>Login</h2>
      <hr />

      <Alert
        alertType={login.alert.type}
        alertMessage={login.alert.message}
      />

      <form className="pt-3" onSubmit={handleSubmit}>

        <Input
          title={"Email"}
          type="text"
          id="email"
          name="email"
          defaultValue={login.email}
          onChange={handleChange}
          className={hasError("email") ? "is-invalid" : ""}
          errorDiv={hasError("email") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a valid email address"}
        />

        <Input
          title={"Password"}
          type="password"
          id="password"
          name="password"
          defaultValue={login.password}
          onChange={handleChange}
          className={hasError("password") ? "is-invalid" : ""}
          errorDiv={hasError("password") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a password"}
        />

        <hr />

        <button className="btn btn-primary">Login</button>
      </form>

    </Fragment>
  )
}
export default Login