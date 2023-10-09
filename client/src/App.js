import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from './pages/admin/Register';
import Login from './pages/admin/Login';
import AddUser from './pages/user/AddUser';
import GetUser from './pages/user/GetUser';
import UpdateUser from './pages/user/UpdateUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/addUser" element={<AddUser/>} />
        <Route path="/getUser" element={<GetUser/>} />
        <Route path="/updateUser/:userId" element={<UpdateUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//=====================================


