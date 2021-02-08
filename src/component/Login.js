import React, { useState } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { addUser } from '../features/userSlice';
import { useDispatch } from "react-redux";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const validateUser = async () => {
        const res = await fetch(`http://localhost:4000/users`);
        const data = await res.json();
        for(let i=0;i<data.length;i++){
            if(data[i].username === username && data[i].password === password)
                return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await validateUser();
        if(res === false){
            alert('Password and userName does not matched');
            setUsername('');
            setPassword('');
        }
        else{
            dispatch(addUser(username));
            window.open('http://localhost:3000/home', '_self');
        }
    }

    return(
        <div className="container">
            <h3>Login</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username: </Label>
                    <Input name="username" value={username} id="username" onChange={(e) => setUsername(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password: </Label>
                    <Input name="password" type="password" value={password} id='password' onChange={(e) => setPassword(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" color="success">Login</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Login
