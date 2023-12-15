import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3500/auth/adminlogin", credentials)
    .then(result => {
      if (result.data.loginStatus) {
        navigate('/dashboard');
      } else {
        setLoginError(result.data.Error);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">
          { loginError && loginError }
        </div>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* <label htmlFor="email"><strong>Email: </strong></label> */}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              onChange={ (e) => setCredentials({ ...credentials, email: e.target.value }) } 
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="password"><strong>Password: </strong></label> */}
            <input
              type="password"
              name="password"
              placeholder="Enter Password "
              className="form-control rounded-0"
              onChange={ (e) => setCredentials({ ...credentials, password: e.target.value }) }
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
