import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "./axios"

function App() {

  const [, dispatch] = useStateValue();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }
    const tokenResponse = await axios({
      method: 'post',
      url: '/users/tokenIsValid',
      data: null,
      headers: { "x-auth-token": token }
    });
    if (tokenResponse.data) {
      const userRes = await axios({
        method: 'get',
        url: '/users/',
        data: null,
        headers: { "x-auth-token": token }
      });
      dispatch({
        type: 'SET_USER',
        user: { ...userRes.data }
      })
    }
  }


  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/login" >
            <Login />
          </Route>
          <Route exact path="/register" >
            <Register />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;