import React, { useState } from "react";
import dayjs from "dayjs";
import AlertVal from "./AlertVal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useApi } from "../Context";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { motion } from "framer-motion";

function Add() {
  const baseURL = useApi();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (show || msg) {
    setTimeout(() => {
      setShow(false);
      setMsg("");
    }, 5000);
  }

  async function submit() {
    if (firstName && lastName && date) {
      setLoading(true);
      const formattedDate = dayjs(date).format("DD-MM-YYYY");
      try {
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
        {/* Left Side Animation */}
        <MDBCol md="6" className="d-flex align-items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="my-5 display-3 fw-bold ls-tight px-3">
              Every birthday is a chance to start a new <br />
              <span className="text-primary">and celebrate the joy of life.</span>
            </h1>

            <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
              May your birthday be the start of a year filled with good luck, good
              health, and much happiness. Birthdays are a new start, a fresh
              beginning, and a time to pursue new endeavors with new goals. Move
              forward with confidence and courage. You are a very special person.
              May today and all of your days be amazing!
            </p>
          </motion.div>
        </MDBCol>

        {/* Right Side Animation */}
        <MDBCol md="6">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
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
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name of Birthday Person"
                      id="form1"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                    if (prompt("Enter Password :") === "6548") {
                      submit();
                    } else {
                      alert("Wrong Password");
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={15} style={{ color: "white" }} />
                  ) : (
                    "Add"
                  )}
                </MDBBtn>
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

export default Add;
