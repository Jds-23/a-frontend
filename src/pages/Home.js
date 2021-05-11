import React from 'react'
import { useStateValue } from "../context/StateProvider";
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const Home = () => {
    const [{ user }, dispatch] = useStateValue();
    const history = useHistory();
    if (!user) {
        history.push("/login")
    }
    const handelLogout = () => {
        dispatch({
            type: 'SET_USER',
            user: null
        })
        localStorage.setItem("auth-token", "");
    }
    return (
        <div>
            <h1>{user?.user?.displayName}</h1>
            <Button onClick={handelLogout}>Logout</Button>
        </div>
    )
}

export default Home
