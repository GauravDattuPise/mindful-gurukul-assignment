import { Box, Button, Grid, TextField, Toolbar, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../admin/Header';

// updating user

const UpdateUser = () => {


    // getting id from params
    const userId = useParams().userId;
     console.log("userId", userId)

    const navigate = useNavigate();

    // state for inputs
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // updating state

    function handleInputChange(e) {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }));
    }
    
    // getting single user & setting inputs
    async function getUser() {
        try {
                
            const { data } = await axios.get(`/user/getSingleUser/${userId}`);

            if (data?.status === true) {
                const { name, email, phone } = data.user;
                setInputs({ name, email, phone });
            }

        } catch (error) {
            toast.error("error in getting sigle user")
            console.log("error in get single user", error);
        }
    }

    useEffect(() => {
        getUser();
    }, [userId]);



    // updating user
    async function handleEditUser(e) {
        e.preventDefault();

        try {
            const { data } = await axios.put(`/user/updateUser/${userId}`, inputs);

            if (data?.status) {
                toast.success(data?.message);
                 navigate("/getUser");
            }

        } catch (error) {
            toast.error("Error in update user");
            console.log("error in update user", error);
        }
    }


    return (
        <div>
            <Header />
            
            <Grid container justifyContent="center" alignItems="center" height="100vh">
                <form onSubmit={handleEditUser}>
                    <Box className="container">
                        <Typography className="form-title" variant='h4' color='textSecondary'>update User</Typography>

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
                            <Button type='submit' sx={{ width: "160px" }} variant='contained' className="submit-button">Update User</Button>
                            <Button variant='contained' color='error' sx={{ marginLeft: "80px" }} onClick={()=>navigate("/getUser")}>Cancel</Button>
                        </Toolbar>
                    </Box>
                </form>
            </Grid>
        </div>
    )
}

export default UpdateUser