import React, { useEffect, useState } from "react";
import AlertVal from "./AlertVal";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useApi } from "../Context";

function Signup() {
  const baseURL = useApi();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });

  if (show || msg) {
    setTimeout(() => {
      setShow(false);
      setMsg("");
    }, 5000);
  }

  async function submit() {
    if (firstName && lastName && email && password) {
      const data = await fetch(`${baseURL}signup`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          Firstname: firstName,
          Lastname: lastName,
          Email: email,
          Password: password,
        }),
      });
      const res= await data.json();
      if (data.ok) {
        localStorage.setItem("user",res.user.Email);
        localStorage.setItem("auth",res.auth);
        navigate("/");
      } else {
        const res = await data.json();
        setMsg(res.msg);
      }
    } else {
      setShow(true);
    }
  }

  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First name"
                    id="form1"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last name"
                    id="form1"
                    value={lastName}
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form1"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form1"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <MDBBtn
                className="w-100 mb-4"
                size="md"
                onClick={() => {
                  submit();
                }}
              >
                sign up
              </MDBBtn>

              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {show ? <AlertVal msg="Please Fill out the Empty fields" /> : null}
      {msg ? (
        <AlertVal msg={msg}/>
      ) : null}
    </MDBContainer>
  );
}

export default Signup;
