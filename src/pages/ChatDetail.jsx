import React, { useEffect, useState } from 'react'
import ImgTemp from "../assets/temp.jpeg"
import MenuIcon from "../assets/menu.png"
import SideBar from '../components/SideBar';
import StarIcon from "../assets/star.png"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import run from "../gemini"
import { useDispatch, useSelector } from 'react-redux';
import { addChat, addMsg, setNameChat } from '../store/chatSlice';

const ChatDetail = () => {
    const navigate = useNavigate();
    const [menuToggle, setMenuToggle] = useState(false);

    // save messages which has been declared in src/store/chatSlice/index.js
    const [dataDetail, setDataDetail] = useState([]);  
    const [messageDetail, setMessageDetail] = useState([]);
    const [inputChat, setInputChat] = useState("");

    const{id} = useParams();
    const {data} = useSelector((state) => state.chat)
    const dispatch = useDispatch();

    const handleNewChat = ()=>{
        dispatch(addChat());
    };
    
    useEffect(()=>{
        if(data.length > 0){
            const chat = data.find((chat) => chat.id === id)
            if(chat){
                setDataDetail(chat)
                setMessageDetail(chat.messages)
            }
        } 

    }, [data, id] )  // data or id change => run the method inside useEffect 


    const handleChatDetail = async () => {
        if(id){
            const chatText = await run(inputChat, messageDetail) 
            if(dataDetail.title === "Chat"){
                const promptName = `This is a new chat, and user ask about ${inputChat}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
                const newTitle = await run(promptName)
                dispatch(setNameChat({newTitle: newTitle, chatId: id}))
            }
            if(chatText){
                const dataMessage = {
                    idChat: id,
                    userMessage: inputChat,
                    botMessage: chatText
                }
                dispatch(addMsg(dataMessage))
                setInputChat("");
            }
        }
    }

  return (
    <div className='text-white xl:w-[80%] w-full relative'>
        <div className='flex items-center space-x-2 p-4 '>
            <button onClick={() => setMenuToggle(!menuToggle)}>
                <img src={MenuIcon} alt='menu icon' className='w-8 h-8 xl:hidden'/>
            </button>
            <h1 className='text-xl uppercase font-bold p-4'>gemini</h1>
        </div>
        { menuToggle && (
            <div className='absolute h-full top-0 lef-0 xl:hidden'>
                <SideBar onToggle={() => setMenuToggle(!menuToggle)}/>
            </div>
        )}

        <div className='max-w-[90%] w-full mx-auto mt-20 space-y-10'>
            
            {id ?  ( <div className='flex flex-col space-y-4 p-4 h-[400px] overflow-x-hidden overflow-y-auto'>
                {Array.isArray(messageDetail) && messageDetail.map((item) =>(
                    <div className='flex space-y-6 flex-col' key={item.id}>
                        <div className='flex space-x-6 items-baseline'>
                            {item.isBot ? 
                                <>
                                    <img src={StarIcon} alt='star icon' className='w-8 h-8'/> 
                                    <p dangerouslySetInnerHTML={{__html: item.text}}/>
                                </>
                                : <>
                                    <p>User</p>
                                    <p>{item.text}</p>
                                </>
                            }
                            
                        </div>
                    </div>
                ))}

                    </div> ) : ( 
        
                <div className='flex flex-col space-y-5'>
                
                    <div className='space-y-1'>
                        <h2 className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-[35px] inline-block text-transparent bg-clip-text  font-bold'>Hello</h2>
                        <p className='text-3xl'>How can I help you today?</p>
                    </div>
                    
                    <div className='flex items-center space-x-3'>
                        <div className='w-[200px] h-[200px] bg-primaryBg-sideBar flex items-center justify-center rounded-lg'>
                            <p>Meal Planning</p>
                        </div>

                        <div className='w-[200px] h-[200px] bg-primaryBg-sideBar flex items-center justify-center rounded-lg'>
                            <p>New language cluster</p>
                        </div>

                        <div className='w-[200px] h-[200px] bg-primaryBg-sideBar flex items-center justify-center rounded-lg'>
                            <p>Tips for writing a cover letter</p>
                        </div>

                        <div className='w-[200px] h-[200px] bg-primaryBg-sideBar flex flex-col items-center justify-center rounded-lg'>
                            <p>Generate Image With AI</p>
                            <img src={ImgTemp} alt='Temp Image' className='w-[150px] h-[150px]'/>
                        </div>
                    </div>

                </div>
            )}

            {id ? (<div className='flex items-center space-x-4'>
                <input type='text' placeholder='Enter The Input Here' className='p-4 rounded-lg bg-primaryBg-default w-[90%] border' onChange={(e) => setInputChat(e.target.value)} value={inputChat}/>
                <button className='p-4 rounded-lg bg-green-500' onClick={handleChatDetail}>Submit</button>
            </div>
            
            ) : (
                
                <div className='flex items-center space-x-4'>
                <input type='text' placeholder='Enter The Input Here' className='p-4 rounded-lg bg-primaryBg-default w-[90%] border' onChange={(e) => setInputChat(e.target.value)} value={inputChat}/>
                <button className='p-4 rounded-lg bg-green-500' onClick={handleNewChat}>Submit</button>
                </div>
            )}


        </div>

    </div>
  )
}

export default ChatDetail