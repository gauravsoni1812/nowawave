/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const Protected = ({ Component }) => {
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("authToken");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (!decoded.userId) {
                    navigate("/signin");
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate("/signin");
            }
        } else {
            navigate("/signin");
        }
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>; // Or a spinner
    }

    return <Component />;
};


export default Protected