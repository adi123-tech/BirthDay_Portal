import React, { useState } from "react";
import dayjs from "dayjs";
import AlertVal from "./AlertVal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useApi } from "../Context";
import { useNavigate } from "react-router-dom";
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
  const baseURL = useApi();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  if (show || msg) {
    setTimeout(() => {
      setShow(false);
      setMsg("");
    }, 5000);
  }

  async function submit() {
    if (firstName && lastName && date) {
      const formattedDate = dayjs(date).format("DD-MM-YYYY");
      const data = await fetch(`${baseURL}adduserbirthdayinfo`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("auth")}`,
        },
        body: JSON.stringify({
          Firstname: firstName,
          Lastname: lastName,
          Birthdate: formattedDate,
        }),
      });
      if (data.ok) {
        navigate("/");
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
              <br />
              <MDBBtn
                className="w-100 mb-4"
                size="md"
                onClick={() => {
                  submit();
                }}
              >
                Add Birthday Info
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {show ? <AlertVal msg="Please Fill out the Empty fields" /> : null}
      {msg ? <AlertVal msg={msg} /> : null}
    </MDBContainer>
  );
}

export default Add;
