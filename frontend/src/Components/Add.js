import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function Add() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(dayjs("2000-01-20"));
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  if (show || msg) {
    setTimeout(() => {
      setShow(false);
      setMsg("");
    }, 5000);
  }

  //   useEffect();

    async function submit() {
      if (firstName && lastName && date) {
        const data = await fetch("http://localhost:5000/signup", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            Firstname: firstName,
            Lastname: lastName,
          }),
        });
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
                    label="First name of Birthday Person"
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
                    label="Last name of Birthday Person"
                    id="form1"
                    value={lastName}
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </MDBCol>
              </MDBRow>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Enter Birthdate"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <br/>
              <MDBBtn
                className="w-100 mb-4"
                size="md"
                onClick={() => {
                   submit();
                }}
              >
                sign up
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
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
      {msg ? (
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
          {msg}
        </Alert>
      ) : null}
    </MDBContainer>
  );
}

export default Add;
