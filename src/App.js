import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EditProfile from "./pages/EditProfile";
import Notification from "./pages/Notification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
