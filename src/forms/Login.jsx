import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { account } from '../config/appwrite.js';
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const loginFunc = async () => {
        try {
            await account.createEmailPasswordSession(userData.email, userData.password);
            
            const userAccount = await account.get();
            const userName = userAccount.name;
            
            localStorage.setItem('userName', userName);
            
            navigate("/");
        } catch (error) {
            alert("Something went wrong!")
        }
    }

    return (
        <div className='flex justify-center w-full items-center h-screen bg-primary text-white'>
            <div className="w-full max-w-[320px] md:max-w-[440px] text-center py-[50px] px-[35px] bg-secondary rounded-md shadow-sm h-auto">
                <div className="flex items-start flex-col gap-6">
                    <h2 className="text-3xl font-medium self-start">Login</h2>

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

                    <button onClick={loginFunc} className="mt-4 px-4 py-2 bg-white text-black hover:bg-whiteAlt font-medium rounded-md" >Login</button>

                    <p>Don't Have Account? <Link to="/signup" className="underline text-whiteAlt">Signup</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login