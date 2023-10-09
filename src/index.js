
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// connecting to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB is connected"))
.catch((err)=>console.log("error in connecting with db", err.message));

// path to admin route
app.use("/admin", require("./route/adminRoute"))

// path to user route
app.use("/user", require("./route/userRoute"));

// application running on server
app.listen(process.env.PORT, ()=>{
    console.log("server is running on port", process.env.PORT);
});



