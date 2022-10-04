import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/providers/AuthProvider';

function PersonalPrivateRoutes({ children }) {

    const navigate = useNavigate();

    const { user, signUser } = useAuth();

    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
        setIsFirst(false)

    }, []);

    if (user && !isFirst && user.userType === "personal") {
        return children;
    } 
    else if (isFirst) {
        return <div style={{ height: "100vh" }}></div>
    } 
    else {
        navigate('/', {replace: true});
    }
}

export default PersonalPrivateRoutes