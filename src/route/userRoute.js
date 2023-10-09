
const express = require("express");
const { addUser, getUserDetails, getSingleUser, updateUser, deleteUser } = require("../controller/userController");
const router = express.Router();

router.post("/addUser", addUser);

router.get("/getUserDetails/:adminId", getUserDetails);



// get single user details to update
router.get("/getSingleUser/:userId", getSingleUser);

// update the user
router.put("/updateUser/:userId", updateUser);

// delete the user
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;