import { Outlet } from "react-router-dom"
import SideBar from "./components/SideBar"
import { useEffect } from "react"
import run from "./gemini"
import { useDispatch, useSelector } from "react-redux"
import { addChat } from "./store/chatSlice"


function App() {


  return (
    <>
      <div className="bg-primaryBg-default h-screen flex">
        <div className="xl:block hidden">
          <SideBar/>
        </div>
        <Outlet/>
      </div>
    </>
  )
}

export default App
