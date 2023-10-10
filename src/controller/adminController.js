
const bcrypt = require("bcrypt");

// admin registration

const adminModel = require("../model/adminModel");
const { validateName, validateEmail } = require("../validation/validator");

const register = async (req,res) =>{
   
    try {

        const adminData = req.body;
        const {name, email,password, phone,gender,howDidYouHearAboutThis, city, state } = adminData
        
        // validations

        // name
        if(!name){ return res.status(400).send({status : false, message : "name is required"})}
        if(validateName(name) === false){
            return res.status(200).send({status : false, message : "name should contain alphabets only"})
        }

        // email
        if(!email){ return res.status(400).send({status : false, message : "email is required"})}
        if(validateEmail(email) === false){
            return res.status(400).send({status : false, message : "email should contain alphaNumerics only"})
        }

        // password
        if(!password){ return res.status(400).send({status : false, message : "password is required"})}
         adminData.password = await bcrypt.hash(password,10);
        
        // phone
        if(!phone){ return res.status(400).send({status : false, message : "phone is required"})}
        
        if(phone.length !== 10){
            return res.status(400).send({status : false, message : "phone should contain 10 digits only"})
        }

        // gender
        if(!gender){ return res.status(400).send({status : false, message : "gender is required"})}
        if(gender !== "Male" && gender !== "Female" && gender !== "Others"){
            return res.status(400).send({status : false, message : "please provide any gender category [Male, female, Others]"}) 
        }

        // how did you hear about this
        if(!howDidYouHearAboutThis){ return res.status(400).send({status : false, message : "howDidYouHearAboutThis is required"})}
        
        // city
        if(!city){ return res.status(400).send({status : false, message : "city is required"})}
        if(city !== "Mumbai" && city !== "Pune" && city !== "Ahmedabad"){
            return res.status(400).send({status : false, message : "please provide one city out of this [Mumbai,Pune,Ahmedabad]"}) 
        }

        // state
        // if(!state){ return res.status(400).send({status : false, message : "state is required"})}
        // if(state !== "Maharashtra" && state !== "Karnataka" && state !== "Gujrat"){
        //     return res.status(400).send({status : false, message : "please provide one state out of this [Gujrat,Maharashtra,Karnataka]"}) 
        // }

        // checking emial already exist or not
        const existingEmail = await adminModel.findOne({email});
        if(existingEmail){
            return res.status(200).send({status : false, message : "Email already registerd"});
            // status 200 to show on toast message
        }

        // checking phone number already exist or not
        const existingPhone = await adminModel.findOne({phone});
        if(existingPhone){
            return res.status(200).send({status : false, message : "Phone already registerd"});
        }

        // saving admin details to database
        const savedAdmin = await adminModel.create(adminData);
        return res.status(201).send({status : true, message : "Registration Successfull", savedAdmin})
    }
    catch(error){
        res.status(500).send({status : false, error : "error in register admin", error})
    }
}


// =============================================================================================================

// login api

const login = async (req,res) =>{
   
    try {
        
        const data = req.body;
        const {email, password} = data;

        // admin validation
        if( !email || !password){
            return res.status(400).send({status : false, message : "email and password is required"})
        }

        // checking admin exist or not
        const existingAdmin = await adminModel.findOne({email});
        if(!existingAdmin){
            return res.status(200).send({status : false, message : "Email is not found"});
        }

        // checking password is matching or not
        const matchedPassword = await bcrypt.compare(password, existingAdmin.password);
        if(!matchedPassword){
            return res.status(200).send({status : false, message : "Password is incorrect"})
        }

        return res.status(200).send({status : true, message : "Login Successful", adminId : existingAdmin._id})

    } catch (error) {
        return res.status(500).send({status : false, message : error.message});  
    }
}
module.exports = {register, login}