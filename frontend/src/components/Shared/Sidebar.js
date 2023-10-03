import React, { useState , useEffect} from "react";
import SidebarLink from './SidebarLink'
import { HiOutlineLogout } from "react-icons/hi";
import { AiFillWechat } from "react-icons/ai";
const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-50 hover:text-cyan-950 hover:no-underline active:bg-slate-100 rounded-sm text-base  mt-0.5'
const Sidebar = ({userData}) => {
    // console.log(userData)
  return (
    <div className="flex flex-col bg-cyan-950 text-white w-80 p-1 ">
        <div className="flex items-center gap-2 px-1 py-3 ">
            {<AiFillWechat fontSize={35}/>}
            <h3 className="text-2xl">ChatApp</h3>
        </div>
        <div className="flex-1 py-6 flex flex-col gap-0.5 overflow-hidden hover:overflow-y-auto">
        
            {
                userData?.map((item) => (
                    <SidebarLink key={item.key} item ={item}>
                          {item.name}
                    </SidebarLink>
                ))
            }
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-t">
            
            {/* {
                DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item ={item}>
                          {item.label}
                    </SidebarLink>
                ))
            } */}
            <div className='text-red-500 cursor-pointer flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-50 hover:text-cyan-950 hover:no-underline active:bg-slate-100 rounded-sm text-base  mt-0.5'>
                
                    {<HiOutlineLogout fontSize={24}/>}
                
                Logout
            </div>
        </div>
        
    </div>
)
}

export default Sidebar