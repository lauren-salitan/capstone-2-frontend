import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherForm from './components/WeatherForm';
import Thermometer from './components/Thermometer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegistrationForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                    <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<RegisterForm setIsLoggedIn={setIsLoggedIn} />} />
                </Routes>
            </div>
        </Router>
    );
}

function Home({ isLoggedIn }) {
    return (
        <div>
            <h1>Welcome to the Weather App</h1>
            <WeatherForm />
            <Thermometer isLoggedIn={isLoggedIn} />
            {!isLoggedIn && (
                <p>Log in to save locations and access additional features.</p>
            )}
        </div>
    );
}

export default App;