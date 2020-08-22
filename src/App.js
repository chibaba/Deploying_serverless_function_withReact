import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "./App.css";

function App() {
  // create coins variable set to empty array
  const [coins, updateCoins] = useState([]);
  // create additional state to hold user input
  const [input, updateInput] = useState({ limit: 5, start: 0 });
  // craete a new function to allow user to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }
  // Define function to all api
  async function fetchCoins() {
    const { limit, start } = input;
    const data = await API.get(
      "cryptoapi",
      `/coins?limit=${limit}&start=${start}`
    );
    updateCoins(data.coins);
  }
  //Add input fields to the UI for the user input

  // call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <div className="App">
      {coins.map((coin, index) => (
        <div key={index}>
          <h2>
            {coin.name} - {coin.symbol}
          </h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}

      <input
        onChange={(e) => updateInputValues("limit", e.target.value)}
        placeholder="limit"
      />
      <input
        placeholder="start"
        onChange={(e) => updateInputValues("start", e.target.value)}
      />

      <button onClick={fetchCoins}>Fetch Coins</button>
    </div>
  );
}

export default App;
