import React from "react";
import { Link } from "react-router-dom";

export default function ListedItems({ coin }) {
    return (
        <div className="home-crypto-item">
        <Link to = {`/${coin.id}`}>
            <span className="home-crypyo-image">
            <img src={coin.image} alt={coin.name} />
            </span>
            <span className="home-crypto-name"> {coin.name}</span>

            <span className="home-crypto-prices">
                <span>${coin.priceBtc}</span>
                <span>${coin.priceUsd}USD</span>
            </span>
        </Link>
    </div>
    );
 }