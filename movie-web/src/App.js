import styles from "./App.module.css"
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [conis, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  },[]);
  return (
    <div>
      <h1>The Coins!{loading ? "" : (conis.length)}</h1>
      {loading ? 
        (<strong>Loading...</strong>)
      : (<select>
        {conis.map((item) => 
          <option>{item.name} ({item.symbol}) : {item.quotes.USD.price} USD</option>
        )}
      </select>)}
    </div>
  );
}

export default App;
