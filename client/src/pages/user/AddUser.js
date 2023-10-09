import { Box, Button, Grid, TextField, Toolbar, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../admin/Header';

// adding user

const AddUser = () => {

    const navigate = useNavigate();

    // state
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // getting admin from localstorage 
    const adminId = localStorage.getItem("adminId")

    // updating state
    function handleInputChange(e) {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // sending user data
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const userData = {
                name: inputs.name,
                email: inputs.email,
                phone: inputs.phone,
                adminId: adminId
            }

            const { data } = await axios.post("user/addUser", userData);

            if (data.status) {
                toast.success(data.message)

                setTimeout(() => {
                    navigate("/getUser")
                }, 1000)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Error in adding user")
            console.log(error);
        }
    }
    return (
        <div>
            <Header />
            <Grid container justifyContent="center" alignItems="center" height="100vh">
                <form onSubmit={handleSubmit}>
                    <Box className="container">
                        <Typography className="form-title" variant='h4' color='textSecondary'>Add User</Typography>

                        <TextField
                            variant='outlined'
                            label="User Name"
                            type="text"
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
                            label="Phone"
                            type="number"
                            name='phone'
                            margin='normal'
                            value={inputs.phone}
                            onChange={handleInputChange}
                            required
                            className="form-field"
                        />

                        <Toolbar>
                            <Button type='submit' sx={{ width: "160px" }} variant='contained' className="submit-button">add User</Button>
                            <Button variant='contained' color='error' sx={{ marginLeft: "80px" }}  onClick={()=>navigate("/getUser")}>Cancel</Button>
                        </Toolbar>
                    </Box>
                </form>
            </Grid>
        </div>
    )
}

export default AddUser