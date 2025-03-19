import React from "react";
import { useParams } from "react-router-dom";
import showStore from "../stores/showStore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from "../components/helpers/header";

function Show() {
    const store = showStore();
    const params = useParams();

    React.useEffect(() => {
        store.fetchData(params.id);
    }, [params.id, store]);

    if (store.error) {
        return <div style={{ color: 'red' }}>{store.error}</div>;
    }

    if (!store.data) {
        return <div>Loading...</div>;
    }

    return (
      <div className="show">
        <div>
            <Header back /> 
            <header className="show-header">
                <img src={store.data.image.large} alt={store.data.name} />
                <h2>{store.data.name} ({store.data.symbol})</h2>
            </header>
            <div className="width">
            <div className="show-graph">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart
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
            </ResponsiveContainer>
            </div>

            </div>
                 <div className="show-details">
                   <div className="width"> 
                    <h2>Details</h2>
                    
                    <div className="show-details-row">
                    <h3>Market cap rank</h3>
                    <span>{store.data.market_cap_rank}</span>
                    </div>

                    <div className="show-details-row">
                        <h3>24 high</h3>
                        <span>${store.data.market_data.high_24h.usd}</span>
                    </div>
                    <div className="show-details-row">
                        <h3>24 low</h3>
                        <span>${store.data.market_data.low_24h.usd}</span>
                    </div>
                    <div className="show-details-row">
                        <h4>circulation supply</h4>
                        <span>{store.data.market_data.circulating_supply}</span>
                    </div>

                    <div className="show-details-row">
                        <h3>Current price</h3>
                        <span>${store.data.market_data.current_price.usd}</span>
                    </div>
                    
                    <div className="show-details-row">
                        <h3>1y change</h3>
                        <span>{store.data.market_data.price_change_percentage_1y.toFixed(2)}%</span>
                    </div>
                    </div>
                    </div>
                </div>
                
                </div>  
    );
}

export default Show;


