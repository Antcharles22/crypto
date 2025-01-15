import React, { use } from "react";
import { useEffect } from "react";
import homeStore from "../stores/homeStore";


export default function Home() {
    const store = homeStore()
    useEffect(() => { 
        store.fetchCoins()
    }, [])

    return(
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
        </div>
    )
} 