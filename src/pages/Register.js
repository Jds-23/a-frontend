import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useStateValue } from "../context/StateProvider";
import axios from "../axios"
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [{ user },] = useStateValue();
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        await axios({
            method: 'post',
            url: '/users/register',
            data: {
                displayName,
                email,
                password,
            }
        }).then(res => {
            console.log(res)
            alert("Registered!!! Login")
            history.push("/login")
        }).catch(err => {
            alert(err.response.data.msg)
        })
        setLoading(false)
    }
    if (user) {
        history.push("/")
    }
    const handleLogin = () => {
        history.push("/login")
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required value={displayName} onChange={e => setDisplayName(e.target.value)} type="text" placeholder="Enter name" />
                </Form.Group>
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
                <Button onClick={handleLogin} variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Register
