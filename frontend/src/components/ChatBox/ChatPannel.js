import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { ChatState } from "../../context/AuthProvider";
import axios from "axios";
import { baseURL2 } from "../../api/axios";
import { baseURL3 } from "../../api/axios";

const ENDPOINT = "http://localhost:3000";
var socket, selectedChatComplete;

const ChatPannel = () => {
  const { user, setUser } = ChatState();
  const { state } = useLocation();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();
  console.log(state?.itemDetail);

  const SubmitHandlerFunction = async (event) => {
    event.preventDefault();

    if (newMessage) {
      try {
        const chat = await axios.post(`${baseURL3}/createChat`, {
          userId: state?.itemDetail,
        });
        console.log(chat.data.data.fullChat[0]._id);
        const { data } = await axios.post(`${baseURL2}/sendMessage`, {
          content: newMessage,
          chatId: chat.data.data.fullChat[0]._id,
        });
        setNewMessage("");

        const getMessage = await axios.get(
          `${baseURL2}/allMessages/${data.chat._id}`
        );
        console.log(getMessage);
        setMessage([...message, getMessage.data.getAllMsgs[0].content]);
        console.log(newMessage);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  return (
    <div className="flex flex-col justify-between h-screen relative">
      <div
        className="absolute px-5 flex-col "
        style={{ top: "330px", right: "220px", height: "200" }}
      >
        {message.map((msg) => (
          <p className="mt-1">{msg}</p>
        ))}
      </div>
      <div className="absolute  px-5" style={{ top: "570px" }}>
        <form onSubmit={SubmitHandlerFunction}>
          <input
            type="text"
            className="ring-2 py-4 px-3 focus:outline-none rounded-sm text-xl"
            style={{ width: "950px" }}
            value={newMessage}
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
