import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { baseURL3 } from "../../api/axios";
import axios from 'axios';

// const link = [
//   {path:'/Demo1'},
//   {path:'/Demo2'}
// ]
const SidebarLink = ({item}) => {
  // console.log(item._id)
  const navigate = useNavigate();
  const CreateChat =async () =>{
    try {
      const chat = await axios.post(`${baseURL3}/createChat`, {
        userId:item._id ,
      });
      console.log(chat)
      navigate('/dashboard/chatpannel',{ state: { chatid: chat.data.data.fullChat[0]._id } })
        // console.log(chat.data.data.fullChat[0]._id);

    } catch (error) {
      console.log(error)
    }

  }
  
  return (
    <>
    <p onClick={CreateChat} className='flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-50 hover:text-cyan-950 hover:no-underline active:bg-slate-100 rounded-sm text-base  mt-0.5'>   {/*to add multiple classes npm i classname*/}
        <img src={item.image} className='w-8 h-8 rounded-full'/>
        <h2 className="font-bold text-xl">{item.name}</h2>
        {/* <span className="font-bold">{item.name}</span> */}
        
        </p>
        </>
  )
}

export default SidebarLink