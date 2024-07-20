import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useApi } from "../Context";

function Home() {
  const baseURL = useApi();
  const [user, setUser] = useState([]);
  const [searchquery, setSearchquery] = useState("");
  const today = dayjs().format("DD-MM-YYYY");

  useEffect(
    () => {
      data();
    }, // eslint-disable-next-line
    []
  );
  async function data() {
    let sample = await fetch(`${baseURL}getbirthdayinfo`, {
      headers: { authorization: `bearer ${localStorage.getItem("auth")}` },
    });
    if (sample.ok) {
      let da = await sample.json();
      da.sort((a, b) =>
        a.Birthdate === today ? -1 : b.Birthdate === today ? 1 : 0
      );
      setUser(da);
    }
  }

  async function search(e) {
    setSearchquery(e.target.value);
    let key = e.target.value;
    if (key === "") {
      data();
      return;
    }
    const res = await fetch(`${baseURL}search/${key}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("auth")}`,
      },
    });
    const datas = await res.json();
    if (datas.length <= 0) {
      setUser(datas);
    } else {
      setUser(datas);
    }
  }

  return (
    <div className="grid-container">
      <div className="searchbox-container">
        <MDBInputGroup>
          <MDBInput
            label={<span style={{ color: "#134B70" }}>Search</span>}
            style={{ backgroundColor: "#f0f0f0", color: "#333" }}
            value={searchquery}
            onChange={(e) => {
              search(e);
            }}
          />
          <MDBBtn rippleColor="light" style={{ backgroundColor: "#134B70" }}>
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>
      </div>
      {user.map((item, index) => (
        <div
          className="card"
          key={index}
          style={{
            backgroundColor: item.Birthdate === today ? "#134B70" : "white",
            color: item.Birthdate === today ? "white" : "black",
          }}
        >
          {item.Birthdate === today ? (
            <img src="/birthday.png" alt="profilepic" />
          ) : (
            <img src="/Not Birthday.png" alt="profilepic" />
          )}
          <h1>
            {item.Firstname} {item.Lastname}
          </h1>
          <h2>{item.Birthdate}</h2>
          {item.Birthdate === today ? (
            <h6 style={{ color: "pink" }}>Today is my birthday</h6>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Home;
