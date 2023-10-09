
const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

// connecting to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB is connected"))
.catch((err)=>console.log("error in connecting with db", err.message));

// path to admin route
app.use("/admin", require("./src/route/adminRoute"))

// path to user route
app.use("/user", require("./src/route/userRoute"));

// static files
// code for deployment of project
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  )
});

// application running on server
app.listen(process.env.PORT, ()=>{
    console.log("server is running on port", process.env.PORT);
});



