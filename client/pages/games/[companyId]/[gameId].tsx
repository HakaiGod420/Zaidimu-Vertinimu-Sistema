import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import GameInfo from '../../../components/GameInfo';
import Navbar from '../../../components/Navbar'

function Game() {

    const [param1, setParam1]=useState<string | string[] | undefined>();
    const [param2, setParam2]=useState<string | string[] | undefined>();
    const router = useRouter();
   
    useEffect(() => {
     if (router && router.query) {
      setParam1(router.query.companyId);
      setParam2(router.query.gameId)
     }
    }, [router]);
    
    return (
        <div>
            <Navbar />
            {param1 && param2 ? <GameInfo companyId={param1} gameId={param2} />:<p>Loading</p>}
            <Footer />
        </div>
    )
}

export default Game