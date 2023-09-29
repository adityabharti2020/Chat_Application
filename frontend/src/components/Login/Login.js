import React, { useRef, useState, useEffect, useContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { baseURL } from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
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
  });
  const [errmsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  // useRef.current.focus();
  // console.log(formData);
  // }, [formData]);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, password]);

  const [post, setpost] = useState({ login: "90", register: "450", btn: "0" });
  const switchForms = (type) => {
    if (type === "login") {
      setpost({ ...post, login: "90", register: "450", btn: "0" });
    } else {
      setpost({ ...post, login: "450", register: "90", btn: "110" });
    }
  };
  const LoginSubmitHandlerFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/logIn`, {
        email: formData.loginEmail,
        password: formData.loginPassword,
      });
      console.log(response?.data?.data?.user);
      const loginData = JSON.stringify(response?.data.data.user);
      localStorage.setItem("loginData", loginData);
      if (response?.data.data.user.email) {
        setSuccess(true);
        setFormData("");

        navigate("/dashboard");
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
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const SignUpSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/signUp`, {
        name: formData.signupName,
        email: formData.signupEmail,
        phone: formData.signupPhone,
        password: formData.signupPassword,
        passwordConfirm: formData.confirmPassword,
      });

      const signUpData = JSON.stringify(response?.data?.data?.user);
      localStorage.setItem("SignUpData", signUpData);
      if (response?.data?.data?.user.email) {
        setSuccess(true);

        navigate("/dashboard");
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
      errRef.current.focus();
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
    <div className="container Form-background flex justify-center items-center relative">
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
          className="login input-group"
          onSubmit={LoginSubmitHandlerFunction}
          style={{ left: `${post.login}px` }}
        >
          <input
            type="text"
            className="input-field"
            id="email"
            name="loginEmail"
            ref={userRef}
            autoComplete="on"
            value={formData.loginEmail}
            placeholder="enter your email"
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            className="input-field"
            id="password"
            name="loginPassword"
            value={formData.loginPassword}
            placeholder="Enter Password"
            onChange={handleLoginChange}
            required
          />

          <button type="submit" className="submit-btn pointer">
            Log In
          </button>
        </form>
        <form
          className="input-group"
          style={{ left: `${post.register}px` }}
          onSubmit={SignUpSubmitHandler}
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
            placeholder="Password"
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