import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import imggg from '../../images/i-social.jpg'
import { Link } from "react-router-dom";
import ProDetails from "../ProDetails/ProDetails";
import Slider from "../slider/MySlider";
import MySlider from "../slider/MySlider";
import Cartcontextprovider, { createcontextstore } from "../../Context/cartcontextprovider";
import $ from 'jquery';

export default function Home() {

  //let allproducts = [];
  const [allproducts, setallproducts] = useState([]);
  async function getProducts() {
    let res = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/products', {
      params: { 'sort': 'price' }
    });
    //allproducts = res.data.data;

    setallproducts(res.data.data);
    //console.log(allproducts);
  }

  useEffect(function () {
    getProducts();

  }, []);

  

  const {addToCart} = useContext(createcontextstore);
   function addMyProduct(id){
    if( addToCart(id)){
       //console.log('added')
       //$('.addbtn').text('-',500);//ntsht8l k queryselectorall f htselect kol elakhden class addbtn w dah hytb2 3la kol
       //elfel for loop w ana 3yzah ytb2 3la el b id bs f h3ml div tzhar mara wahda feha elproduct added successfully
       //$('.addbtn').addClass('btn-danger',500);
       $('.successmsg').fadeIn(500,function(){
        setTimeout(() => {
          $('.successmsg').fadeOut(500)
        }, 2000);
       })
       //lw bsena hnla2eh 3ml select l awl element bs msht8lsh k selectorall bs meshe b nfs ellogic bta3 all
       $(`#addBtn${id}`).text('-',500); 
       $(`#addBtn${id}`).addClass('btn-danger',500);
    }
  }

  return (

    <div>
     <div style={{'display':'none','zIndex':'9999','left':'0'}} className="successmsg position-fixed alert alert-success">Added to Cart</div>
     <MySlider/>
      {allproducts.length !== 0 ?
        <div className="container my-5">
        
          <div className="row">
            {allproducts.map(function (pro, idx) {
              return <div key={idx} className="col-md-2 mb-3">
                {/*ana kda b3at el id llpath na2s ast2belo 34an eldata tt3red */}
                <Link to={`/proDetails/${pro.id}`}>
                  <img src={pro.imageCover} className="w-100 height-100" />
                
                <span className="text-success">{pro.category.name}</span>
                {/*b2olha fawety 20 character w haty awel space */}
                </Link>
                <div className="d-flex justify-content-between mb-3">
                <span><h6 className="font-weight-bold">{pro.title.slice(0, pro.title.indexOf(' ', 20))}</h6></span>
                
                <span><button id={`addBtn${pro.id}`} className="addbtn btn btn-primary" onClick={function(){
                  addMyProduct(pro.id)
                }}>+</button></span>
                {/*<span ><button style={{'display':'none'}} className="rembtn btn btn-danger">-</button></span>*/}
                
                </div>
                
                <div className="d-flex justify-content-between">
                  <span>{pro.price} </span> <span><i class="fa-solid fa-star text-warning"></i> {pro.ratingsAverage} </span>
                </div>
              </div>
            })}




        </div>
        </div> : <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-secondary d-flex align-items-center justify-content-center">
    <i class="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
  </div>
}



    </div >
  )
}