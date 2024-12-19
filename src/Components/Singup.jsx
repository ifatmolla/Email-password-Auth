
import React, { useState } from 'react';
import auth from '../firebase_init_';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Singup = () => {
    const [sucsess, setSucsess] = useState(false)
    const [errrormassage, setErrormassage] = useState('')
    const [show, setShow] = useState(false)
    const handlesubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;
        console.log(email, password , name, photo, terms)

        setErrormassage('')

        if (password.length < 6) {
            setErrormassage('password should be 6 charectors of longer')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSucsess(true)
            })

            const profile = {
                displayName: name,
                photoURL: photo,
            }
            updateProfile(auth.currentUser, profile)
            .then(()=>{
                console.log('user profile update')
            })
             .catch(error => console.log('user profile update error'))
            .catch(error => {
                console.log('ERROR', error)
                setErrormassage(error.massage)
                setSucsess(false)

                if(!terms){
                    setErrormassage('please accept our terms and conditions.')
                    return;
                }
                {
                    <p className='m-2'>Alrady have an account ? please <Link to="login">Login</Link></p>
                }
            })
    }
    return (

        <div className="my-8 card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className=" text-5xl font-bold text-center">Sing up now!</h1>
            <form onSubmit={handlesubmit} className="card-body">
            <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered" required />
                </div>
                <div className="relative  form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={show ? "text" : "password"}
                        name='password' placeholder="password" className="input input-bordered" required />
                    <button onClick={() => setShow(!show)} className='btn btn-xs absolute right-3 top-12'>
                        {show ? <FaEyeSlash> </FaEyeSlash> : <FaEye></FaEye>}
                    </button>
                    <label className="label">

                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start">
                        <input type="checkbox" name='terms' className="checkbox" />
                        <span className="label-text ml-2">Accept Our Trams And Condition</span>

                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            {
                setErrormassage && <p className='text-red-600'>{setErrormassage}</p>
            }
            {
                sucsess && <p className='text-green-600'>Sing up is sucsesfull</p>
            }
        </div>

    );
};

export default Singup;