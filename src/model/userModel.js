
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }, 
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin"
    }
})

module.exports = mongoose.model("user", userSchema);