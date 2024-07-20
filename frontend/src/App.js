import React from "react";
import { Route, Routes } from "react-router-dom";
import NavbarComp from "./Components/NavbarComp";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import NotFound404 from "./Components/NotFound404";
import PrivateRoute from "./Components/PrivateRoute";
import Add from "./Components/Add";
import { ApiProvider } from "./Context";

function App() {
  return (
    <>
      <ApiProvider>
        <NavbarComp />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/adduser" element={<Add />} />
          </Route>

          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="*" element={<NotFound404 />} />
        </Routes>
      </ApiProvider>
    </>
  );
}

export default App;
