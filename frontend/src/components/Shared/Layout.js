import React from 'react'
import React from "react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex flex-row h-screen w-screen bg-neutral-100 overflow-hidden">
       <Sidebar />
       <div className="flex-1">
         <Header />
         <div>
           <Outlet />
         </div>
       </div>
       {/* <p>Footer</p> */}
     </div>
  )
}

export default Layout





