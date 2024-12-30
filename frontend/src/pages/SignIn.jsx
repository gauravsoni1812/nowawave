/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Signin = () => {
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
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
           
            const token = result.token;
            Cookies.set("authToken", token, { expires: 1, secure: true });
            if (response.ok) {
                navigate('/');
                // alert('Signin successful!');
            } else {
                alert(`Signin failed: ${result.message}`);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <div className='h-[98vh] flex flex-col justify-center items-center'>
            <div className='w-1/4 rounded bg-gray-800 p-4'>
                <div className='text-white text-lg font-semibold mb-4'>
                    Signin
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
                Not a logged in user?{' '}
                <span 
                    className='text-blue-500 cursor-pointer hover:underline' 
                    onClick={() => navigate('/signup')}>
                     Signup
                </span>
            </div>
        </div>
    );
};

export default Signin;
