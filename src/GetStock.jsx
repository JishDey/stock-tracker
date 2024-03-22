import { useState, useEffect } from 'react';
import StockTable from './StockTable';

function GetStock() {
    const [listByTime, setListByTime] = useState([]);
    const [symbol, setSymbol] = useState('');
    const [info, setInfo] = useState('1. open');
    const [submitted, setSubmitted] = useState(false);

    async function requestStock(e){
        // setInfo("1. open");
        e.preventDefault();
        const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo");
        const res = await response.json();
        const dataSeries =  Object.entries(res["Time Series (5min)"]);
        const dataSeriesFormattedTime = dataSeries.map(value => [value[0].substring(11,19), value[1]]);
        setListByTime(dataSeriesFormattedTime);
        //console.log(listByTime.map((value)=>value[info])); //TODO: investigate - why doesn't this work on load?
        //console.log(listByTime);
        if(symbol){
          setSubmitted(true);
        }
    }

    useEffect(() => {

    },[listByTime]);

    function handleChange(e){
        e.preventDefault();
        setSymbol(e.target.value);
        setSubmitted(false);//remove to stop reset
    }
    function handleSelect(e){
        e.preventDefault();//possibly not, to reload upon reselection
        setInfo(e.target.value);
        console.log('KKKK::' + info);
        console.log(e.target.value);
        requestStock(e);
    }
    return (
        <div>
            <div className='enterTicker'>
            <input onChange={handleChange} placeholder='Enter a ticker symbol'></input>  
            <select onChange={handleSelect}>
                <option value="1. open">open</option>
                <option value="2. high">high</option>
                <option value="3. low">low</option>
                <option value="4. close">close</option>
                <option value="5. volume">volume</option>
            </select>
            <button onClick={requestStock}>Submit</button>
            </div>
            <div className='stockInfo'>
                <label>{submitted?symbol:''}</label>
                <br/>
                {submitted && <StockTable
                    listByTime={listByTime}
                    info={info}
                />}
            </div>
        </div>
    )
}
export default GetStock;