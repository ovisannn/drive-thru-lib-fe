"use client"; 
import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from "../components/header";
import { BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'


export default function Login() {
  const [getLogin, setLogin]  = useState({
    username : '',
    password : ''
  })
  const router = useRouter();

  const setUsername = (username) => {
    const pw = getLogin.password;
    setLogin({
        username : username,
        password : pw
    });
  }

  const setPassword = (pw) => {
    const username = getLogin.username;
    setLogin({
        username : username,
        password : pw
    });
  }

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/user/login', {
        "username" : getLogin.username,
        "password" : getLogin.password
    });
      Cookies.set('username', res.data.data.username);
      Cookies.set('token', res.data.data.token);
      const cookieValue = Cookies.get('token');
      console.log('Cookie value:', cookieValue);
      router.push('/');
    } catch (error) {
      router.push('/invalidCredential');
    }
  }


  return (
    <>
    
      <Header></Header>
      <div className="flex items-center justify-center h-screen bg-sky-200">
        <div className="w-full max-w-md">
          <div className="bg-white h-1/3 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={onLogin}>
          <div className="flex justify-center font-semibold text-2xl text-blue-400"><BookOpenIcon className="size-8 text-blue-400" />Drive-Thru Lib</div>
          {/* username */}
            <div className="mb-4">
              <label className="block text-blue-400 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input 
                className="shadow rounded-md appearance-none outline-none w-full py-2 px-3 text-black leading-tight focus:outline-none active:outline-none focus:shadow-outline bg-white" 
                id="username" 
                type="text" 
                placeholder="Username" 
                value={getLogin.username} 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* password */}
            <div className="mb-6">
              <label className="block text-blue-400 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input 
                className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="password" 
                type="password" 
                placeholder="******************" 
                value={getLogin.password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* sign in */}
            <div className="flex items-center justify-between">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out" 
                type="submit"
                onClick={onLogin}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}