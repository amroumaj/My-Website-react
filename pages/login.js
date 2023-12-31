import AuthContext from '../context/AuthProvider';
import {useRef, useState, useEffect,useContext} from 'react';
import axios from '../API/axios'; 
import './login.css';
import { Link } from 'react-router-dom';

const LOGIN_URL = '/auth';
const Login = () => { 
  const {setAuth} =useContext(AuthContext);
  const userRef =useRef();
  const errRef =useRef();
  
  const [user, setUser] = useState('');
  const [pwd, setPwd] =useState('');
  const [errMsg, setErrMsg] =useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(()=>{
    userRef.current.focus();
  },[])

  useEffect(()=>{
    setErrMsg('');
  },[user, pwd])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(LOGIN_URL,JSON.stringify({user, pwd}),
      {
        headers: {'Content-Type': 'application/json'},withCredentials:true
      }) ;   
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setUser('');
      setPwd('');
      setSuccess(true);
    }catch(err){
      if (err?.response) {
        setErrMsg('No Server Response');
      }
      else if(err.response?.status=== 400){
        setErrMsg('Missing Username or Password');
      }
      else if(err.response?.status === 401){
        setErrMsg('Unauthorized');
      }
      else{
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }
  
  return (
    <main className='login'>
      <section>
        <p ref = {errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form on onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input 
            type = "text"
            id = 'username'
            ref = {userRef}
            autoComplete ='off'
            onChange = {(e)=>setUser(e.target.value)}
            value = {user}
            required
          />
          <label htmlFor='password'>Password</label>
          <input 
            type = "password"
            id = 'password'
            onChange = {(e)=>setPwd(e.target.value)}
            value = {pwd}
            required
          />
          <button>Sign In</button>
        </form>
        <p>
          Need an account ? <br/>
          <span className='line'>
            <Link to="/Register">Sign Up</Link>
          </span>
        </p>
      </section>
    </main>
  )
}

export default Login