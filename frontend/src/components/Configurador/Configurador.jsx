import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
const Configurador = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState,setCurreState] = useState("LogIn")
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    }
    else{
      newUrl += "/api/user/register";
    }
    const response  = await axios.post(newUrl,data);  
    console.log(response.data.success);
    console.log(newUrl);
    if(response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
      console.log("bien ")
    }else{
      alert(response.data.message)
      console.log("error con cosa");
    }

  }


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div classNaz="login-popup-inputs">
          {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
          <input name='password'onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Log In"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"
        ?<p>Create  a new account? <span onClick={()=>setCurreState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurreState("Login")}>Login here</span></p>
      }

      </form>
    </div>
  )
}

export default Configurador