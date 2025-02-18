
import axios from 'axios';
import { create } from 'zustand';
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const showStore = create((set) => ({        
    graphData: [],


    fetchData: async (id) => {

        const [graphRes, dataRes] = await Promise.all([
            axios.get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90`),

            axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
            ),
            
            
        ]);

    
        const graphData = graphRes.data.prices.map((price) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("ne-us")

            return{
            
                Date: date,
                price: p,
               
              };
        });
        
        set({ graphData });
        
        console.log(graphRes);
    },

    
}));


export default showStore;