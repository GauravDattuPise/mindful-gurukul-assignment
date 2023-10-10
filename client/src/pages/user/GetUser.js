import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../admin/Header';
import UserCard from '../admin/UserCard';

import "./getUser.css"

const GetUser = () => {

  // state for users
  const [users, setusers] = useState([]);

  // getting adminId from localstorage
   const adminId = localStorage.getItem("adminId")

  // function for fetching users from backend and assign to users state

  async function getAllUsers() {
    try {
      const { data } = await axios.get(`/user/getUserDetails/${adminId}`);

      if (data?.status) {
       setusers(data.userDetails)
      }
      
    } catch (error) {
      console.log("error in get all users", error);
    }
  }

  // get all users at the time of rendering
  useEffect(() => {
    getAllUsers();
  }, []);


  return (
    
    <div>
        <Header/>
        <div style={{marginTop : "100px"}}>
      {/* passing users details as props */}
      {
        users && users.map(user =>
            <div key={user._id}>
          <UserCard
            name = {user.name}
            email = {user.email}
            phone = {user.phone}
            userId = {user._id}
          />
          </div>)
      }
      {
        users.length === 0 && 
        <img className='image-design' src="https://cdn.dribbble.com/users/1190995/screenshots/3307869/dribbble.png" alt='No data found image' />
      }
    </div>
    </div>
  )
}

export default GetUser