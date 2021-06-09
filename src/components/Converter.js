import { useSelector } from "react-redux";
import store from "../store/store";
import * as ACTIONS from "../actions/actions";
import { useState } from "react";

function Converter({ listOfCurrencies, API_KEY }) {

    const [amount, setAmount] = useState(0);
    const [amountOutput, setAmoutOutput] = useState(null);

    const state = useSelector((state) => state.currencies);

    const fetchData = () => {
        fetch(`https://free.currconv.com/api/v7/convert?q=${state.main_currency}_${state.secondary_currency}&compact=ultra&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                let result = amount * data[Object.keys(data)[0]];
                result = result.toFixed(2);
                setAmoutOutput(result);
            })
    }


    return (
        <div className="converter">
            {listOfCurrencies && (
                <>
                    <select value={state.main_currency} onChange={(e) => store.dispatch(ACTIONS.CHANGE_MAIN_CURRENCY(e.target.value))}>
                        {listOfCurrencies &&
                            Object.keys(listOfCurrencies).map((currency) => (
                                <option value={currency} key={currency}>
                                    {currency}
                                </option>
                            ))}
                    </select>

                    <input type="number" onChange={e => setAmount(e.target.value)}/>

                    <select value={state.secondary_currency} onChange={(e) => store.dispatch(ACTIONS.CHANGE_SECONDARY_CURRENCY(e.target.value))}>
                        {listOfCurrencies &&
                            Object.keys(listOfCurrencies).map((currency) => (
                                <option value={currency} key={currency}>
                                    {currency}
                                </option>
                            ))}
                    </select>
                    
                    {amountOutput && <p>{amountOutput}</p>}

                    <button onClick={fetchData}>Get rate</button>
                </>
            )}
        </div>
    );
}

export default Converter;
