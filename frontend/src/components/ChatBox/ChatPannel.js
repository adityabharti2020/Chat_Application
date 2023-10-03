import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { ChatState } from "../../context/AuthProvider";
import axios from "axios";
import { baseURL2 } from "../../api/axios";
import { baseURL3 } from "../../api/axios";

const ChatPannel = () => {
  const { user, setUser } = ChatState();
  const { state } = useLocation();
  const [message, setMessage] = useState();
  const [newMessage, setNewMessage] = useState([]);
    // console.log(state?.itemDetail);
    
  const SubmitHandlerFunction = async (event) => {
    event.preventDefault();
    // console.log('check')
    if (newMessage) {
      // console.log(newMessage)
      try {
        // const config = {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${user.token}`,
        //   },
        // };
           
        const chat = await axios.post(`${baseURL3}/createChat`, {
          userId: state?.itemDetail,
        });
        // console.log(chat.data.data.fullChat[0]._id);
        const { data } = await axios.post(`${baseURL2}/sendMessage`, {
          content: newMessage,
          chatId: chat.data.data.fullChat[0]._id,
        });
        setNewMessage('');
        // console.log()
        const getMessage = await axios.get(`${baseURL2}/allMessages/${data.chat._id}`);
        console.log(getMessage.data.getAllMsgs[0].content
          );
        setNewMessage([...newMessage,getMessage.data.getAllMsgs[0].content]);
        console.log(newMessage)

      } catch (error) {
        console.log(error)
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  return (
    <div className="flex flex-col justify-between h-screen relative">
      <div className="absolute px-5" style={{ top: "530px", right: "220px" }}>
        {message}
      </div>
      <div className="absolute  px-5" style={{ top: "570px" }}>
        <form onSubmit={SubmitHandlerFunction}>
          <input
            type="text"
            className="ring-2 py-4 px-3 focus:outline-none rounded-sm text-xl"
            style={{ width: "950px" }}
            // value={newMessage}
            onChange={typingHandler}
            placeholder="type msg"
          />
          <button type="submit" className="relative">
            {
              <AiOutlineSend className="absolute right-2 -bottom-3 text-4xl border-cyan-900" />
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPannel;
