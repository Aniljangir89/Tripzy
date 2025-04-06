import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainContext);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('captainToken');

    useEffect(() => {
        console.log("Retrieved Token:", token); // Debugging token retrieval

        if (!token) {
            console.warn("No token found, redirecting...");
            navigate('/captainLogin');
            return;
        }

        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("API Response Data:", response.data); // Debugging API response

                if (response.status === 200 && response.data) {
                    console.log("Setting Captain:", response.data);
                    setCaptain(response.data);
                } else {
                    console.error("Invalid response format, redirecting...");
                    navigate('/captainLogin');
                }
            } catch (error) {
                console.error("Error fetching captain profile:", error);
                navigate('/captainLogin');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptainProfile();
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
