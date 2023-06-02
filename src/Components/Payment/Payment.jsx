import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import { createcontextstore } from "../../Context/cartcontextprovider";

export default function Payment() {
    const nav = useNavigate();
    const { cartId } = useContext(createcontextstore);
    //const {createCashOrder}=useContext(createcontextstore);
    console.log(cartId);
//createcashorder
    /*async function createCashOrder() {
        try {
            const res = await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/orders/${cartId}`, {

            "shippingAddress": {
                "details": document.querySelector('#details').value,
                "phone":document.querySelector('#phone').value,
                "city":document.querySelector('#city').value
            }

        }, { headers: { 'token': localStorage.getItem('tkn') } })

        
            console.log(res);
             nav('/allorders');
        }
        catch (error) {
            console.log(error);
        }
    }*/

    /*function createmyorder(id){
        createCashOrder(id);
        nav('/allorders');
    }*/

    async function checkout() {
        try {
            const res =await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {

                "shippingAddress": {
                    "details":document.querySelector('#details').value,
                    "phone":document.querySelector('#phone').value,
                    "city":document.querySelector('#city').value
                }
            }
                , {
                    headers: { 'token': localStorage.getItem('tkn') },
                   //params
                })

            console.log(res);    
            if (res.data.status == 'success') {
                console.log('tmm');
                window.open(res.data.session.url);
                console.log('go')
            }
        }

        catch (error) {
            console.log('err:', error)
        }
    }



    return (
        <>
            {cartId ?
                <div className="container ">
                    <h2 className="my-5">Hello User</h2>
                    <div className="div">
                        <form>
                            <label className="mb-2" htmlFor="details">address details</label>
                            <input className="form-control mb-4" id='details' type="text" placeholder="address details" />

                            <label className="mb-2" htmlFor="phone">phone</label>
                            <input className="form-control mb-4" id='phone' type="number" placeholder="phone" />

                            <label className="mb-2" htmlFor="city">city</label>
                            <input className="form-control mb-4" id='city' type="text" placeholder="city" />



                            {/*lma bdos confirm by3ml reload tlka2y f el7al */}
                            {/*<button className="btn btn-success me-2" type='button'>Create Order</button>*/}
                            <button className="btn btn-success" type='button' onClick={checkout}>Checkout</button>
                        </form>
                    </div>
                </div> : <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-secondary d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
                </div>}


        </>

    )
}