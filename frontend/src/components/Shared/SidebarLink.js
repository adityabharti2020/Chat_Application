import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { baseURL3 } from "../../api/axios";
import axios from "axios";

// const link = [
//   {path:'/Demo1'},
//   {path:'/Demo2'}
// ]
export const SidebarLink = ({ user, login }) => {
  const navigate = useNavigate();
  //  console.log(login)
  // const CreateChat =async () =>{
  //   try {
  //     const chat = await axios.post(`${baseURL3}/createChat`, {
  //       userId:item._id ,
  //     });
  //     console.log(chat)
  //     navigate('/dashboard/chatpannel',{ state: { chatid: chat.data.data.fullChat[0]._id } })
  //       // console.log(chat.data.data.fullChat[0]._id);

  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  return (
    <>
      <div
        key={user._id}
        onClick={() =>
          navigate("/dashboard/chatpannel", {
            state: { userId: user._id, login: login },
          })
        }
        className="flex items-center gap-2 font-light px-3 py-2 hover:bg-yellow-400 hover:text-black hover:no-underline active:bg-green-500 rounded-sm text-base  mt-0.5"
      >
        {" "}
        {/*to add multiple classes npm i classname*/}
        <img
          src='https://source.unsplash.com/60x60?face'
          key={`img${user.name}`}
          alt="profile_image"
          className="w-8 h-8 rounded-full"
        />
        <h2 className="font-bold text-xl" key={user.name}>
          {user.name}
        </h2>
      </div>
    </>
  );
};

export default SidebarLink;
