import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { account } from "../config/appwrite.js"
import { useNavigate } from "react-router-dom"

function generateUserId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const userIdLength = 10;
    let userId = '';
    for (let i = 0; i < userIdLength; i++) {
        userId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return userId;
}


const Signup = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const [error, setError] = useState("")

    const signupFunc = async () => {
        const userId = generateUserId();
        const { name, email, password } = userData;
    
        const signPromise = account.create(
            userId,
            email,
            password,
            name
        );
    
        signPromise.then(function (res) {
            navigate("/login");
        }, function (err) {
            console.log(err);
            setError('An error occurred during signup. Please try again.');
        });
    };

    return (
        <div className='flex justify-center w-full items-center h-screen bg-primary text-white'>
            <div className="w-full max-w-[320px] md:max-w-[440px] text-center py-[50px] px-[35px] bg-secondary rounded-md shadow-sm h-auto">
                <div className="flex items-start flex-col gap-6 bg-transparent">
                    <h2 className="text-3xl font-medium self-start">Register</h2>

                    <div className="flex flex-col items-start gap-3 w-full">
                        <label htmlFor="username" className="text-whiteAlt text-md">Username</label>
                        <input
                            type='text' placeholder='Username' onChange={(e) => setUserData({ ...userData, name: e.target.value, Id: e.target.value })}
                            className="p-2 pl-4 w-full rounded-md border-none outline-none text-black font-medium"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-start gap-3 w-full">
                        <label htmlFor="email" className="text-whiteAlt text-md">Email</label>
                        <input
                            type='email' placeholder='Email' onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="p-2 pl-4 w-full rounded-md border-none outline-none text-black font-medium"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-start gap-3 w-full">
                        <label htmlFor="password" className="text-whiteAlt text-md">Password</label>
                        <input
                            type='password' placeholder='Password' onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            className="p-2 pl-4 w-full rounded-md border-none outline-none text-black font-medium"
                            required
                        />
                    </div>
                    {error &&
                        <div className="text-red p-2">{error}</div>
                    }

                    <button onClick={signupFunc} className="mt-4 px-4 py-2 bg-white text-black hover:bg-whiteAlt font-medium rounded-md" >Register</button>

                    <p>Already registered? <Link to="/login" className="underline text-whiteAlt">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup