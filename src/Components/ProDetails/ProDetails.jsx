import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { createcontextstore } from "../../Context/cartcontextprovider";
import $ from 'jquery';

export default function ProDetails() {
    //use params dah hook byrga3 object feh elparams elana b3tha m3 elpath
    const data = useParams();
    console.log(data);

    const [productobj, setProduct] = useState(null);
    async function getProductDetails() {
        let res = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products/${data.id}`);
        console.log(res.data.data);
        setProduct(res.data.data);
    }

    useEffect(function () {
        getProductDetails();
    }, [])


    // const shareddata= useContext(createcontextstore);
    // aadr a destruct 3ltol
    const { addToCart, removeCartItem } = useContext(createcontextstore);
    //console.log(addToCart)
    //dlwate lw kont edet el id k (productobj.id) f addtocart mmkn ykon lsa mgash f b3to k id w ast2blo ta7t
    function addMyproduct(id) {
        if (addToCart(id)) {
            $('.successmsg').fadeIn(1000, function () {
                setTimeout(() => {
                    $('.successmsg').fadeOut(500);
                    $('.remBtn').fadeIn(500)
                    $('.addBtn').fadeOut(500)
                }, 1000)
            });
        }

    }

    async function removeMyproduct(id) {
        if (await removeCartItem(id)) {
            $('.deletedmsg').fadeIn(1000, function () {
                setTimeout(() => {
                    $('.deletedmsg').fadeOut(500);
                    $('.remBtn').fadeOut(500)
                    $('.addBtn').fadeIn(500)
                }, 1000);
            })
        }

    }







    return (

        <div>
            {productobj ?
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="div d-flex justify-content-center align-items-center">
                                <img src={productobj.imageCover} className="w-100 " />
                            </div>
                        </div>
                        <div className="col-md-8 d-flex align-items-center justify-content-center">
                            <div>
                                <h2>{productobj.title}</h2>
                                <p>{productobj.description}</p>
                                <h4>price: {productobj.price}</h4>
                                <h4>quantity: {productobj.quantity}</h4>
                                <h4>rate: {productobj.ratingsAverage}</h4>

                                <button className="btn btn-success w-100 addBtn" onClick={function () {
                                    addMyproduct(productobj.id)
                                }}>Add product to cart +</button>
                                <button style={{ 'display': 'none' }} className="btn btn-danger w-100 mb-2 remBtn" onClick={function () {
                                    removeMyproduct(productobj.id);
                                }} >Remove from cart -</button>
                                <div style={{ 'display': 'none' }} className="successmsg alert alert-success text-center">Product added</div>
                                <div style={{ 'display': 'none' }} className="deletedmsg alert alert-danger text-center">Product removed</div>
                            </div>
                        </div>
                    </div>
                </div> : <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-secondary d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
                </div>}

        </div>
    )
}