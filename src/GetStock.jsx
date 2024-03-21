import { useState } from 'react';

function GetStock() {
    const [listByTime, setListByTime] = useState("");
    const [symbol, setSymbol] = useState("");
    const [info, setInfo] = useState("open");
    const [submitted, setSubmitted] = useState(false);
    async function requestStock(e){
        e.preventDefault();
        const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo");
        const res = await response.json();
        const timeSeries =  Object.values(res["Time Series (5min)"]);
        setListByTime(timeSeries);
        //console.log(listByTime);
        //console.log(listByTime.map((value)=>value["1. open"]));
        if(symbol){
          setSubmitted(true);
        }
    }
    function handleChange(e){
        e.preventDefault();
        setSymbol(e.target.value);
        setSubmitted(false);//remove to stop reset
    }
    function handleSelect(e){
        e.preventDefault();//possibley not, to reload upon reselection
        setInfo(e.target.value);
    }
    return(
        <div>
            <div className='enterTicker'>
            <input onChange={handleChange} placeholder='ABCD'></input>  
            <select onChange={handleSelect}>
                <option value="1. open">open</option>
                <option value="2. close">high</option>
                <option value="low">low</option>
                <option value="close">close</option>
                <option value="volume">volume</option>
            </select>
            <button onClick={requestStock}>Submit</button>
            </div>
            <div className='stockInfo'>
                <label>{submitted?symbol:''}</label>
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <tl>19:55 utc </tl>
                            <tl>opening value:</tl>
                        </tr>
                        {submitted?listByTime.map((value)=>{
                                return (<tr>
                                        <tl>+5m </tl>
                                        <tl>{value["1. open"]}</tl>
                                    </tr>)
                            }):<tr/>}
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}
export default GetStock;