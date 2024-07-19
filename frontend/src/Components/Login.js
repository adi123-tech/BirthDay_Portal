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
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });

  if (show || err) {
    setTimeout(() => {
      setShow(false);
      setErr(false);
    }, 5000);
  }

  async function submit() {
    console.log(email + password)
    if (email && password) {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });
      if (res.ok) {
        localStorage.setItem('user','loggedin')
        navigate("/");
      } else {
        setErr(true);
      }
    } else {
      setShow(true);
    }
  }

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone_image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            id="formControlLgs"
            type="email"
            size="lg"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            size="lg"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
            onClick={() => {
              submit();
            }}
          >
            Sign in
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
        </MDBCol>
      </MDBRow>
      {show ? (
        <Alert
          variant="outlined"
          severity="warning"
          sx={{
            width: "20%",
            position: "absolute",
            top: "70px",
            right: "20px",
            transition: "all 0.5s ease-in-out",
          }}
        >
          Please Fill out the Empty fields
        </Alert>
      ) : null}
      {err ? (
        <Alert
          variant="outlined"
          severity="warning"
          sx={{
            width: "20%",
            position: "absolute",
            top: "70px",
            right: "20px",
            transition: "all 0.5s ease-in-out",
          }}
        >
          Credentials are invalid
        </Alert>
      ) : null}
    </MDBContainer>
  );
}

export default Login;
