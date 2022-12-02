import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import { CheckJWTAndSession } from '../midlewear/checkSessionJwt';

export default function login() {
    const [tokenValid, setTokenValidation] = useState<boolean | undefined>(false);
    const [isAdmin, setIfAdmin] = useState<boolean | undefined>(false);

    useEffect(() => {
        const validateToken = async () => {
            const check = await CheckJWTAndSession();
            setTokenValidation(check)

            if (check == true) {
                window.location.replace("/")
            }
        }
        validateToken();
    }, [])

    return (
        <div>
            {!tokenValid ?
                <div>
                    <Navbar />
                    <Login />
                    <Footer />
                </div> : <div></div>
            }
        </div>
    )
}
