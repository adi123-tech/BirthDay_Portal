import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import CircularProgress from "@mui/material/CircularProgress";

function Signup() {
  const baseURL = useApi();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  if (show || msg) {
    setTimeout(() => {
      setShow(false);
      setMsg("");
    }, 5000);
  }

  async function submit() {
    if (firstName && lastName && email && password) {
      setLoading(true);
      try {
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
        const res = await data.json();
        if (data.ok) {
          localStorage.setItem("user", res.user.Email);
          localStorage.setItem("auth", res.auth);
          navigate("/");
        } else {
          setMsg(res.msg);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setShow(true);
    }
  }

  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol md="6">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center text-md-start d-flex flex-column justify-content-center">
              <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                Welcome to Our Portal <br />
                <span className="text-primary">
                  Where Your Reminders Matter
                </span>
              </h1>

              <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Our platform offers an innovative way to manage your important
                dates, including birthday reminders. With our user-friendly
                interface, you can easily keep track of birthdays and never miss
                celebrating a special moment again. Enjoy a seamless experience
                with notifications and reminders tailored to your preferences,
                ensuring that you’re always prepared for those special
                occasions.
              </p>
            </div>
          </motion.div>
        </MDBCol>

        <MDBCol md="6">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name"
                      id="form1"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn
                  className="w-100 mb-4"
                  size="md"
                  onClick={submit}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={15} style={{ color: "white" }} />
                  ) : (
                    "Sign up"
                  )}
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
          </motion.div>
        </MDBCol>
      </MDBRow>
      {show ? <AlertVal msg="Please Fill out the Empty fields" /> : null}
      {msg ? <AlertVal msg={msg} /> : null}
    </MDBContainer>
  );
}

export default Signup;
