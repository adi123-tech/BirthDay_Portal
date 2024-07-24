import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import AlertVal from "./AlertVal";
import { useApi } from "../Context";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

function Login() {
  const baseURL = useApi();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (show || err) {
      const timer = setTimeout(() => {
        setShow(false);
        setErr(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, err]);

  async function submit() {
    if (email && password) {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email: email, Password: password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("user", data.user.Email);
          localStorage.setItem("auth", data.auth);
          navigate("/");
        } else {
          setErr(true);
        }
      } catch (error) {
        console.error(error);
        setErr(true);
      } finally {
        setLoading(false);
      }
    } else {
      setShow(true);
    }
  }

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        {/* Image Column with Animation */}
        <MDBCol col="10" md="6">
          <motion.img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone_image"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </MDBCol>

        {/* Form Column with Animation */}
        <MDBCol col="4" md="6">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="formControlLgs"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              onClick={() => submit()}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={15} style={{ color: "white" }} />
              ) : (
                "Sign in"
              )}
            </MDBBtn>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#3b5998" }}
            >
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with facebook
            </MDBBtn>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#55acee" }}
            >
              <MDBIcon fab icon="twitter" className="mx-2" />
              Continue with twitter
            </MDBBtn>
          </motion.div>
        </MDBCol>
      </MDBRow>
      {show && <AlertVal msg="Please Fill out the Empty fields" />}
      {err && <AlertVal msg="Credentials are invalid" />}
    </MDBContainer>
  );
}

export default Login;
