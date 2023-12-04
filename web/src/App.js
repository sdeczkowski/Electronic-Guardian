import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MapScreen from "./pages/MapScreen";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AreaScreen from "./pages/AreaScreen";
import AreaList from "./pages/AreaList";
import "./styles/style.css";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {token && <Route path="/" element={<MapScreen />} />}
        {token &&<Route path="/profile" element={<Profile />} />}
        {token &&<Route path="/area" element={<AreaScreen />} />}
        {token &&<Route path="/list" element={<AreaList />} />}
        {token &&<Route path="/chat" element={<Chat />} />}
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
