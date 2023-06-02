
import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import $ from 'jquery'; //k2n $ hya eljquery kolo/ $>>alias
import { useNavigate } from "react-router-dom";

export default function Register() {

  let user={
    name:'',
    email:'',
    phone:'',
    password:'',
    repassword:'',
  }
  let caughtError='';
  //hook usenavigate byreturn function t3ml navigate ll page el3yza aro7lha
   const navigate=useNavigate();
   async function registerNewUser(x){
    //hb3t ll api eldata elhya elbody
    //mynf3sh ybaa el user l2no fady omal emta bytmly lma y7sal validation f ab3t ll func parameter 
    //w lma a3mlha call gwa onsubmit ab3t el obj
    //byrg3 response
    //bktb feltry elcode elshaka eno mmkn ytl3 error
     try{
      let res = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signup',x);
      let finalres=res.data;
      console.log(finalres);
      if(finalres.message=='success'){
        $('.successmsg').fadeIn(1000,function(){
          navigate('/login');
        });
        
      }
      
     }
     //btmsek elerror
     catch(err){
        console.log(err);
        //console.log(err.response.data.errors.msg);
        caughtError=err.response.data.errors.msg;
        if(caughtError!=''){
          $('.errmsg').fadeIn(1000,function(){
            setTimeout(() => {
              $('.errmsg').fadeOut(1000);
            }, 3000);
          });
        }
     }
  }

  //formik >> library to handle user object with form
  //has hook >> useformik
  let myFormik= useFormik({ //btakhod object feh kza property
    initialValues:user, //elproperty deh btakhod elobject elhlinko b form
    onSubmit: function(values){ //elfunction deh btakhod parameter shayel elproperties belvalues bta3tha
      //dlwate lw tb3t elvalues el dkhltha felform htzhr 34an rbat elvalues bel object
      //console.log('submit',values);

      //lma ysubmit ynfez func registernewuser el hyb3t data elshakhs el3mal register ll backend
      registerNewUser(values);
    },
    validate: function(values){
        let errorObj={};
        if(values.name.length < 3){
          errorObj.name='invalid name';
        }
        if(!values.email.match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
          errorObj.email='invalid email';
        }
        if(values.phone.length !== 11){
          errorObj.phone='invalid phone length';
        }
        
        if(!values.password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
          errorObj.password='invalid pass';
        }
        if(values.password!== values.repassword){
          errorObj.repassword='invalid repass';
        }
        
        return errorObj;
      }

  });
  //elformik btrag3 object 34an 22dr aacess el properties bta3to felform

  //tyb dlwate 3yza a link el inputs elflform belvalues bta3tha
  //lw msln 7tet data felproperties bta3t user fo2 htzhr felform l2n elvalues bta3t elinput etrbtt beha

  //dlwate hwa by2ole lw est5dmt elattribute value felinputs hysht8l read only y3ni lw b3tle data h7othalak 
  //lkn lw ktbt data felinput msh hynf3 >> f h use onchange
  return (

    <div>
      <div className="container py-5">
        <h2 className="pb-2">Registeration form</h2>

        <div style={{'display':'none','textAlign':'center'}} className=" errmsg alert alert-danger">
            Email already in use
          </div>
          <div style={{'display':'none','textAlign':'center'}} className=" successmsg alert alert-success">
            success
          </div>

        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} className="form-control mb-3"type="text"placeholder="name"id="name" />
          {myFormik.errors.name && myFormik.touched.name? <div className="alert alert-danger text-center">{myFormik.errors.name}</div>:''}
          
          <label htmlFor="email">Email:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} className="form-control mb-3"type="email"placeholder="email"id="email" />
          {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger text-center">{myFormik.errors.email}</div>:''}

          <label htmlFor="phone">Phone:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} className="form-control mb-3"type="text"placeholder="phone"id="phone" />
          {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger text-center">{myFormik.errors.phone}</div>:''}

          <label htmlFor="password">Password:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} className="form-control mb-3"type="password" placeholder="password"id="password" />
          {myFormik.errors.password && myFormik.touched.password? <div className="alert alert-danger text-center">{myFormik.errors.password}</div>:''}

          <label htmlFor="repassword">Repassword:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.repassword} className="form-control mb-3"type="password" placeholder="repassword"id="repassword" />
          {myFormik.errors.repassword && myFormik.touched.repassword? <div className="alert alert-danger text-center">{myFormik.errors.repassword}</div>:''}
          <button className="btn-success btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}