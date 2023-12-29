import React, { useState } from 'react'
import { CgMenuLeft } from 'react-icons/cg'

const AdminMenu = ({ onToggleSidebar, setActive }) => {

    return (
        <>

            <div className="w-full pt-2 md:absolute relative top-0 right-0">
                <div className="flex justify-between items-center py-2 md:px-5 px-2">
                    <div className="item pt-2 ">
                        <div className="p-0 flex gap-2  justify-between md:gap-6 items-center text-[#666666]">
                            <div className="menubtn md:hidden block ">
                                <button className="btn mx-1 border-2 rounded-lg border-gray-500 p-1" onClick={onToggleSidebar}>
                                    <CgMenuLeft className='text-2xl text-gray-500' /></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AdminMenu