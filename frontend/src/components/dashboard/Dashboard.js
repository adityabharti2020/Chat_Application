// import { parse } from "postcss";/
import { baseURL } from "../../api/axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Shared/Sidebar";
import Header from "../Shared/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  // const { state } = useLocation();
  // console.log(state.token);
  const [users, setUsers] = useState();
  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${baseURL}/auth`);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    auth();
    const getUsersData = async () => {
      try {
        const UserResponse = await axios.get(`${baseURL}/getAllUser`);
        // console.log(UserResponse)
        setUsers(UserResponse.data.data.getAllUserExceptCurrentUser);
        // console.log(UserResponse.data.data.getAllUserExceptCurrentUser);
        // console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersData();
  }, []);

  return (
    <div className="flex flex-row h-screen w-screen bg-neutral-100 overflow-hidden">
      <Sidebar userData={users} />
      <div className="flex-1">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
      {/* <p>Footer</p> */}
    </div>
  );
};

export default Dashboard;
