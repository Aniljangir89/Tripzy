import React, { use } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CaptainContext } from '../src/context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('captainToken');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainContext);
    const [isLoading, setIsLoading] = useState(true);   
    useEffect(() => {
        if (!token) {
            navigate('/captainLogin');
        }
    }, [token]);
    
axios.get(`${import.meta.env.VITE__BASE_URL}/captains/profile` ,{
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then((response) => {
        console.log('Response received:', response);
        if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
        } else {
            console.error('Unexpected response status:', response.status);
            navigate('/captainLogin');
            setIsLoading(false);
        }
    })
    .catch((error) => {
        console.error('Error during profile fetch:', error);
        setIsLoading(false);
    });

    if(isLoading) {
        return <div>Loading...</div>;
    }



    return <>{children}</>;
};

export default CaptainProtectWrapper;
