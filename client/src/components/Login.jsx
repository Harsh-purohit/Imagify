import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Sign In');

    const { setShowLogin, backendURL, setToken, setUser} = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {     
        e.preventDefault();

        try{
            if (state === 'Sign In'){
                const response = await axios.post(backendURL + '/api/user/login', {email, password})
                const data = response.data

                console.log(data)

                if(data.success){
                    setToken(data.token)
                    setUser(data.userData)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }

            } else {
                const response = await axios.post(backendURL + '/api/user/register', {name, email, password})
                const data = response.data

                if(data.sucess){
                    setToken(data.token)
                    setUser(data.userData)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }

        }catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    },[])

    return (
    
    <div className='fixed top-0 left-0 right-0 bottom-0 z-0 flex justify-center items-center backdrop-blur-sm bg-black/30'>

        <motion.form onSubmit={onSubmitHandler}
            initial={{ opacity: 0.2, y: 50 }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}

            className='relative bg-white p-10 rounded-xl text-slate-500'>
            
            <h1 className='text-center text-2xl font-medium text-neutral-700'>
                {state}
            </h1>

            <p className='text-sm'>
                Welcome back! Please {state} to continue
            </p>

            {state !== 'Sign In' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.profile_icon} alt="" width={23}/>
                <input onChange={e => setName(e.target.value)} value={name} type="text" className='outline-none text-sm ' placeholder='Full Name' required/>
            </div>}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" width={20}/>
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm ' placeholder='Email id' required/>
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" width={15}/>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm ' placeholder='Password' required/>
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>
                Forgot Password?
            </p>

            <button className='rounded-full bg-blue-600 text-white px-6 py-2 w-full hover:bg-blue-700 transition-all duration-200 ease-in-out'>
                {state === 'Sign In' ? 'Sign In' : 'Sign Up'}
            </button>

            {state === 'Sign Up' 
            ? 
            <p className='mt-5 text-center'>
                Already have an account?
                <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign In')}>
                    Sign In
                </span>
            </p>
            
            :

            <p className='mt-5 text-center'>
                Don't have an account?
                <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>
                    Sign Up
                </span>
            </p>
            }

            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>

        </motion.form>
    </div>
    )
}

export default Login