import { useState } from 'react';

function GetStock() {
    const listByTime = [];
    const [symbol, setSymbol] = useState("");
    const [submitted, setSubmitted] = useState(false);
    async function requestStock(e){
        e.preventDefault();
        const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo");
        const res = await response.json();
        const timeSeries = Object.values(res["Time Series (5min)"]);
        console.log(timeSeries);
        if(symbol){
          setSubmitted(true);
          console.log("reached");
        }
    }
    function handleChange(e){
        e.preventDefault();
        setSymbol(e.target.value);
        setSubmitted(false);//remove to stop reset
    }
    return(
        <div>
            <div className='enterTicker'>
            <input onChange={handleChange} placeholder='ABCD'></input>  
            <button onClick={requestStock}>Submit</button>
            </div>
            <div className='stockInfo'>
            <p>
                {submitted?symbol:""}
            </p>
            </div>
        </div>
    )
}
export default GetStock;