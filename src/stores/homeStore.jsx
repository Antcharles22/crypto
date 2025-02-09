import axios from 'axios';
import { create } from 'zustand';
import debounce from '../components/helpers/debounce';

const homeStore = create((set, get) => ({
    coins: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value });
        get().searchCoins();
    },

    searchCoins: debounce(async () => {
        const { query } = get();
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
        
        const coins = res.data.coins.map(coin => {
            return {
                name: coin.name,
                image: coin.large,
                id: coin.id,
                
            }
        })
        set({ coins });
    }, 500),

    fetchCoins: async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        const coins = res.data.coins.map((coin) => ({
            name: coin.item.name,
            image: coin.item.large,
            id: coin.item.id,
            priceBtc: coin.item.price_btc,
        }));
        set({ coins });
    }
}));

export default homeStore;