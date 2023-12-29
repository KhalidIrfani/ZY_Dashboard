import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';

const SideBar = ({ setActive, isSidebarVisible }) => {

    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path
            ? 'text-white bg-[#A16EFD] '
            : '';
    };



    return (
        <>
            <div className={`md:block bg-[#312D4B] text-black border-r z-30 w-[65%] md:w-[20%] md:relative absolute ${isSidebarVisible ? 'hidden' : 'block absolute'} h-screen`} id="responsiveSideBar" >

                <div className="flex justify-center py-7  text-xl text-white font-semibold  border-gray-300">
                    <Link to='/'>
                        <div className="flex gap-1">
                            <FiHome className='text-[1.5rem]' />
                            Dashboard
                        </div>
                    </Link>
                </div>
                <div className="pt-5 flex flex-col justify-between relative h-[85vh]">
                    <div className=" mx-auto flex flex-col  !text-white">

                        <div onClick={() => setActive(1)}>
                            <Link to="/">
                                <div className={`flex gap-2 items-center rounded-md py-3 px-5 text-lg font-medium cursor-pointer ${isActive('/')}`}>
                                    <FaUsers className="text-[1.7rem]" />
                                    Students
                                </div>
                            </Link>
                        </div>

                        <div onClick={() => setActive(2)}>
                            <Link to="/">
                                <div className={`flex gap-2 items-center  py-4 px-5 text-lg font-medium cursor-pointer ${isActive('/dashboard/users')}`}>
                                    <FaChalkboardTeacher className="text-[1.7rem]" />
                                    Teachers
                                </div>
                            </Link>
                        </div>


                        <div onClick={() => setActive(3)}>
                            <Link to="/">
                                <div className={`flex gap-2 items-center  py-4 px-5 text-lg font-medium cursor-pointer ${isActive('/dashboard/communities')}`}>
                                    <MdDashboard className="text-[1.7rem]" />
                                    Schedules
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
