import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import axio from 'axios';
import {BrowserRouter as Router,Routes,Route, Link} from 'react-router-dom';

export default function App() {
  const Home = () => <div>홈페이지</div>
  return(
    <Router>
      <div>
        <ul>
          <li>
            <Link></Link>
          </li>
        </ul>
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/todos' element={<Todos/>} />
      </Routes>
      </div>
    </Router>
  ) 
  
}


