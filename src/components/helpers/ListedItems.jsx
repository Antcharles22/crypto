// filepath: /Users/anthonycharles/cry-max/src/components/helpers/ListedItems.jsx
import React from 'react';
import { Link } from "react-router-dom";

export default function ListedItems({ coin }) {
    return (
        <div className="home-crypto">
            <Link to={`/${coin.id}`}>
                <img src={coin.image} alt={coin.name} className="home-crypto-image" />
                <span className="home-crypto-name">{coin.name}</span>
                <div className="home-crypto-details">
                    <span className="home-crypto-btc">{coin.priceBtc} BTC</span>
                    <span className="home-crypto-usd">${coin.priceUsd} USD</span>
                </div>
            </Link>
        </div>
    );
}