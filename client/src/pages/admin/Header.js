import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { toast } from 'react-hot-toast';


const Header = () => {

    return (
        <div>
            <AppBar  >
                <Toolbar>
                    <Typography variant='h5'> Manage Users</Typography>
                    <Box sx={{ marginLeft: "auto", marginRight: "10px" }}>
                        <Tabs value={false}>
                            <Tab LinkComponent={Link} to="/addUser" label="addUser" sx={{ color: "white" }}></Tab>
                            <Tab LinkComponent={Link} to="/getUser" label="Users" sx={{ color: "white" }}></Tab>                            
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header