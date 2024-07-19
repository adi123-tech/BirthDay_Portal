const express = require("express");
const CORS = require("cors");
require("./mongodb/config");
const app = express();
app.use(CORS());
app.use(express.json());

const users = require("./mongodb/users");

app.post("/signup", async (req, res) => {
  const data = await users.find({ Email: req.body.Email });
  if (data.length <= 0) {
    await users.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
      Password: req.body.Password,
    });
    res.send("Recieved");
  }else{
    res.status(404).send({"msg":"User Already Exits"})
  }
});

app.post("/login", async (req, res) => {
  const data = await users.find(
    { Email: req.body.Email },
    { Email: 1, Password: 1 }
  );
  if (data.length > 0) {
    if (data[0]["Password"] === req.body.Password) {
      res.send("User login successfull");
    } else {
      res.status(404).send("Password Not Match");
    }
  } else {
    res.status(404).send("User N0t found");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
