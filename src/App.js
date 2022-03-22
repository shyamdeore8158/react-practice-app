import { React, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link  } from "react-router-dom";
import "./App.css"

import Home from "./login/Home"
import Login from "./login/Login"
import Register from "./login/Register"
import Profile from "./login/Profile"
import BoardUser from "./login/BoardUser";
import BoardModerator from "./login/BoardModerator"
import BoardAdmin from "./login/BoardAdmin"
import  { useState, useEffect } from "react";
import AuthService from "./services/auth-service";

import {StudentProvider} from "./context/StudentContext"
import Student from "./components/Student"
import StudentList from "./components/StudentList"

const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      }
    }, []);
    const logOut = () => {
      AuthService.logout();
    };
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Student
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/student"} className="nav-link">
                Student
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/studentlist"} className="nav-link">
                Student List
              </Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
          <Route exact path={"/"} element={<Home/>} />
            <Route exact path={"/home"} element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route path="/user" element={<BoardUser/>} />
            <Route path="/mod" element={<BoardModerator/>} />
            <Route path="/admin" element={<BoardAdmin/>} />
            <Route path="/student" element={
              <StudentProvider>
              <Student />
              
            </StudentProvider>
            }/>
            <Route path="/studentList" element={
              <StudentProvider>
              <StudentList />
            </StudentProvider>
            }/>
          </Routes>
        </div>
      </div>
      </Router>
    );
  };

export default App

{/* <StudentProvider>
               <Header />
               <Student />
               <StudentList />
            </StudentProvider> */}