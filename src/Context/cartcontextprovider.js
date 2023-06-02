import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
export const createcontextstore = createContext();


export default function Cartcontextprovider({ children }) {

    const nav = useNavigate();
    //hkteb eldata to be shared elhya func add product to cart
    //function addtocart
    //taleb ab3at headers w body
    async function addToCart(prodetailsId) {

        
        //h use try catch 34an lw 7sl error mmkn ybaa mn 2 cases>> lw b3t id product 8lt/ mfesh f localstorage
        try {
            const res = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart', {
                //elmfrod ykon el id dynamic msh static w hst2belo mn prodetails comp
                //tany parameter ll body elb3do ll headers
                //lazm esm elproperty tbaa hya hya bzbt
                'productId': prodetailsId
            },
                //elparameter eltalt 3bara 3n config >> headers or params
                //b7ot felheaders object 34an mmkn ybaa feh aktr mn key w value, lw fta7na postman hnla2y aktr mn haga
                { headers: { 'token': localStorage.getItem('tkn') } }

            )
            //console.log(res.data.status);
            if (res.data.status == 'success') { return true; }
            else { return false; }

        } catch (error) {
            console.log(' error: ', error)
        }
    }

    //h3mlha hena 34an mmkn ast5dmha f aktr mn mkan
    //get logged user cart api
    //eldata lazm tbaa f state 34an a3rf ashyrha
    const [nocartItems, setnocartItems] = useState(0);
    const [totalCartprice, setTotalCartprice] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartId, setCartId] = useState();
    
    async function getCartProducts() {

        try {
            const res = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/cart', {
                headers: { 'token': localStorage.getItem('tkn') }
            })


            console.log(res)
            setnocartItems(res.data.numOfCartItems);
            setTotalCartprice(res.data.data.totalCartPrice);
            setCartProducts(res.data.data.products);
            setCartId(res.data.data._id)


        }

        catch (error) {
            console.log("home error",error)
            if(error.response.status==404)
            $('.nocart').fadeIn(500,function(){
                setTimeout(() => {
                    $('.nocart').fadeOut(500)
                    nav('/home');
                  
                }, 2000);
            })
            //return false;

        }

    }


    useEffect(function () {
        getCartProducts();
    }, [])

    async function removeCartItem(proId) {
        try {
            const res = await axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart/${proId}`, {
                headers: { 'token': localStorage.getItem('tkn') }
            })
            console.log(res);
            if (res.status == 'success') {
                setnocartItems(res.data.numOfCartItems);
                setTotalCartprice(res.data.data.totalCartPrice);
                setCartProducts(res.data.data.products);
                console.log('done');
                return true;
            }


        } catch (error) {
            console.log('error:', error)

        }
    }

    async function createCashOrder(cartId) {
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
            console.log("orders error",error);
        }
    }


    return (
        //kda b2et shared 3la el children
        < createcontextstore.Provider value={{ addToCart, nocartItems, totalCartprice, cartProducts, removeCartItem,cartId, createCashOrder }}>
            <div style={{ 'display': 'none' }} className="nocart alert alert-danger">No cart exits</div>
            {children}

        </createcontextstore.Provider>

    )
}