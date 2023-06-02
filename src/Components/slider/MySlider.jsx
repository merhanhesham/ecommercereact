import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function MySlider() {
    //options
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            
            <Slider {...settings}>
                <div>
                <img className="w-100" style={{'height':'400px'}} src={require('../../images/ecommerceImgs/images/slider-2.jpeg')} />
                   
                </div>
                <div>
                <img  className="w-100" style={{'height':'400px'}} src={require('../../images/ecommerceImgs/images/slider-image-1.jpeg')} />
                </div>
                <div>
                <img  className="w-100" style={{'height':'400px'}} src={require('../../images/ecommerceImgs/images/slider-image-2.jpeg')} />
                </div>
                <div>
                <img  style={{'height':'400px', 'width':'100%'}} src={require('../../images/ecommerceImgs/images/slider-image-3.jpeg')} />
                </div>
                <div>
                <img className="w-100" style={{'height':'400px'}} src={require('../../images/ecommerceImgs/images/grocery-banner-2.jpeg')} />
                </div>
                
            </Slider>
          
        </>

    )
}