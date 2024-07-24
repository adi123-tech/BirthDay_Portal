import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useApi } from "../Context";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { motion } from "framer-motion"; // Import motion

function Home() {
  const baseURL = useApi();
  const [user, setUser] = useState([]);
  const [searchquery, setSearchquery] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const today = dayjs().format("DD-MM");

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
      da.sort((a, b) => {
        const formattedDateA = a.Birthdate.split("-").slice(0, 2).join("-");
        const formattedDateB = b.Birthdate.split("-").slice(0, 2).join("-");

        if (formattedDateA === today) return -1;
        if (formattedDateB === today) return 1;
        return 0;
      });

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
    setUser(datas);
  }

  async function deletedata(id) {
    const res = await fetch(`${baseURL}deletedata/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("auth")}`,
      },
    });

    if (res.ok) {
      data();
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
            onChange={(e) => search(e)}
          />
          <MDBBtn rippleColor="light" style={{ backgroundColor: "#134B70" }}>
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>
      </div>
      {user.map((item, index) => {
        const formattedDate = item.Birthdate.split("-").slice(0, 2).join("-");
        return (
          <motion.div
          className={`card ${hoveredItem === index ? "fire" : ""}`}
            key={index}
            initial={{ x: "-100vw", opacity: 0 }} // Initial position off-screen to the left
            animate={{ x: 0, opacity: 1 }} // Animate to original position
            transition={{ duration: 0.5 }} // Animation duration
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              backgroundColor: formattedDate === today ? "#134B70" : "white",
              color: formattedDate === today ? "white" : "black",
              position: "relative", // Ensure this is relative for positioning DeleteForeverIcon
            }}
          >
            <img
              src={
                formattedDate === today ? "/birthday.png" : "/Not Birthday.png"
              }
              alt="profilepic"
            />
            <h1>
              {item.Firstname} {item.Lastname}
            </h1>
            <h2>{item.Birthdate}</h2>
            {formattedDate === today && (
              <h6 style={{ color: "pink" }}>Today is my birthday</h6>
            )}
            <DeleteForeverIcon
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                const conf = window.confirm("Are you sure you want to delete");
                if (conf) {
                  deletedata(item._id);
                }
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default Home;
