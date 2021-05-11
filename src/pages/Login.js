import axios from '../axios';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useStateValue } from "../context/StateProvider";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [{ user }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios({
            method: 'post',
            url: '/users/login',
            data: {
                email,
                password,
            }
        }).then(res => {
            localStorage.setItem("auth-token", res.data.token);
            dispatch({
                type: 'SET_USER',
                user: { ...res.data }
            })
        }).catch(err => {
            alert(err.response.data.msg)
        })
        setLoading(false)
    }
    if (user) {
        history.push("/")
    }
    const handleRegister = () => {
        history.push("/register")
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {loading ? "Loading..." : "Submit"}
                </Button>
                <Button onClick={handleRegister} variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Login
