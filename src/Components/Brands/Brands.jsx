import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";




export default function Brands() {

    const [allbrands, setbrands] = useState([])
    async function getBrands() {
        let res = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/brands');
        let finalres = res.data.data;
        console.log(finalres);
        setbrands(finalres);
    }


    useEffect(function () {
        getBrands();
    }, [])

    return (

        <div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-3 d-flex align-items-center justify-content-center">
                        
                        <div className="text-center ">
                        <h3 className="text-primary">Our Brands</h3>
                        <p>you can see our brands and each brand includes the products in it</p>
                        </div>
                        
                    </div>

                    {allbrands.length!==0?
                    allbrands.map(function (brand,idx) {
                        return <div key={idx} className="col-md-3">
                            <Link to={`/brandProducts/${brand._id}`}>
                            <img src={brand.image}  className="w-100"/>
                            <h4 className="text-center text-primary">{brand.name}</h4>
                            </Link>
                        </div>
                        
                    }):<div className="position-fixed top-0 start-0 end-0 bottom-0 bg-secondary d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
                  </div>}

                </div>
            </div>
        </div>
    )
}