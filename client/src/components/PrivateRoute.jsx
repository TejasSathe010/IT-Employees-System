import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  return (
    <div>{ localStorage.getItem("valid") ? children : <Navigate to="/" /> }</div>
  )
}

export default PrivateRoute;