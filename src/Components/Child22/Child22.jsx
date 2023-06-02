import React, { useContext, useEffect, useState } from "react";
import { counterstorecontext } from "../../Context/Counterstore";

export default function Child22() {
     //kda 7ddtelo el context elhstkhdmo 
     //byreturn data
    const data = useContext(counterstorecontext)
    console.log(data);
    return (
        <>
          <h2 className="bg-secondary" >Child22 {data.counter}</h2>
        </>

    )
}