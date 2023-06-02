import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";



export default function BrandProducts() {
    //use params dah hook byrga3 object feh elparams elana b3tha m3 elpath

    const parameter=useParams();
    const [brandproducts, setbrandproducts] = useState([])
    async function getBrandProducts() {
        let res = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/products',{
            params:{'brand':`${parameter.id}`}
        });
        console.log(res.data.data);
        setbrandproducts(res.data.data);
       
    }

    useEffect(function () {
        getBrandProducts();
    }, [])


    return (
        <div>
            
            <div className="container my-5">
            <div className="row">
                {brandproducts ?
                  
                    brandproducts.map(function (brandpro) {
                        return <div className="col-md-4 mb-3">
                            <Link to={`/proDetails/${brandpro._id}`}>
                            <img src={brandpro.imageCover} className="w-100 height-100" />
                            <span className="text-success">{brandpro.category.name}</span>
                            <h6 className="font-weight-bold">{brandpro.title.slice(0, brandpro.title.indexOf(' ', 20))}</h6>
                            
                            <div className="d-flex justify-content-between">
                                <span>{brandpro.price} </span> <span><i class="fa-solid fa-star text-warning"></i> {brandpro.ratingsAverage} </span>
                            </div>
                            </Link>
                        </div>
                    }) : <div className="position-fixed top-0 start-0 end-0 bottom-0 bg-secondary d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
                </div>}

               

            </div>
        </div>
            
        </div>

    )
}