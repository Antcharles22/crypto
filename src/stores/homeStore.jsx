import axios from 'axios';
import { create } from 'zustand';
import debounce from '../components/helpers/debounce';

const API_KEY = 'CG-BnTvvdnPQyY14MHqPaCqS454'; // Replace with your actual CoinGecko API key

const homeStore = create((set, get) => ({
    coins: [],
    trending: [],
    query: '',
    error: null,

    // Updates the query and triggers the search
    setQuery: (e) => {
        set({ query: e.target.value });
        get().searchCoins();
    },

    // Debounced function to search for coins
    searchCoins: debounce(async () => {
        const { query, trending } = get();
        if (query.length > 0) { // Allow searching with a single character
            try {
                const res = await axios.get(`https://api.coingecko.com/api/v3/search`, {
                    headers: {
                        'accept': 'application/json',
                        'x-cg-demo-api-key': API_KEY
                    },
                    params: {
                        query: query // Search for coins matching the query
                    }
                });

                const coins = res.data.coins.map((coin) => ({
                    name: coin.name,
                    image: coin.large,
                    id: coin.id,
                }));
                set({ coins });
            } catch (error) {
                console.error('Failed to search coins:', error);
                set({ error: 'Failed to search coins' });
            }
        } else {
            // Restore trending coins when the search query is cleared
            set({ coins: trending });
        }
    }, 500),

    // Fetches trending coins and Bitcoin price
    fetchCoins: async () => {
        try {
            const [res, btcRes] = await Promise.all([
                axios.get('https://api.coingecko.com/api/v3/search/trending', {
                    headers: {
                        'accept': 'application/json',
                        'x-cg-demo-api-key': API_KEY
                    }
                }),
                axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                    headers: {
                        'accept': 'application/json',
                        'x-cg-demo-api-key': API_KEY
                    },
                    params: {
                        ids: 'bitcoin',
                        vs_currencies: 'usd'
                    }
                }),
            ]);

            const btcPrice = btcRes.data.bitcoin.usd;

            const coins = res.data.coins.map((coin) => ({
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: coin.item.price_btc.toFixed(10),
                priceUsd: (coin.item.price_btc * btcPrice).toFixed(10),
            }));
            set({ coins, trending: coins });
        } catch (error) {
            console.error('Failed to fetch coins:', error);
            set({ error: 'Failed to fetch coins' });
        }
    }
}));

export default homeStore;