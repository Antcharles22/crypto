import axios from 'axios';
import { create } from 'zustand';

const showStore = create((set) => ({
    graphData: [],
    data: null,
    error: null,

    fetchData: async (id) => {
        try {
            const [graphRes, dataRes] = await Promise.all([
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90`),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`),
            ]);

            const graphData = graphRes.data.prices.map((price) => {
                const [timestamp, p] = price;
                const date = new Date(timestamp).toLocaleDateString("en-us");

                return {
                    Date: date,
                    price: p,
                };
            });

            set({ graphData, data: dataRes.data, error: null });
        } catch (error) {
            console.error('Failed to fetch data:', error);
            set({ error: 'Failed to fetch data' });
        }
    },
}));

export default showStore;