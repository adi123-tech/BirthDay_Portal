import React, { useEffect } from "react";

function Home() {
  useEffect(()=>{
    data();
  })
  async function data() {
    let sample = await fetch("http://localhost:5000/datares", {
      headers: { authorization: `bearer ${localStorage.getItem("auth")}` },
    });
    if(sample.ok)
    {
      let da = await sample.json();
      console.log(da);
    }
  }
  const user = [
    {
      name: "aditya dhonde",
      age: 5,
    },
    {
      name: "aditya dhonde",
      age: 5,
    },
    {
      name: "aditya dhonde",
      age: 5,
    },
    {
      name: "aditya dhonde",
      age: 5,
    },
  ];

  return (
    <div className="grid-container">
      {user.map((item, index) => (
        <div className="card" key={index}>
          <img src="/logo192.png" alt="profilepic" />
          <h1>{item.name}</h1>
          <h2>{item.age}</h2>
        </div>
      ))}
    </div>
  );
}

export default Home;
