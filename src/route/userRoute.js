
const express = require("express");
const { addUser, getUserDetails, getSingleUser, updateUser, deleteUser } = require("../controller/userController");
const router = express.Router();

// adding users
router.post("/addUser", addUser);

// getting user details for admin
router.get("/getUserDetails/:adminId", getUserDetails);

// get single user details to update
router.get("/getSingleUser/:userId", getSingleUser);

// update the user
router.put("/updateUser/:userId", updateUser);

// delete the user
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;