/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';

const InputData = ({ onClose, userId, create, data }) => {
  console.log(data)
  const [title, setTitle] = useState(data?.title || '');
  const [description, setDescription] = useState(data?.description || '');
  const [status, setStatus] = useState(data?.status || 'Incomplete');

  const handleAddTask = async () => {
    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/createTask/${userId}`, {
        title,
        description,
      });
      alert("Task added successfully");
      // onClose(); // Close the modal
      window.location.reload();

    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };
   const handleUpdateTask = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/updatetask/${data.id}`, {
        title,
        description,
        status,
      });
      alert("Task updated successfully");
      window.location.reload();
  
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  return (
    <>
      <div className='fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full'></div>
      <div className='fixed top-0 left-0 flex items-center justify-center h-screen w-full'>
        <div className='w-2/6 bg-gray-900 p-4 rounded'>
          <div className='flex justify-end'>
            <button
              className='flex justify-end pb-2'
              onClick={() => {
                onClose();
              }}
            >
              <IoCloseSharp className='text-xl' />
            </button>
          </div>

          <input
            type="text"
            placeholder='Title'
            className='w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder='Description'
            className='w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600'
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {!create && (
            <select
              className='w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          )}

          {create ? (
            <button
              className='w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700'
              onClick={handleAddTask}
            >
              Add Task
            </button>
          ) : (
            <button
              className='w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700'
              onClick={handleUpdateTask}
            >
              Update Task
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
