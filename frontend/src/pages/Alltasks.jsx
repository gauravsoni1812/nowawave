/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Cards } from '../components/cards';
import { IoAddCircleSharp } from 'react-icons/io5';
import InputData from '../components/InputData';
import Cookies from 'js-cookie'; // To access the auth token
import {jwtDecode} from 'jwt-decode'; // To decode the JWT token

const Alltasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [create, setCreate] = useState(false);
  const [info, setInfo] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [userId, setUserId] = useState(null);

  const handleOpenModalcreate = () => {
    setCreate(true);
    setIsModalOpen(true);
  };

  const handleOpenModalupdate = (info) => {
    setInfo(info);
    setCreate(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("close");
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch userId from authToken stored in cookies
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); // Set userId from decoded token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    // Fetch data only if userId is available
    if (userId) {
      const fetchData = async () => {
        const res = await fetch(`http://localhost:3000/getAllTasks/${userId}`);
        const data = await res.json();
        setData(data.tasks);
      };
      fetchData();
    }
  }, [userId]); // Runs when userId is updated

  return (
    <>
      <div>
        <div
          className='cursor-pointer w-full flex justify-end px-4 py-2'
          onClick={handleOpenModalcreate}
        >
          <IoAddCircleSharp className='text-4xl text-gray-400' />
        </div>
        <Cards
          data={data}
          home={true}
          handleOpenModalcreate={handleOpenModalcreate}
          handleOpenModalupdate={handleOpenModalupdate}
        />
      </div>

      {isModalOpen && <InputData data={info} create={create} userId={userId} onClose={handleCloseModal} />}
    </>
  );
};

export default Alltasks;
