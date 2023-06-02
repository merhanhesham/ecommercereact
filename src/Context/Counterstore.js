/*import React, { createContext, useEffect, useState } from "react";

export const counterstorecontext =createContext();

 //counterstorecontext.Provider
export default function Counterstore({children}) {

    //b3rf hena kol el variables aw el functions (eldata) el3yza ashyrha
    const[counter,setcounter]=useState(0);
    function updbutton(){
        setcounter(counter+1);
    }


   //component to wrap inside it the other components
    return (
        //to allow to share data between components
        //bb3tlo eldata shared f elprops b esm value byshtret ybaa gwaha object 34an ab3t aktr mn var
        //object inside value takes key,value or value 3ltol
        //kda edert ashare eldata between home,about, 3yalhom
        <counterstorecontext.Provider  value={{counter, updbutton}}> 
          {children}
        </counterstorecontext.Provider>

    )
}*/