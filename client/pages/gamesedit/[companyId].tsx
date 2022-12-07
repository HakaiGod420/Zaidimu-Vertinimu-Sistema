import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer';
import GamesControl from '../../components/GamesControl';
import Navbar from '../../components/Navbar';


function Game() {

    const [param1, setParam1]=useState<string | string[] | undefined>();
    const router = useRouter();
   
    useEffect(() => {
     if (router && router.query) {
      setParam1(router.query.companyId);
     }
    }, [router]);
    
    return (
        <div>
            <Navbar />
            {param1 ? <GamesControl companyId={param1} />:<p>Loading</p>}
            <Footer />
        </div>
    )
}

export default Game