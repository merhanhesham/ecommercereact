import React, { useContext, useEffect, useState } from "react";
import Cartcontextprovider from "../../Context/cartcontextprovider";
import { createcontextstore } from "../../Context/cartcontextprovider";
import { Link } from "react-router-dom";


export default function Cart() {

  const { totalCartprice, nocartItems, cartProducts, removeCartItem } = useContext(createcontextstore);

  console.log(cartProducts);
  return (
    <>

      {cartProducts.length != 0 ? <div className="container my-4">
        <h2 className="text-center">Welcome user</h2>
        <div className="div d-flex justify-content-between">
          <div className="div">
            <h3>Total Price is: {totalCartprice}</h3>
            <h4>No of cart items: {nocartItems}</h4>
          </div>
          <Link to={'/payment'}>
            <span className="text-center"><button className=" btn btn-primary">Proceed to payment</button></span>
          </Link>
        </div>

        <div className="row">
          {
            cartProducts.map(function (pro, idx) {
              return <div className="col-md-3 mb-3" key={idx}>
                <img src={pro.product.imageCover} className="w-100" />
                <span className="text-success">{pro.product.category.name}</span>
                <span><h6 className="font-weight-bold">{pro.product.title.slice(0, pro.product.title.indexOf(' ', 20))}</h6></span>
                <div className="d-flex justify-content-between">
                  <span>{pro.price} L.E </span> <span><i class="fa-solid fa-star text-warning"></i> {pro.ratingsAverage} </span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                <span>count: {pro.count} </span>
                <button className="rembtn btn btn-danger" onClick={function(){
                  removeCartItem(pro.product.id)
                }}>-</button>
                </div>
                
              </div>
              
            })

          }

        </div>

      </div> : <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-secondary d-flex align-items-center justify-content-center">
        <i class="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
      </div>}

    </>

  )
}