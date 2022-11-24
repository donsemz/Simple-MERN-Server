const express = require("express");
const app = express();
const mongoose = require("mongoose");//setup mongoDB with mongoose
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = 3001;
const PASSWORD = "";

const mongo_url = `mongodb+srv://donnie:${PASSWORD}@cluster0.8cwyzqm.mongodb.net/first-mern-database?retryWrites=true&w=majority`;

mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongoDb is connected");
  })
  .catch((error) => {
    console.log("mongoDb not connected");
    console.log(error);
  });

//get request on MongoDB
app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//post request on MongoDB
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
