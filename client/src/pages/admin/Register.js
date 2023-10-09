import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import "./register.css"
import { checkname } from '../../validations/validation'

const Register = () => {

    // const states = ["Maharashtra", "Gujrat", "Karnataka"]
    // const [userState, setUserState] = useState("");
    // console.log(userState);
    // const controlUserState = (event, newValue) => {
    //     setUserState(newValue)
    // }
    // console.log(userState);

    // state for inputs
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        city: "",
        // state: ""
    });

    console.log(inputs.state)
    // handling input 
    function handleInputChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    //---------------------------------------------------------------------------------

    const [showPassword, setShowPassword] = useState(false);

    // states for error handling messages
    const [genderMessage, setGenderMessage] = useState("");

    const [howDidYouHearAboutThis, setHowDidYouHearAboutThis] = useState([]);
    const [howDidYouHearAboutThisMessage, setHowDidYouHearAboutThisMessage] = useState("");

    // ================= handling howDidYouHearAboutThis ===============================

    const handleHowDidYouHearAboutThis = (e) => {
        let newArray = howDidYouHearAboutThis;
        let index = newArray.indexOf(e.target.value)
        if (index === -1) {
            newArray.push(e.target.value);
            setHowDidYouHearAboutThis(newArray)
        }
        else {
            newArray.splice(index, 1);
            setHowDidYouHearAboutThis(newArray)
        }

        console.log(howDidYouHearAboutThis);
        if (howDidYouHearAboutThis.length !== 0) {
            setHowDidYouHearAboutThisMessage("")
        }
    }
    const navigate = useNavigate();


    //  ============================= REGISTRATION API =================================

    async function handleRegister(e) {

        e.preventDefault();

        // name error message
        if (checkname(inputs.name) === false) {
            toast.error("name can only contain alphabet");
            return;
        }

        // phone error message
        if (inputs.phone.length !== 10) {
            toast.error("phone should have 10 digits");
            return;
        }

        // genderMessage
        if (inputs.gender === "") {
            setGenderMessage("Please select your gender");
            return;
        }

        // how did you hear about this
        if (howDidYouHearAboutThis.length === 0) {
            setHowDidYouHearAboutThisMessage("Please select any one of the above field");
            return;
        }

        try {
            const adminObj = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                gender: inputs.gender,
                howDidYouHearAboutThis: howDidYouHearAboutThis,
                city: inputs.city,
                // state: userState
            }

            console.log(adminObj);
            // sending user's data to backend
            const res = await axios.post("admin/register", adminObj)

            // toast message
            if (res.data.status) {
                toast.success(res.data.message);
                navigate("/")
            }
            // if email is already exists
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error("Error in Registration")
            console.log(error)
        }
    }

    return (

        <Grid container justifyContent="center" alignItems="center" height="100vh" >
            <form onSubmit={handleRegister}>
                <Box className="container">
                    <Typography className="form-title" variant='h4' color='textSecondary'>Register</Typography>
                    <TextField
                        variant='outlined'
                        label="Name"
                        type='text'
                        name='name'
                        margin='normal'
                        value={inputs.name}
                        onChange={handleInputChange}
                        required
                        className="form-field"
                    />

                    <TextField
                        variant='outlined'
                        label="Email"
                        type="email"
                        name='email'
                        margin='normal'
                        value={inputs.email}
                        onChange={handleInputChange}
                        required
                        className="form-field"
                    />
                    <TextField
                        variant='outlined'
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name='password'
                        margin='normal'
                        value={inputs.password}
                        onChange={handleInputChange}
                        required
                        className="form-field"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Button onClick={() => setShowPassword((prevState) => !prevState)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                    />

                    {/* phone */}
                    <TextField
                        variant='outlined'
                        label="Phone"
                        type="Number"
                        name='phone'
                        margin='normal'
                        value={inputs.phone}
                        onChange={handleInputChange}
                        required
                        className="form-field"
                    />

                    {/* gender  */}

                    <FormControl className='radio-design'>
                        <FormLabel>Select your Gender</FormLabel>
                        <RadioGroup
                            name="gender"
                            value={inputs.gender}
                            onChange={handleInputChange}
                        >
                            <Toolbar>
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                            </Toolbar>
                        </RadioGroup>
                    </FormControl>

                    {/* gender error message */}
                    {
                        inputs.gender === "" && <h4 className='error-message'>{genderMessage}</h4>
                    }

                    {/* how did you hear about this */}
                    <FormGroup>
                        <FormLabel>How did you hear about us!</FormLabel>
                        <Toolbar>
                            <FormLabel>LinkedIn</FormLabel>
                            <Checkbox value="LinkedIn" onChange={(e) => { handleHowDidYouHearAboutThis(e) }}></Checkbox>
                            <FormLabel>Friends</FormLabel>
                            <Checkbox value="Friends" onChange={(e) => { handleHowDidYouHearAboutThis(e) }}></Checkbox>
                        </Toolbar>
                        <Toolbar >
                            <FormLabel>Job Portal</FormLabel>
                            <Checkbox value="Job Portal" onChange={(e) => { handleHowDidYouHearAboutThis(e) }}></Checkbox>
                            <FormLabel>Others</FormLabel>
                            <Checkbox value="Others" onChange={(e) => { handleHowDidYouHearAboutThis(e) }}></Checkbox>
                        </Toolbar>
                    </FormGroup>

                    {/* how did you hear about this error message */}
                    {
                        howDidYouHearAboutThis.length === 0 && <h4 className='error-message'>{howDidYouHearAboutThisMessage}</h4>
                    }

                    {/* city  */}
                    <FormControl fullWidth className="cityAndState">
                        <InputLabel >Select City</InputLabel>
                        <Select
                            name="city"
                            value={inputs.city}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Mumbai">Mumbai</MenuItem>
                            <MenuItem value="Pune">Pune</MenuItem>
                            <MenuItem value="Ahemadabad">Ahemadabad</MenuItem>
                        </Select>
                    </FormControl>

                    {/* state */}
                    {/* <Autocomplete className='cityAndState'
                        clearOnEscape
                        name="state"
                        value={inputs.state}
                        options={states}
                        // sx={{ width: "400px" }}
                        onChange={controlUserState}
                        renderInput={(params) => <TextField {...params} label="Search State"  value={inputs.state}/>}
                    /> */}

                    <Button type='submit' variant='contained' sx={{ marginTop: "20px" }} className="submit-button">Register</Button>

                    {/* button for navigate to login */}
                    <Button className="submit-button" onClick={() => navigate("/")} >
                        Alread a user ? Please login
                    </Button>
                </Box>
            </form>
        </Grid>

    )
}

export default Register