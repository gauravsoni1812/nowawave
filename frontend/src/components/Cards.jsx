/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { FaArrowTurnUp } from 'react-icons/fa6';
import { IoAddCircleSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

export const Cards = ({ data, handleOpenModalcreate, handleOpenModalupdate, home }) => {
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deletetask/${id}`);
      alert("Task deleted successfully");
      window.location.reload(); 
      // Optionally, trigger a re-fetch or update the UI to remove the deleted task
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-gray-800 hover:cursor-pointer hover:scale-105 rounded-sm transition-all duration-300 p-4"
          >
            <div className="bg-gray-800 rounded">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300 my-2">{item.description}</p>
            </div>

            <div className="mt-4 w-full flex justify-between items-center">
              <button
                className={`${item.status === "completed" ? "bg-green-700" : "bg-red-700"} p-2 rounded w-3/6`}
              >
                {item.status}
              </button>

              <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                <button
                  onClick={() => {
                    handleOpenModalupdate(item);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    handleDeleteTask(item.id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}

      {home && (
        <div
          className="flex flex-col justify-center items-center hover:cursor-pointer hover:scale-105 transition-all duration-300 bg-gray-800 rounded-sm p-4"
          onClick={handleOpenModalcreate}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Tasks</h2>
        </div>
      )}
    </div>
  );
};
