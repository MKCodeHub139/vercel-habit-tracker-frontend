import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Nav from './components/Header/Nav'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    <div className="main bg-[#FFFFFF] text-[#212121] min-h-screen">
    <Nav/>
      <Outlet/>
    <Footer/>
    </div>
    </>
  )
}

export default App
