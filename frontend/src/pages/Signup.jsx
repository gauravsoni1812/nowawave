/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

 
    useEffect(() => {
      // Check if user is already logged in
      const token = Cookies.get("authToken");
      if (token) {
        // Redirect to home page if already logged in
        navigate('/');
      }
    }, [navigate]);
  
    const handleSubmit = async () => {
        const payload = { username, password };
        

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                // alert('Signup successful!');
                navigate('/signin');
            } else {
                alert(`Signup failed: ${result.message}`);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <div className='h-[98vh] flex flex-col justify-center items-center'>
            <div className='w-1/4 rounded bg-gray-800 p-4'>
                <div className='text-white text-lg font-semibold mb-4'>
                    Signup
                </div>
                <input 
                    type="text" 
                    placeholder='Username'
                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded text-white'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input 
                    type="password" 
                    placeholder='Password'
                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded text-white'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button 
                    onClick={handleSubmit}
                    className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4'>
                    Submit
                </button>
            </div>
            <div className='mt-4 text-white'>
                Already a user?{' '}
                <span 
                    className='text-blue-500 cursor-pointer hover:underline' 
                    onClick={() => navigate('/signin')}>
                     Signin
                </span>
            </div>
        </div>
    );
};

export default Signup;