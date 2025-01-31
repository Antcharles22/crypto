import React, { use } from "react";
import { useEffect } from "react";
import homeStore from "../stores/homeStore";
import { Link } from "react-router-dom";


export default function Home() {
    const store = homeStore()
    useEffect(() => { 
        store.fetchCoins()
    }, [])


    return(
        <div>
            {store.coins.map((coin) => {
                return (
                    <div key = {coin.id}>
                        <Link to = {`/${coin.id}`}>
                            {coin.name}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
} 