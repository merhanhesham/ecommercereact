import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout({currUser, clearUserData}) {

    return (

        <div>
           
            <Navbar currUser={currUser} clearUserData={clearUserData}/>
            <Outlet />
            <footer className="mt-5 py-4">
                <div className="container">
                    <h3>Get the FreshCart App</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                    <div className="row pb-3">
                        <div className="col-md-9">
                            <input className="form-control pb-2" placeholder="Email.." />
                        </div>
                        <div className="col-md-3 ">
                            <div className="bg-success py-2 px-3 rounded text-center text-white">Share App Link</div>
                        </div>
                    </div>
                    <div className="border-top border-dark border-bottom d-flex py-3 justify-content-between">
                        <div className="d-flex mt-3">
                            <p className="font-weight-bold me-2">Payment Partners</p>
                            <i class="fa-brands fa-amazon-pay mt-2 text-success me-1"></i>
                            <i class="fa-brands fa-paypal mt-2 text-success me-1"></i>
                            <i class="fa-brands fa-cc-mastercard mt-2 text-success me-1"></i>
                        </div>
                        <div className="d-flex ">
                            <p className="font-weight-bold me-2 mt-3">Get deliveries with FreshCart</p>
                            <button type="button" className="btn btn-dark d-flex align-items-center me-3">

                                <i class="fa-brands fa-app-store me-2 fa-2x"></i>
                                <p >Available on the app store</p> {/*leh dah mgash f center? */}

                            </button>
                            <button type="button" className="btn btn-dark d-flex align-items-center">

                                <i class="fa-brands fa-google-play  me-2 fa-2x"></i>
                                <p >Get it on google play</p> {/*leh dah mgash f center? */}

                            </button>
                        </div>
                    </div>
                </div>


            </footer>
        </div>
    )
}