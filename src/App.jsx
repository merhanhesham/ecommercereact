import React, { useEffect, useState, useContext } from "react";
import { Navigate, Router, RouterProvider, createBrowserRouter, useNavigate,createHashRouter,HashRouter } from "react-router-dom";
import Layout from "./Components/Layoutt/Layout";
import Home from "./Components/homee/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import errimg from './images/ecommerceImgs/error.svg';
import Brands from "./Components/Brands/Brands";
import ProDetails from "./Components/ProDetails/ProDetails";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import jwtDecode from "jwt-decode";
import Profile from "./Components/Profile/Profile";
import Counterstore from "./Context/Counterstore";
import Child1context from "./Components/Child1context/Child1context";
import Child2context from "./Components/Child2context/Child2context";
import Cartcontextprovider, { createcontextstore } from "./Context/cartcontextprovider";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";



export default function App() {
  //const nav = useNavigate();
  const [currUser, setCurrUser] = useState(null);
  //const {createCashOrder,cartId}=useContext(createcontextstore);
  
  function getUserData() {

    let DataDecoded = jwtDecode(localStorage.getItem('tkn'));
    setCurrUser(DataDecoded);
   

  }
  function clearUserData() {
    localStorage.removeItem('tkn');
    setCurrUser(null);

  }
  useEffect(function () {
    
    if (localStorage.getItem('tkn') != null && currUser == null) {
      //lw elocal storage feha user a3ml decode ll data bt3to w 7otha f curruser
      getUserData();
      

    }


  }, [])

  //b3ml component(test/protected toute) gwa component

  function ProtectedRoute({ children }) {
    if (currUser == null) {
      return <>
        <Navigate to='/login' />
      </>
    }
    else {
      return <>{children}</>
    }
  }


  const router = createHashRouter([

    
    {
      path: '', element: <Layout currUser={currUser} clearUserData={clearUserData} />, children: [
        { path: 'home', element: <Cartcontextprovider > <Home /> </Cartcontextprovider> },
        { path: 'payment', element: <Cartcontextprovider ><ProtectedRoute> <Payment /></ProtectedRoute> </Cartcontextprovider> },
        { path: 'allorders', element: <Cartcontextprovider ><AllOrders currUser={currUser}/> </Cartcontextprovider>},
        { path: 'login', element: <Login getUserData={getUserData} /> },
        { path: 'register', element: <Register /> },
        { path: 'cart', element: <ProtectedRoute><Cartcontextprovider ><Cart /></Cartcontextprovider> </ProtectedRoute> },
        { path: 'brands', element: <Brands /> },
        //elreact router dom 3amla haga>> : en kda b2olo lw galak b3d prodetails haga wadene 3la prodetails
        { path: 'proDetails/:id', element: <ProtectedRoute><Cartcontextprovider> <ProDetails /></Cartcontextprovider> </ProtectedRoute> },
        { path: 'brandProducts/:id', element: <BrandProducts /> },
        { path: 'profile', element: <ProtectedRoute><Profile currUser={currUser} /></ProtectedRoute> },
        {
          path: '*', element: <div className="d-flex align-items-center justify-content-center ">
            <img src={errimg} alt="404" />
          </div>
        }
      ]
    },

  ])


  return <>

    {/*<Counterstore>
      
      <Child1context/>
      <Child2context/>

</Counterstore>*/}
 
    <RouterProvider router={router} /> {/*esm var elprop lazm ybaa zy el prop */}
   
  </>

}