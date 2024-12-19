import React, { useState } from 'react';
import auth from '../../firebase_init_';
import { Link } from 'react-router-dom';
import {  sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { setLogLevel } from 'firebase/app';
import { useRef } from 'react';

const Login = () => {
    const [succes , setSucces]= useState(false)
    const [loginerror, setLoginerror]= useState('')
    const emmailRef = useRef()
    const handlelogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(password, email)

        // reset stutas
        setSucces(false)
        setLoginerror('')
        // login user

        signInWithEmailAndPassword(auth,  email, password)
        .then(result =>{
            console.log(result.user)
            if(! result.user.emailVerified){
                setLogLevel('please varify your email address')
            }else{
                setSucces(true)
            }
           

            // send varification email addres

            sendEmailVerification(auth.currentUser)
            .then(()=> {
                console.log('varifecation email sent')
            })
        })
        .catch(error =>{
            console.log('ERROR', error.message)
            setLoginerror(error.message)
        })
    }
    const handleforgetpassword = ()=>{
        console.log('give me email address', emmailRef.current.value)
        const email = emmailRef.current.value;
        if(!email){
            console.log('please provide a valid email address')
        }else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('password resert email send.')
            })
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handlelogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' ref={emmailRef} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input  type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label onClick={handleforgetpassword} className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        succes && <p className='text-green-600'>user login succesfully.</p>
                    }
                    {
                        loginerror && <p className='text-red-700'> {loginerror}</p>
                    }
                    <p>new to this website Sing up <Link to="/singup"></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;