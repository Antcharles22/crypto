import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import homeStore from "../stores/homeStore";
import Header from "../components/helpers/header"


export default function Home() {
    const store = homeStore()
 
    React.useEffect(() => { 
        store.fetchCoins()
    }, [])


    return(
        <div>
            <Header />
            <header className="home-search" >
            <h2>search for a coin</h2>
            <input type = "text" value={store.query} onChange={store.setQuery} placeholder = "Search" /> 
            </header>
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