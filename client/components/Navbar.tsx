import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import ReactDOM from "react-dom";
import Link from 'next/link';
import { CheckJWTAndSession } from '../midlewear/checkSessionJwt';
import { CheckJWTIsAdmin } from '../midlewear/checkIfTokenAdmin';
import { Toaster } from 'react-hot-toast';

export default function Navbar() {
    const [nav, setNav] = useState(true);
    const [tokenValid, setTokenValidation] = useState<boolean | undefined>(false);
    const [isAdmin, setIfAdmin] = useState<boolean | undefined>(false);

    useEffect(() => {
        const validateToken = async () => {
            const check = await CheckJWTAndSession();
            setTokenValidation(check)
        }
        const checkIfAdmin = async () => {
            const check = await CheckJWTIsAdmin();
            setIfAdmin(check)
        }
        validateToken();
        checkIfAdmin();
    }, [])



    const handleNav = () => {
        setNav(!nav);
    }

    const signOff = () => {
        localStorage.clear();
        window.location.replace("/")
    }


    return (

        <div>
            <div><Toaster /></div>
            <header className='sticky top-0 bg-[#000300] z-10'>
                <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
                    <Link href={"/"}>
                        <h1 className=' w-full text-3xl font-bold text-[#00df9a]'>GAMERATING.</h1>
                    </Link>
                    <ul className='hidden md:flex'>
                        <Link href={"/"}>
                            <li className='p-4'>Home</li>
                        </Link>
                        <Link href='/companies'>
                            <li className='p-4'>Companies</li>
                        </Link>
                        <li className='p-4'>About</li>
                        <li className='p-4'>

                            {!tokenValid ?
                                <Link href={'/login'}>
                                    <button className='bg-white w-[150px] rounded-md font-medium py-2 my-[-20px] text-black'>Sign In</button>
                                </Link>
                                : <button onClick={signOff} className='bg-[#00df9a] w-[150px] rounded-md font-medium py-2 my-[-20px] text-black'>Sign Off</button>
                            }
                        </li>
                        <li className='p-4'>
                            {tokenValid && isAdmin ?
                                <Link href={'/admin'}>
                                    <button className='bg-white w-[150px] rounded-md font-medium py-2 my-[-20px] text-black'>Admin CP</button>
                                </Link>
                                : null
                            }
                        </li>
                    </ul>
                    <div className='block md:hidden' onClick={handleNav}>
                        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                    </div>

                    <div className={/*later fix animation */ !nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed hidden left-[-100%]'}>
                        <h1 className=' w-full text-3xl font-bold text-[#00df9a] m-4'>GAMERATING.</h1>
                        <ul className='uppercase p-4'>
                            <Link href={"/"}>
                                <li className='p-4 border-b border-gray-600'>Home</li>
                            </Link>
                            <Link href='/companies'>
                                <li className='p-4 border-b border-gray-600'>Companies</li>
                            </Link>
                            <li className='p-4 border-b border-gray-600'>About</li>
                            {!tokenValid ?
                                <Link href={"/login"}>
                                    <li className='p-4 border-b border-gray-600'>Sign In</li>
                                </Link> :
                                <Link onClick={signOff} href={"/"}>
                                    <li className='p-4 border-b border-gray-600'>Sign Off</li>
                                </Link>
                            }

                            {tokenValid && isAdmin ?
                                <Link href={'/admin'}>
                                    <li className='p-4 border-b border-gray-600'>Admin CP</li>
                                </Link>
                                : null
                            }
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}
