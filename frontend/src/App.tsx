import { Route, Routes, useLocation } from "react-router-dom"
import Tasks from "./pages/Tasks.tsx"
import  Navbar  from "./components/Navbar.tsx"
import  Home from "./components/Home.tsx"
import Register from "./pages/Register.tsx"
import Login from "./pages/Login.tsx"

const App = () => {
  const location=useLocation();
  const hiddenavbar=["/register","/login"].includes(
    location.pathname
  )
  return (
    <div>
      {!hiddenavbar &&<Navbar/>}
      <Routes>
        <Route path="/task" element={<Tasks/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </div>
  )
}

export default App
