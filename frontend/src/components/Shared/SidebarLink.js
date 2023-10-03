import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// const link = [
//   {path:'/Demo1'},
//   {path:'/Demo2'}
// ]
const SidebarLink = ({item}) => {
  // console.log(item)
  const navigate = useNavigate();
  
  return (
    <>
    <p onClick={()=>navigate('/dashboard/chatpannel',{ state: { itemDetail: item._id } })} className='flex items-center gap-2 font-light px-3 py-2 hover:bg-slate-50 hover:text-cyan-950 hover:no-underline active:bg-slate-100 rounded-sm text-base  mt-0.5'>   {/*to add multiple classes npm i classname*/}
        <img src={item.image} className='w-8 h-8 rounded-full'/>
        <h2 className="font-bold text-2xl">{item.name}</h2>
        {/* <span className="font-bold">{item.name}</span> */}
        
        </p>
        </>
  )
}

export default SidebarLink