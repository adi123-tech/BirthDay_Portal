import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

function Home() {
  const [user, setUser] = useState([]);
  const today = dayjs().format("DD-MM-YYYY");
  useEffect(() => {
    data();
  });
  async function data() {
    let sample = await fetch("http://localhost:5000/getbirthdayinfo", {
      headers: { authorization: `bearer ${localStorage.getItem("auth")}` },
    });
    if (sample.ok) {
      let da = await sample.json();
      setUser(da);
    }
  }

  return (
    <div className="grid-container">
      {user.map((item, index) => (
        <div
          className="card"
          key={index}
          style={{
            backgroundColor: item.Birthdate === today ? "black" : "white",
          }}
        >
          <img src="/logo192.png" alt="profilepic" />
          <h1>
            {item.Firstname} {item.Lastname}
          </h1>
          <h2>{item.Birthdate}</h2>
        </div>
      ))}
    </div>
  );
}

export default Home;
