import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../images/ecommerceImgs/freshcart-logo.svg'

export default function Navbar({currUser,clearUserData}) {

  const navigate=useNavigate();
  function logoutUser(){
    clearUserData();
    navigate('/login');
  }
  return (

    <div >
      <nav class="navbar navbar-expand-lg navbar-light px-3">
        
        <Link class="navbar-brand" to="navbar">
          <div >
          <img src={logo} />
          </div>
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="home">Home <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="brands">Brands</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="cart">Cart</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="AllOrders">All Orders </Link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">

            {currUser?
            <><li class="nav-item">
              <Link class="nav-link" to="profile">Profile</Link>
            </li>
            <li class="nav-item">
              <span class="nav-link" onClick={logoutUser}>Logout</span>
            </li></>: <> <li class="nav-item active">
              <Link class="nav-link" to="login">Login <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="register">Register</Link>
            </li>
            
            
            </>}
           
            
            
          </ul>
          
        </div>
      </nav>
    </div>
  )
}