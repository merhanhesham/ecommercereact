import React, { useContext, useEffect, useState } from "react";
import { counterstorecontext } from "../../Context/Counterstore";
import axios from 'axios';
import { createcontextstore } from "../../Context/cartcontextprovider";
import { useNavigate } from "react-router-dom";

export default function AllOrders({ currUser}) {

    const nav=useNavigate();
    const { createCashOrder, cartId } = useContext(createcontextstore);
    //const idd=values.cartId;
    
    const [orders, setorders] = useState([]);
    async function getAllOrders() {

        try {

            const res = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/orders/user/${currUser.id}`);
            console.log(res.data);
            setorders(res.data)
            //console.log(currUser.id)
        }
        catch (error) {
            console.log("orders error",error)
        }
    }

    function createmyorder(id){
        createCashOrder(id);
      
    }

    useEffect(function () {
        createmyorder(cartId);
        getAllOrders();
        
    }, [])

    return (
        <>


            <div className="container ">

                <h2 className="my-5 " >Your Orders</h2>

                <div className="row ">
                    {orders.length !== 0 ?

                        orders.map(function (order, idx) {

                            return <div className="col-md-5 bg-light allorderdiv ">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Total order price: {order.totalOrderPrice}</h6>
                                        <h6>payment Method Type: {order.paymentMethodType}</h6>
                                        <h6>shipping Price: {order.shippingPrice}</h6>

                                    </div>
                                    <div className="col-md-6">
                                        <h6>shipping Address: {order.shippingAddress.details}</h6>
                                        <h6>Phone: {order.shippingAddress.phone}</h6>
                                        <h6>City: {order.shippingAddress.city}</h6>
                                    </div>
                                </div>


                                <div className="div orderItems">
                                    <h3 className="my-3">Order items:</h3>
                                    <div className="row">

                                        {order.cartItems.map(function (item, idx) {

                                            return <div className="col-md-4"><img src={item.product.imageCover} className="w-100" /> </div>
                                        })}

                                    </div>
                                </div>
                            </div>
                        })
                        : <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-secondary d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
                        </div>}




                </div>
            </div>




        </>

    )




}