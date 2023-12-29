import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { MdDashboard } from 'react-icons/md';

const SideBar = ({ setActive, isSidebarVisible }) => {
    const Navigate = useNavigate()
    const logout = async () => {
        try {
            localStorage.removeItem("token");
            toast.success('Logout Successfully');
            Navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path
            ? 'text-white bg-gradient-to-r from-[#3B5998] via-[#cdb4db] to-[rgba(142, 160, 255, 0)] '
            : '';
    };



    return (
        <>
            <div className={`md:block bg-[#3B5998] text-black border-r z-30  w-[65%] md:w-[20%] md:relative absolute ${isSidebarVisible ? 'hidden' : 'block absolute'} h-screen`} id="responsiveSideBar" >

                <div className="flex justify-center py-7  text-xl text-white font-semibold  border-gray-300">
                    <Link to='/'>
                        Dashboard
                    </Link>
                </div>
                <div className="pt-5 flex flex-col justify-between relative h-[85vh]">
                    <div className=" mx-auto flex flex-col  !text-white">

                        <div onClick={() => setActive(1)}>
                            <Link to="/">
                                <div className={`flex gap-2 items-center  py-4 px-5 text-lg font-medium cursor-pointer ${isActive('/')}`}>
                                    <HiUserGroup className="text-[1.7rem]" />
                                    Students
                                </div>
                            </Link>
                        </div>

                        <div onClick={() => setActive(2)}>
                            <Link to="/">
                                <div className={`flex gap-2 items-center  py-4 px-5 text-lg font-medium cursor-pointer ${isActive('/dashboard/users')}`}>
                                    <FaUserCircle className="text-[1.7rem]" />
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

                    <div className="absolute bottom-0 left-10">
                        <div onClick={() => setActive(6)}>
                            <div className=" flex items-center justify-center gap-1" >
                                <div className={`flex gap-2 items-center  py-4 px-2  border-[#003443] rounded-tl-2xl rounded-bl-2xl text-lg text-white font-medium cursor-pointer `} onClick={() => logout()}>
                                    <BiLogOut className="text-[1.4rem]" />
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
