import React, { useState } from 'react'
import SideBar from '../components/Layout/SideBar'
import AdminMenu from '../components/Layout/AdminMenu';

const DashBoard = ({ children }) => {
  const [active, setActive] = useState(1);
  const [isSidebarVisible, setSidebarVisible] = useState(true);


  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
      <div className="flex bg-[#3B5998] h-screen">

        <SideBar active={active} setActive={setActive} isSidebarVisible={isSidebarVisible} />

        <div className="flex flex-col w-full">
          <AdminMenu onToggleSidebar={toggleSidebar} active={active} setActive={setActive} />

          <div className="  mx-2  mt-7  overflow-auto dashboard" onClick={() => setSidebarVisible(true)}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard
