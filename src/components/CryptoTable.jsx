import React, { useEffect, useState } from 'react';

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoins = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <table className="crypto-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>24h Change</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.id}>
            <td>{index + 1}</td>
            <td>
              <img src={coin.image} alt={coin.name} width="25" />
              {coin.name} ({coin.symbol.toUpperCase()})
            </td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;
