import { Outlet, Navigate } from "react-router-dom";

import React from "react";

function PrivateRoute() {
  const auth = localStorage.getItem('user');
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
