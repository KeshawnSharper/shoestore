import React,{useState,useEffect} from 'react'
import './SignIn.css'
import axios from 'axios'
import {Circles} from "react-loader-spinner";
import { Link,useNavigate } from "react-router-dom";

export default function SignIn(props) {
   const [user,setUser] = useState({
       email:'',
       password:""
   })
   const [error,setError] = useState({})
   const [loading,setLoading] = useState(false)
   const navigate = useNavigate()
   useEffect(() => {
    alert("if you dont want to register use the following credentials to see the demo... {Email: dummy@email.com,Password: p@sSword101}")
  },[])
   const handleChange = e => {
       setUser({...user,
        [e.target.name]:e.target.value})
        console.log(user)
   }
   const handleSubmit = e => {
       e.preventDefault()
       setLoading(true)
   axios.post(`https://shop-be-wxaj.onrender.com/login`,user).then(
       res => {
        setLoading(false)
        console.log("user",res.data)
        localStorage.setItem(`token`, res.data.token);
        localStorage.setItem(`id`, res.data.id);
        localStorage.setItem(`email`, res.data.email);
        localStorage.setItem(`user`, JSON.stringify(res.data.user));
        navigate("/home");
        window.location.reload(false);
       }
   )
   .catch(
    err => {
      console.log(err)
      setError({...error,message:err.response.data.message})
      setLoading(false)
      console.log(err)
    }
  )

   

}
  return (
    <div>
      {  
      loading 
      ?
      <div style={{"width":"800px", "margin":"0 auto"}}>
    <Circles type="Puff" color="#00BFFF" /> 
    <p>Authenicating...</p>
    </div>
    :
    <div className="main">
      <p className="sign" align="center">Sign in</p>
      <form className="form1">
      <p style={{"textAlign":"center","color": "#d53369"}}>{error.message}</p>
        <input className="un " onChange={handleChange} name="email"type="text" align="center" placeholder="Email" />
        <input className="pass" onChange={handleChange} name="password"type="password" align="center" placeholder="Password" />
        <button className="submit" align="center" onClick={handleSubmit}>Sign in</button>
        <Link to="/signup"><p className="forgot" align="center">Sign Up</p></Link>
    </form>
    </div>
}
    </div>
  )
}