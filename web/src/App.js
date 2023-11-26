import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navi from "./components/Navi";
import MapScreen from "./pages/MapScreen";
import "./styles/style.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navi />
        <div className="app">
        <Routes>
          {
            //user && <Route path="/" exact element={<Homepage />} />
          }
          {
            //user && <Route path="/Todopage" exact element={<Todo />} />
          }

          <Route path="/" element={<MapScreen />} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
