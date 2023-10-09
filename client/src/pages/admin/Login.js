import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"

import "./register.css"

// icons for password
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



const Login = () => {

    const navigate = useNavigate();

    // const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    // state for inputs
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    // handling input 
    function handleInputChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // user registration
    async function handleLogin(e) {

        e.preventDefault();

        try {
            const adminObj = {
                email: inputs.email,
                password: inputs.password
            }

            // sending data to backend
            const res = await axios.post("admin/login", adminObj)

            // toast message
            if (res.data.status) {
                toast.success(res.data.message)
                localStorage.setItem("adminId", res.data.adminId)
                navigate("/addUser")
            }
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
    }

    return (
        <Grid container justifyContent="center" alignItems="center" height="100vh">
        <form onSubmit={handleLogin}>
            <Box className="container">
                <Typography className="form-title" variant='h4' color='textSecondary'>Login</Typography>
                
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

                <Button type='submit' variant='contained' className="submit-button">Login</Button>

                {/* button for navigate to login */}
                <Button className="submit-button" onClick={() => navigate("/register")} >
                    Not a user ? Please Register
                </Button>
            </Box>
        </form>
    </Grid>


    )
}

export default Login