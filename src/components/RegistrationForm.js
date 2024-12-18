import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function RegisterForm({ setIsLoggedIn }) { // Add setIsLoggedIn prop
    const [user, setUser] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Register the user
            const response = await axios.post('/api/users/register', user);
            // Store the token
            localStorage.setItem('token', response.data.token);
            // Update login state
            setIsLoggedIn(true);
            // Redirect to home page
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to register: ' + err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" value={user.username} onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
            {loading ? <p>Loading...</p> : <button type="submit">Register</button>}
            {error && <p>{error}</p>}
        </form>
    );
}

export default RegisterForm;
