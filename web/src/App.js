import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MapScreen from "./pages/MapScreen";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Signup from "./pages/Signup";
import AreaScreen from "./pages/AreaScreen";
import AreaList from "./pages/AreaList";
import "./styles/style.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MapScreen />} />
          <Route path="/profile" element={<Profile />} />
          {
          //<Route path="/chat" element={<Chat />} />
          }
          <Route path="/register" element={<Register />} />
          <Route path="/log" element={<Signup />} />
          <Route path="/area" element={<AreaScreen />} />
          <Route path="/list" element={<AreaList />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
