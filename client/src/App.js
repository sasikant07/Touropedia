import React,{ useEffect } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';
import AddEditTour from './pages/addEditTour/AddEditTour';

function App() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addTour" element={<AddEditTour />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
