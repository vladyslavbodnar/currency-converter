import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../store/store";
import * as ACTIONS from "../actions/actions";

function ExchangeRates({ listOfCurrencies, API_KEY }) {

    const state = useSelector(state => state.currencies)

    const [exchangeRates, setExchangeRates] = useState(null);

    const generateCurrencyRatesString = () => {
        const result = [];
        Object.keys(listOfCurrencies).map(currency => {
            if(currency === state.list_for_currency) {
                return;
            }

            // 2 pairs max in the free version
            if(result.length == 2) {
                return;
            }

            result.push(`${state.list_for_currency}_${currency}`);
        })
        return result.join(",")
    }

    const fetchExchangeRates = () => {
        fetch(`https://free.currconv.com/api/v7/convert?q=${generateCurrencyRatesString()}&compact=ultra&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(data => setExchangeRates(data))
    }

    return (
        <div>
            {listOfCurrencies && (
                <>
                    <select value={state.list_for_currency} onChange={(e) => store.dispatch(ACTIONS.CHANGE_LIST_FOR_CURRENCY(e.target.value))}>
                        {listOfCurrencies && Object.keys(listOfCurrencies).map(currency => (
                            <option value={currency} key={currency}>{currency}</option>
                        ))}
                    </select>

                    <button onClick={fetchExchangeRates}>Get rates</button>

                    {exchangeRates && 
                        Object.keys(exchangeRates).map(currency => {
                            const firstCurrency = currency.split("_")[0];
                            const secondCurrency = currency.split("_")[1];
                            const rate = exchangeRates[currency].toFixed(2);

                            return <p key={currency}>1 {firstCurrency} = {rate} {secondCurrency}</p>
                        })
                    }
                </>
            )}
        </div>
    )
}

export default ExchangeRates;
