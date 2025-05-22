import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Route, Routes } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import Post from "./components/Post/Post";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Protect from "./components/HomePrivate/HomePrivate";
import UserComponent from "./pages/UserComponent/UserComponent"
import MessagesPage from "./pages/MessagePage/MessagePage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/Admin/Admin";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protect>
                <Home />
              </Protect>
            }
          />
          <Route
            path="/user/:username"
            element={
              <Protect>
                <UserComponent />
              </Protect>
            }
          />
          <Route
            path="/chat"
            element={
              <Protect>
                <MessagesPage />
              </Protect>
            }
          />
          <Route
            path="/admin"
            element={
                <Admin />

            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <Footer />
    </>
  );
}

export default App;
