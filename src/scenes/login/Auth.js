import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import {useNavigate} from 'react-router-dom';
import {AiFillLock} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {BsFillBuildingsFill} from 'react-icons/bs';
//import company from './company_logo.png';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const BASE_URL = "http://192.168.1.31:5000";

    const login = async (e) => {
        e.preventDefault();

        try {
            console.log(`${BASE_URL}/login`);
            const response = await axios.post(`${BASE_URL}/login`, {email, password});
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            
            console.log(response);
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    return (
        <div className="auth-container">
        <div className="background-image"></div>
       <div className="auth-box">
         <h2><BsFillBuildingsFill size={50} color='#550A35'/></h2>
         <form onSubmit={login}>
           <div className="input-container">
            <div className="icon-container">
             <BsFillPersonFill size={20} className="icon"/>
            </div> 
             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
           </div>
           <br />
           <div className="input-container">
            <div className="icon-container">
             <AiFillLock size={20} className="icon"/>
            </div> 
             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
           </div>
           <br />
           <button type="submit" className="login-button" >Login</button>
         </form>
         {error && <p className="error-message">{error}</p>}
       </div>
     </div>
    )
}

export default Auth;