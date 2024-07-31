import PropTypes from "prop-types"
import React from 'react'
import PlusIcon from "../assets/plusIcon.png"
import ChatIcon from "../assets/chat.png"
import TrashIcon from "../assets/remove.png"
import MenuIcon from "../assets/menu.png"
import { useDispatch, useSelector } from "react-redux"
import { addChat, RemoveChat } from "../store/chatSlice"
import { Link, useNavigate } from "react-router-dom"

const SideBar = ({onToggle}) => {
    const dispatch = useDispatch()
    const {data} = useSelector((state) => state.chat)
    const navigate = useNavigate();

    const handleNewChat = ()=>{
        dispatch(addChat())
    };

    const handleRemoveChat = (id)=>{
        dispatch(RemoveChat(id))
        navigate('/')
    };

  return (
    <div className='bg-primaryBg-sideBar w-[280px] h-screen text-white p-8'>
        <button className='flex ml-auto xl:hidden' onClick={onToggle}>
            <img src={MenuIcon} alt='menu icon' className='w-10 h-10'/>
        </button>
        <div className='mt-20'>
            
            <button className='px-6 py-2 flex items-center space-x-4 bg-gray-600 mb-10' onClick={handleNewChat}>
                <img src={PlusIcon} alt='plus icon' className='w-4 h-4'/>
                <p>New Conversation</p>
            </button>

            <div className='space-y-4'>
                <p>Recently</p>
                <div className='flex flex-col space-y-6'>

                {data.map((chat) =>(
                    <Link  to={`/chat/${chat.id}`} className='flex items-center justify-between p-4 bg-gray-800' key={chat?.id}>
                            <div className='flex items-center space-x-4'>
                                <img src={ChatIcon} alt='chat icon' className='w-8 h-8'/>
                                <p>{chat.title}</p>
                            </div>
                            <button onClick={(e) => {
                                e.preventDefault();
                                handleRemoveChat(chat.id);
                            }}>
                                <img src={TrashIcon} alt='trash icon' className='w-6 h-6'/>
                            </button>
                    </Link>
                ))}

                </div>
            </div>

        </div>
    </div>
  )
}

SideBar.propTypes = {
    ontoggle: PropTypes.func
}

export default SideBar