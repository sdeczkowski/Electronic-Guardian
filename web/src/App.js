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
import { FallingLines } from "react-loader-spinner";
import { useJsApiLoader } from "@react-google-maps/api";

function App() {
  const googleMapsApiKey = "AIzaSyBO9ngwlK0mOR2jLp4kJk-2FxRC7ncM0oo";
  const token = localStorage.getItem("token");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    id: "script-loader",
    libraries: ["places"],
    language: "en",
    region: "us",
  });

  if (!isLoaded) {
    return (
      <div style={{ flex: 1, justifyContent: "center" }}>
        <FallingLines color="deepskyblue" width="100" visible={true} ariaLabel="falling-lines-loading" />
      </div>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          {token && <Route path="/" element={<MapScreen />} />}
          {token && <Route path="/profile" element={<Profile />} />}
          {token && <Route path="/area" element={<AreaScreen />} />}
          {token && <Route path="/list" element={<AreaList />} />}
          {token && <Route path="/chat" element={<Chat />} />}

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
