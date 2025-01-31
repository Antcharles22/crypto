import axios from 'axios'
import { create } from 'zustand'

const homeStore = create((set) => ({
    coins: [],

  fetchCoins: async() => {
    const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')


    const coins = res.data.coins.map((coin) => {
        return {
            name: coin.item.name,
            Image: coin.item.large,
            id: coin.item.id,
            priceBtc: coin.item.price_btc,
        }

    })

    set({coins})







    
  }
}))


export default homeStore
