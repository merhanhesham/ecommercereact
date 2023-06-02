import React, { useEffect, useState } from "react";


export default function Profile({currUser}) {
   
    return (
        <>
           <h2 className="text-center ">Welcome {currUser.name}</h2>
        </>

    )
}