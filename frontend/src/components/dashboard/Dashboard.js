import { parse } from "postcss";
import React from "react";
const Dashboard = (props) => {
  const LogOutHandler = () => {
    const getSignUpData = JSON.parse(localStorage.getItem("SignUpData"));
    console.log(getSignUpData);

    props.onLogout(false);
  };
  return (
    <div className="flex justify-center items-center bg-blue-950 min-h-screen">
      <div class="flex w- bg-white">
        <div class="w-full bg-gray-500 h-12"></div>
      </div>
      <h2>hello</h2>
      <button className="bg-red-400 py-1 px-3 " onClick={LogOutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
