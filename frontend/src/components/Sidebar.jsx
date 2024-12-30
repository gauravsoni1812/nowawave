/* eslint-disable no-unused-vars */
import React from 'react';
import { CgNotes } from 'react-icons/cg';
import { FaCheckDouble } from 'react-icons/fa';
import { TbNotebookOff } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {
    const navigate = useNavigate(); // Hook for navigation

    // Data for sidebar menu items
    const data = [
        {
            title: "All tasks",
            icon: <CgNotes />,
            link: "/"
        },
        {
            title: "Completed tasks",
            icon: <FaCheckDouble />,
            link: "/completedTasks"
        },
        {
            title: "Incomplete tasks",
            icon: <TbNotebookOff />,
            link: "/incompleteTasks"
        }
    ];

    // Function to handle logout
    const handleLogout = () => {
        // Remove the auth token from cookies
        Cookies.remove("authToken");

        // Redirect the user to the sign-in page
        navigate("/signin");
    };

    return (
        <>
            <div>
                <h2 className='text-xl font-semibold'>The Task management</h2>
                <h4 className='mb-2 text-gray-400'>tcm@gmail.com</h4>
            </div>

            <div>
                {data.map((item, index) => (
                    <Link to={item.link} key={index} className='my-2 flex items-center gap-2 hover:bg-slate-600 p-2'>
                        {item.icon} {item.title}
                    </Link>
                ))}
            </div>

            <div>
                <button onClick={handleLogout} className='bg-gray-600 w-full p-2 rounded'>
                    Log Out
                </button>
            </div>
        </>
    );
};

export default Sidebar;
