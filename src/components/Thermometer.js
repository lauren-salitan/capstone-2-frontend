import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Thermometer.css';

function Thermometer({ latitude, longitude, temperature, isLoggedIn }) {
    const [savedLocations, setSavedLocations] = useState([]);

    // Function to save the current weather information for logged-in users
    const saveLocation = async () => {
        if (!isLoggedIn) {
            alert('Please log in to save locations.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/saved-locations', {
                name: `Location (${latitude}, ${longitude})`,
                latitude,
                longitude,
                temperature,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Location saved successfully!');
            fetchSavedLocations();
        } catch (error) {
            console.error('Failed to save location', error);
        }
    };

    // Function to fetch saved locations for the logged-in user
    const fetchSavedLocations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/saved-locations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSavedLocations(response.data.locations);
        } catch (error) {
            console.error('Failed to retrieve saved locations', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchSavedLocations();
        }
    }, [isLoggedIn]);

    return (
        <div className="new-thermo">
            <div className="new-thermo-container">
                <div className="new-thermo-things">
                    <div className="mercury-holder">
                        <div 
                            className="new-thermometer-mercury"
                            style={{ height: `${temperature}%` }}
                        ></div>
                    </div>
                    <div className="new-thermometer-bulb"></div>
                    <div className="new-thermometer-tube"></div>
                </div>
                <div className="new-thermometer-labels new-farenheit-thermometer-labels">
                    {[...Array(11)].map((_, i) => (
                        <span key={i} className="new-thermometer-label">
                            {i * 10}&deg;
                        </span>
                    ))}
                </div>
            </div>
            <div className="new-temp-and-buttons">
                <div id="new-current-temp">
                    The current temperature is <span>{temperature}</span>&deg;F
                </div>
                {isLoggedIn && <button onClick={saveLocation}>Save Location</button>}
                
                {isLoggedIn && (
                    <div className="saved-locations">
                        <h2>Saved Locations</h2>
                        {savedLocations.length > 0 ? (
                            <ul>
                                {savedLocations.map((location) => (
                                    <li key={location.location_id}>
                                        {location.name} - {location.WeatherData.temperature}°F recorded on{' '}
                                        {new Date(location.WeatherData.date_recorded).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No saved locations yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Thermometer;
