import React from "react";
import Logo from "../../assets/logo-removebg-preview.png";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Home = () => {
//   const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen flex-col radial-blue">
      <div className="flex flex-col justify-center items-center border-solid border-3 rounded border-sky-500 radial-green relative">
        <img src={Logo} alt="Chat-logo" className="self-start" />
        <p className="-mt-14">To connect with your audience...</p>
        <Link to="/login" className="mb-20">
          <button
            className="rounded-full bg-sky-600 py-1 px-4 text-white mt-5"
          >
            Start Chating
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
