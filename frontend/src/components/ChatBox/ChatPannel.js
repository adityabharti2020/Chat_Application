import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { ChatState } from "../../context/AuthProvider";
import axios from "axios";
import { baseURL3 } from "../../api/axios";

const ChatPannel = () => {
  // const { user, setUser } = ChatState();
  const { state } = useLocation();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [sendchatId, setsendchatId] = useState();
 
   console.log(state.chatid)
  const getAllMessage = async(id) => {
    setsendchatId(id)
    try {
      const getMessage = await axios.get(
        `${baseURL3}/getOneChat/${id}`
      );
      console.log(getMessage.data
        );
      setMessage([...message, getMessage.data.getAllMsgs[0].content]);
    } catch (error) {
      console.log(error)
    }
   
   

  }

  useEffect(() => {
    if(state){

      getAllMessage(state.chatid);
    }
  },)
  // getAllMessage();

  const SubmitHandlerFunction = async (event) => {
    event.preventDefault();
    if (newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(`${baseURL3}/createChat`, {
          content: newMessage,
          chatId: sendchatId,
        });
        setsendchatId("")
        
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
      {state.chatid ? (<div
          className="absolute overflow-y-scroll  flex flex-col"
          style={{ top: "30px", right: "220px",height:"540px" }}
        >
      {message.map((msg) => (
      
         <p className="my-1">{msg}</p>

      ))}
        </div>) : <p>user not available</p>}
       

      <div className="absolute px-5 " style={{ top: "570px", width: "1280px" }}>
        <form
          
          className="w-full min-w-sm max-w-xl sm:w-1/5 md:w-1/3 lg:w-1/2"
        >
          <input
            type="text"
            className="ring-2 py-4 px-3 focus:outline-none rounded-sm text-xl w-full"
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
