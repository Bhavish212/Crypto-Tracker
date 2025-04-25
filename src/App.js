import React from 'react';
import CryptoTable from './components/CryptoTable';


const App = () => {
  return (
    <div className="app">
      <h1>Top 10 Cryptocurrencies</h1>
      <CryptoTable />
    </div>
  );
};

export default App;
