// import "./login.css";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import AuthContext from "../../context/AuthProvider";

import { useLoginUserMutation } from "../../Query/Authentication";
import { AiFillEyeInvisible } from "react-icons/ai";
import { baseURL } from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  // const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
    signupName: "",
    signupEmail: "",
    signupPhone: "",
    signupPassword: "",
    confirmPassword: "",
    File: "",
  });
  const [errmsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [post, setpost] = useState({ login: "90", register: "450", btn: "0" });
  const switchForms = (type) => {
    if (type === "login") {
      setpost({ ...post, login: "90", register: "450", btn: "0" });
    } else {
      setpost({ ...post, login: "450", register: "90", btn: "110" });
    }
  };
  const PasswordToggle = () => {
    
  }
  const LoginSubmitHandlerFunction = async (e) => {
    e.preventDefault();
    console.log("hiii");
    try {
      const response = await axios.post(`${baseURL}/logIn`, {
        email: formData.loginEmail,
        password: formData.loginPassword,
      });
      console.log(response.data.data.token);
      const loginData = JSON.stringify(response?.data.data.user);
      localStorage.setItem("loginData", loginData);
      // console.log(response?.data)
      if (response?.data.data.user.email) {
        setSuccess(true);
        // setFormData("");



        navigate("/dashboard/chatpannel", {
          state: { token: response.data.data.token },
        });
      } else {
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
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  //  const LoginSubmitHandlerFunction = async(e) => {
  //   console.log('hii')
  //        e.preventDefault();
  //        try {
  //         const response = await loginUser({email: formData.loginEmail,password: formData.loginPassword})
  //          console.log(response)
  //        } catch (error) {
  //         console.log(error)
  //        }
  //  }
  
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const SignUpSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(baseURL)
    try {
      const response = await axios.post(`${baseURL}/signUp`, {
        name: formData.signupName,
        email: formData.signupEmail,
        phone: formData.signupPhone,
        password: formData.signupPassword,
        passwordConfirm: formData.confirmPassword,
        image: formData.File,
      });

      const signUpData = JSON.stringify(response?.data?.data?.user);
      localStorage.setItem("SignUpData", signUpData);
      if (response?.data?.data?.user.email) {
        setSuccess(true);

        navigate("/verify", {
          state: { email: response?.data?.data?.user.email },
        });
      }
      console.log(response?.data);
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
      // errRef.current.focus();
    }
  };
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container Form-background flex justify-center items-center relative h-screen">
      <section className="absolute top-4 left-30 text-2xl red">
        <p
          ref={errRef}
          className={errmsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errmsg}
        </p>
      </section>
      <div className="loginform">
        <div className="buttonbox">
          <div className="btn" id="btn" style={{ left: `${post.btn}px` }}></div>
          <button
            type="button"
            className="toogle-btns"
            onClick={() => switchForms("login")}
          >
            LogIn
          </button>
          <button
            type="button"
            className="toogle-btns"
            onClick={() => switchForms("register")}
          >
            SignUp
          </button>
        </div>
        <div className="social-icons">
          {/* <img src={fb} />
      <img src={tw} />
      <img src={gp} /> */}
        </div>
        <form
          className="login login-input-group"
          onSubmit={LoginSubmitHandlerFunction}
          style={{ left: `${post.login}px` }}
        >
          <input
            type="text"
            className="login-input-field"
            id="email"
            name="loginEmail"
            ref={userRef}
            autoComplete="on"
            value={formData.loginEmail}
            placeholder="Enter your email"
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            className="login-input-field px-5"
            id="password"
            name="loginPassword"
            value={formData.loginPassword}
            placeholder="Enter Password"
            onChange={handleLoginChange}
            required
          />
          <span className="reletive" onClick = {PasswordToggle}>
            {
              <AiFillEyeInvisible
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "180px",
                  width: "22px",
                  height: "20px",
                }}
              />
            }
          </span>

          <button type="submit" className="submit-btn pointer">
            Log In
          </button>
        </form>
        <form
          className="input-group"
          style={{ left: `${post.register}px` }}
          onSubmit={SignUpSubmitHandler}
          enctype="multipart/form-data"
        >
          <input
            type="text"
            name="signupName"
            value={formData.signupName}
            onChange={handleSignUpChange}
            className="input-field"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="signupEmail"
            value={formData.signupEmail}
            onChange={handleSignUpChange}
            className="input-field"
            placeholder="Email"
            required
          />
          <input
            type="text"
            className="input-field"
            name="signupPhone"
            value={formData.signupPhone}
            onChange={handleSignUpChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="password"
            name="signupPassword"
            value={formData.signupPassword}
            onChange={handleSignUpChange}
            className="input-field"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleSignUpChange}
            className="input-field"
            placeholder="Confirm Password"
            required
          />
          <input
            type="file"
            name="File"
            value={formData.File}
            onChange={handleSignUpChange}
            className="input-field"
            placeholder="Confirm Password"
            required
          />
          <button type="submit" className="submit-btn">
            SingUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
