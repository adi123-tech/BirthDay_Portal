const express = require("express");
const CORS = require("cors");
const JWT = require("jsonwebtoken");
const secretkey = "adityadhonde@123";
require("./mongodb/config");
const app = express();
app.use(CORS());
app.use(express.json());

const middleware = require("./middleware/verfiyToken");
const route = express.Router();
route.use(middleware);
route.get("/middleware");

const users = require("./mongodb/users");

app.post("/signup", async (req, res) => {
  const data = await users.find({ Email: req.body.Email });
  if (data.length <= 0) {
    const user = await users.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
      Password: req.body.Password,
    });
    const newuser = {
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
    };
    JWT.sign({ newuser }, secretkey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        res.status(404).send({msg:"Invalid token generated"});
      } else {
        res.send({ user: newuser, auth: token });
      }
    });
  } else {
    res.status(404).send({ msg: "User Already Exits" });
  }
});

app.post("/login", async (req, res) => {
  const data = await users.find(
    { Email: req.body.Email },
    { Email: 1, Password: 1 }
  );
  const loggeduser = {
    Email: req.body.Email,
  };
  if (data.length > 0) {
    if (data[0]["Password"] === req.body.Password) {
      JWT.sign({ loggeduser }, secretkey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.status(404).send({msg:"Invalid token generated"});
        } else {
          res.json({ user: loggeduser, auth: token });
        }
      });
    } else {
      res.status(404).send({msg:"Password Not Match"});
    }
  } else {
    res.status(404).send({msg:"User N0t found"});
  }
});


route.get('/datares',async(req,res)=>{
  res.json({msg : "success"});
})

app.use("/", route);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
