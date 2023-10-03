import React from "react";
import { useState } from "react";
import { baseURL } from "../../api/axios";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import {  } from "react-router-dom";
const Verification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [Otp, setOtp] = useState();
  const [errmsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  const SubmitHandler = async (e) => {
    console.log(Otp.inputotp);
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/signUpVerification`, {
        email: state.email,
        otp: Otp,
      });
      
      setSuccess(response.data.message);
      console.log(response.data)
      if (response.data.status === "success") {
          alert(response.data.message);
        navigate("/dashboard");
      } else  if(response.data.status === "fail") {
        alert(response.data.message);
        navigate("/login");

      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("no server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing userName or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized User");
      } else {
        setErrMsg("SignUp Failed");
      }
    }
  };
  const handleSignUpChange = (e) => {
    // const { name, value } = e.target;
    setOtp(e.target.value);
  };
  return (
    <div className="flex justify-center items-center py-3 px-2 bg-slate-300">
      <form onSubmit={SubmitHandler}>
        {success}
        <input
          type="number"
          name="otp"
          className="px-2 py-1"
          placeholder="Enter OTP"
          // value={Otp.inputotp}
          onChange={handleSignUpChange}
        />
        <button
          type="submit"
          className="cursor-pointer px-2 text-gray-700 ring-2 m-5"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verification;
