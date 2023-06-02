import React, { useContext, useEffect, useState } from "react";
import { counterstorecontext } from "../../Context/Counterstore";
import Child22 from './../Child22/Child22';



export default function Child2context() {
    //component to wrap inside it the other components
    const data = useContext(counterstorecontext);
    return (
        <>
        
            <div className="bg-secondary">
                <h2 >child2 {data.counter} </h2>
                <button className="btn btn-primary" onClick={data.updbutton}>+</button>
               
            </div>
            {/*elconcept et722 weldata etshyrt 3la child2 welchildren bto3o */}
            <Child22/>
        </>

    )
}