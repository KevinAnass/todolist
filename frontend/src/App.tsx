import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main.page";
import Login from "./pages/Authentication/Login.page";
import SignUp from "./pages/Authentication/SignUp.page";
import ForgetPassword from "./pages/Authentication/ForgetPassword.page";
import ResetPassword from "./pages/Authentication/ResetPassword.page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign-Up" element={<SignUp />} />
        <Route path="/Forget-Password" element={<ForgetPassword />} />
        <Route path="/Reset-Password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}
