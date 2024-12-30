/* eslint-disable no-unused-vars */
import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {

    return (
        <div className='flex h-[98vh] gap-4 '>
            <div className="w-1/6 border-gray-500 border rounded-xl p-4 flex flex-col justify-between">
              <Sidebar /> 
            </div>
            <div className='w-5/6 border-gray-500 border rounded-xl p-4'>
               <Outlet />
            </div>
        </div>
    )
}

export default Home