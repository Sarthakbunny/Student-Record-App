import React from 'react'
import { Navbar } from 'reactstrap';
import './Header.css'
import { selectUserName } from "../features/userSlice";
import { useSelector } from "react-redux";
import { Button } from 'reactstrap';

const CheckUser = ({admin}) => {
    if (admin !== null) {
        return <Button onClick={logOut}> Logout</Button>
    }
    return <div></div>
}

const logOut = () => {
    localStorage.removeItem('username');
    window.open('http://localhost:3000/home', '_self');
}

const Header = () => {
    const admin = useSelector(selectUserName);
    // console.log(admin);
    return (
        <Navbar>
            <h1>On Boarding App</h1>
            <div className="align-right"><i className="fa fa-lg fa-user-circle" aria-hidden="true"></i> {admin}</div>
            <CheckUser admin={admin} />
        </Navbar>
    )
}

export default Header;