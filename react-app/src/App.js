import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Admin from './Components/Admin'
import Categories from './Components/Categories'
import Home from './Components/Home'
import Movies from './Components/Movies'
import OneMovie from './Components/OneMovie'
import EditMovie from './Components/EditMovie'
import CreateMovie from './Components/CreateMovie'
import Login from './Components/Login'

export default function App() {

  const [jwt, setJwt] = useState("");

  const handleJWTChange = (jwt) => { setJwt(jwt) }

  const logout = () => {
    setJwt("")
    window.localStorage.removeItem("jwt")
  }

  const loginLink = () => {
    if (jwt === "") {
      return (<Link to="/login">Login</Link>)
    } else {
      return (<Link to="/logout" onClick={logout}>Logout</Link>)
    }
  }

  useEffect(() => {
    let token = window.localStorage.getItem("jwt")
    if (token && jwt === "") { setJwt(token) }
  }, [jwt])

  return (
    <Router>
      <div className="container">

        <div className="row">
          <div className='col mt-3'>
            <h1 className="mt-3">Go Watch a Movie!</h1>
          </div>
          <div className='col mt-3 text-end'>
            {loginLink()}
          </div>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                {jwt !== "" && (
                  <Fragment>
                    <li className="list-group-item">
                      <Link to="/admin">Manage Catalogue</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/admin/movie/add">Add Movie</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/by-category">Category</Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route exact path="/login" render={(props) => <Login {...props} handleJWTChange={handleJWTChange} />} />
              <Route path="/movies/:id" component={OneMovie} />
              <Route path="/movies">
                <Movies />
              </Route>
              <Route exact path="/by-category">
                <CategoryPage />
              </Route>

              <Route
                exact
                path="/by-category/drama"
                render={(props) => <Categories {...props} title={`Drama`} />}
              />
              <Route
                exact
                path="/by-category/comedy"
                render={(props) => <Categories {...props} title={`Comedy`} />}
              />

              <Route path="/admin/movie/:id(\d+)" render={(props) => <EditMovie {...props} jwt={jwt} />} />
              <Route path="/admin/movie/add" render={(props) => <CreateMovie {...props} jwt={jwt} />} />
              <Route path="/admin" render={(props) => <Admin {...props} jwt={jwt} />} />

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

function CategoryPage() {

  let { path, url } = useRouteMatch()

  return (
    <div>
      <h2>Categories</h2>

      <ul>
        <li><Link to={`${path}/comedy`}>Comedy</Link></li>
        <li><Link to={`${path}/drama`}>Drama</Link></li>
      </ul>
    </div>
  )
}