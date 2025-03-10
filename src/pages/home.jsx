import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import homeStore from "../stores/homeStore";
import Header from "../components/helpers/header"
import ListedItems from "../components/helpers/ListedItems"


export default function Home() {
    const store = homeStore()
 
    React.useEffect(() => { 
        store.fetchCoins()
    }, [])


    return(
        <div>
            <Header />
            <header className="home-search" >
                 <div className="width">
                    <h2>search for a coin</h2>
                    <input type = "text" value={store.query} onChange={store.setQuery} placeholder = "Search" /> 
                </div>
            </header>
            <div className="home-cryptos">
                <div className="width">
                    <h2>Top Trending Coins</h2>
                    {store.coins.map((coin) => {
                    return (
                    <ListedItems key={coin.id} coin = {coin} />
                    )
                    })}
                </div> 
            </div>   
        </div>
    );
} 