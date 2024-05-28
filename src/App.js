import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Notification from "./pages/Notification";
import AccountPage from "./pages/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<AccountPage />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
