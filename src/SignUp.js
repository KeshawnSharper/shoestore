import React,{useState,useEffect} from 'react'
import './SignIn.css'
import Axios from 'axios'
import {Circles} from "react-loader-spinner";
import { Link,useNavigate } from "react-router-dom";


export default function SignUp(props) {
   const [user,setUser] = useState({
       email:"",
       password:"",
       user_name:""
   })
   const navigate = useNavigate()
   const [error,setError] = useState({})
   const [loading,setLoading] = useState(false)
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
   Axios.post(`https://us-central1-shop-be-a676b.cloudfunctions.net/shop-be-c5370/us-central1/helloWorld/register`,user).then(
       res => {
        console.log(res.data)
        Axios.post(`https://us-central1-shop-be-a676b.cloudfunctions.net/shop-be-c5370/us-central1/helloWorld/login`,user).then(
       res => {
        localStorage.setItem(`email`,res.data.email)
        localStorage.setItem(`token`,res.data.token)
        localStorage.setItem(`id`,res.data.id)
        localStorage.setItem(`user`, JSON.stringify(res.data.user));
        console.log(res.data)
        navigate("/home");
        window.location.reload(false);
       })
       }
   )
.catch(
    err => {
      console.log(err)
      setError({...error,message:err.response.data.message})
      setLoading(false)
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
      <p className="sign" align="center">Sign Up</p>
      <form className="form1">
        <p style={{"textAlign":"center","color": "#d53369"}}>{error.message}</p>
        <input className="un " onChange={handleChange} name="email"type="text" align="center" placeholder="Email" />
        <input className="pass" onChange={handleChange} name="user_name"type="userName" align="center" placeholder="Username" />
        <input className="pass" onChange={handleChange} name="password"type="password" align="center" placeholder="Password" />
        <button className="submit" align="center" onClick={(e) => handleSubmit(e)}>SignUp</button>
        <Link to="/signin"><p className="forgot" align="center">Sign In</p></Link>
    </form>
    </div>
      }
    </div>
  )
}