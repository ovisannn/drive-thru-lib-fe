"use client"

import { BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
    const cookieValue = Cookies.get('token');

    const [isLogin, setIsLogin] = useState(false)
    const [getUser, setUser] = useState({})

    const onLogout = () => {
        Cookies.remove('token');
        Cookies.remove('username');
        window.location.href = '/';
    }

    
  useEffect(()=>{
    (async()=>{
      const username = Cookies.get('username')
      if(username !== undefined){
        await axios.get(`http://localhost:3000/user/${username}`).then(
          res =>{
            setUser(res.data.data.loginUser)
            setIsLogin(true)
          }
        )
      }
    })()
  },[])
    return (
    <>
    <header className="pt-3 pb-3 pl-20 pr-20 bg-white shadow-sm">
        <div className="flex justify-between items-center">

            <div className="flex items-center w-1/5 pl-10">
                <a href="/" title="" className="flex">
                    <BookOpenIcon className="size-8 text-blue-500"></BookOpenIcon>
                    <div className='pl-2 pt-1 text-bl   ue-500 font-medium'>Drive-Thru Lib</div>
                </a>
            </div>

            <div className="w-2/5 flex shadow-md pl-3 pr-3 border-solid border-2 rounded-md border-blue-200 hover:border-blue-400 focus:border-blue-400 active:border-blue-400 transition-all duration-300 ease-in-out">
                
                <input 
                className="rounded-md appearance-none outline-0 outline-blue-300 w-full py-2 px-3 text-black leading-tight focus:shadow-outline bg-white" 
                id="search" 
                type="text" 
                placeholder="Search book" 
                // value={getLogin.username} 
                // onChange={(e) => setUsername(e.target.value)}
                />
                <MagnifyingGlassIcon className="size-8 text-blue-300"></MagnifyingGlassIcon>
            </div>

            <div className=''>
            {
                isLogin? (
                    <div className='flex w-1/5 pl-20'>
                        <div className=' m-2 p-1 pl-8 pr-8 bg-blue-400 hover:bg-blue-500 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out'>
                            {getUser.username}
                        </div>
                        <div className='m-2 p-1 pl-6 pr-6 bg-red-400 hover:bg-red-500 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out' onClick={onLogout}>
                            Logout
                        </div>
                    </div>
                ):(
                    <div className='flex w-1/5 pl-20'>

                        <a href="/login">            
                            <div className=' m-2 p-1 pl-8 pr-8 bg-blue-400 hover:bg-blue-500 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out'>
                                Login
                            </div>
                        </a>
                        <div className='m-2 p-1 pl-6 pr-6 bg-orange-400 hover:bg-orange-500 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out'>
                            Register
                        </div>
                    </div>
                )
            }

            </div>

        </div>
    </header>
    </>
    );
}

export default Header;