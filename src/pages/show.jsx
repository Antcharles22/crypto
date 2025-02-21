import React from "react";
import { useParams } from "react-router-dom";
import showStore from "../stores/showStore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Show() {
    const store = showStore();
    const params = useParams();

    React.useEffect(() => {
        store.fetchData(params.id);
    }, [params.id, store]);

    if (store.error) {
        return <div style={{ color: 'red' }}>{store.error}</div>;
    }

    if (!store.data || !store.data.market_data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header>
                <img src={store.data.image.large} alt={store.data.name} />
                <h2>{store.data.name} ({store.data.symbol})</h2>
            </header>
            <p>This is the show page</p>
            <AreaChart
                width={500}
                height={400}
                data={store.graphData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
            {store.data.market_data && (
                <>
                    <div>
                        <h4>24 high</h4>
                        <span>${store.data.market_data.high_24h.usd}</span>
                    </div>
                    <div>
                        <h4>24 low</h4>
                        <span>${store.data.market_data.low_24h.usd}</span>
                    </div>
                    <div>
                        <h4>circulation supply</h4>
                        <span>{store.data.market_data.circulating_supply}</span>
                    </div>
                    <div>
                        <h4>Current price</h4>
                        <span>${store.data.market_data.current_price.usd}</span>
                    </div>
                    <div>
                        <h4>1y change</h4>
                        <span>{store.data.market_data.price_change_percentage_1y.toFixed(2)}%</span>
                    </div>
                </>
            )}
        </div>
    );
}

export default Show;