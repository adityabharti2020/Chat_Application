import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { ChatState } from "../../context/AuthProvider";
import axios from "axios";
import { baseURL3 } from "../../api/axios";
import { isSameSender } from "./ChatLogics";
import { isLastMessage } from "./ChatLogics";
import { isSameSenderMargin } from "./ChatLogics";
import { DateTimeFormater } from  "./ChatLogics"
import BasicModal from '../Basicmodel/BasicModal'
// import {bgImage} from '../../assets/91e72f56e9dab16bd62a21a7c6b01d84-removebg-preview.png'

const ENDPOINT = "http://localhost:3000";
var socket, selectedChatComplete;

// const getChatId = JSON.parse(localStorage.getItem("chatid"));
const ChatPannel = () => {
  const { state } = useLocation();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // console.log(state.userId);
  const getAllMessage = async () => {
    // console.log("inside");
    try {
      const response = await axios.get(
        `${baseURL3}/getOneChat/${state.userId}`
      );
      // console.log(response.data.getChat.chats);
      setMessage(response?.data.getChat.chats);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (state.userId) {
      getAllMessage();
      // console.log({ state });
    }
    return () => {};
  }, [state?.userId]);
  // console.log(message);
  // useEffect(() => {
  //   const fetchMessagesAndSetState = async () => {
  //    if(state){
  //     setChatid(state.userId)
  //     try {
  //       const fetchedMessages = await getAllMessage(Chatid);

  //       // setMessages(fetchedMessages);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //    }
  //   };
  //   fetchMessagesAndSetState();
  //   return () => {};
  // }, [setChatid,]);
  // console.log(message);

  const SubmitHandlerFunction = async (event) => {
    event.preventDefault();
    // setMessage([...message, newMessage]);
    if (newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(`${baseURL3}/createChat`, {
          userId: state.userId,
          chatMsg: newMessage,
        });
        // fetchMessagesAndSetState()
        // console.log(data)
        getAllMessage();
        // const chat_id = JSON.stringify(data.newChatMsg._id);
        // localStorage.setItem("chatid", chat_id);
        // console.log(data.newChatMsg._id)
        // getAllMessage(data.newChatMsg._id);
        // window.location.reload()
      } catch (error) {
        console.log(error);
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  // useEffect(() => {
  //   if (condition) {

  //     getAllMessage()
  //   }
  // }, [])

  // console.log(message);
  return (
    <div className="">
      {state.userId ? (
        <div className=" bg-slate-400 h-[642px] flex flex-col  px-2 py-2">
          <div className="bg-slate-100 w-[1180px]  flex flex-col rounded">
            <div
              className="flex pb-5 flex-row justify-between h-[550px] bg-black overflow-y-scroll px-5 py-5 mb-2"
              style={{ scrollbarWidth: "none" }}
            >
              <div className=" flex flex-col">
                {message &&
                  message?.map((m, i) => {
                    return (
                      <div className=" flex flex-row">
                        {
                          <p
                            className="px-4  my-2 py-2 rounded flex-col"
                            style={{
                              backgroundColor: `${
                                m.sender === state.login?.user._id
                                  ? "#BEE3F8"
                                  : "#BEEF88"
                              }`,
                              borderRadius: "20px",
                              maxWidth: "15%",
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: `${
                                m.sender === state.login?.user._id
                                  ? "950px"
                                  : "0px"
                              }`,
                            }}
                          >
                            {m.chatMsg}
                            <p className="bg-red  text-black text-[10px] my-1 underline underline-offset-[3px] decoration-[1px]">{DateTimeFormater(m.msgTime)}</p>
                          </p>
                        }
                        {
                          
                        }
                      </div>
                    );
                  })}
              </div>
              {/* {(isSameSender(message, m, i, state.login?.user._id) ||
                        isLastMessage(message, i, state.login?.user._id)) && (
                        <p
                          className="px-4 mx-2 my-2 py-1 rounded"
                          style={{
                            backgroundColor: `${
                              m.sender === state.login?.user._id
                                ? "#BEE3F8"
                                : "yellow"
                            }`,
                            borderRadius: "20px",
                            maxWidth: "15%",
                            display: "flex",
                            display: "block",
                            flexDirection: "column",
                            marginLeft: isSameSenderMargin(
                              message,
                              m,
                              i,
                              state.login?.user._id
                            ),
                          }}
                        >
                          {m.chatMsg}
                        </p>
                      )} */}
            </div>
          </div>
          <div
            className="bg-slate-900 w-[1180px] h-[80px] rounded mt-[6px] flex items-center px-5 flex-row"
            // style={{ top: "590px", width: "1280px", left: "410px" }}
          >
            <form
              className="w-full min-w-sm max-w-xl sm:w-1/5 md:w-1/3 lg:w-1/2"
              onSubmit={SubmitHandlerFunction}
            >
              <input
                type="text"
                className="focus:outline-none py-4 px-3 border-none text-white text-xl bg-transparent w-full"
                key="msg"
                value={newMessage}
                onChange={typingHandler}
                placeholder="type msg"
              />
              <button type="submit" className="relative">
                {
                  <AiOutlineSend className="absolute right-2 -bottom-3 text-4xl text-white" />
                }
              </button>
            </form>
            <div ><BasicModal userdata= {state}/></div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="bg-slate-500 text-2xl text-white rounded px-3 py-2 ">
            Welcome back !
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatPannel;
