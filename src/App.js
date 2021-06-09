import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Converter from "./components/Converter";
import ExchangeRates from "./components/ExchangeRates";
import { useState, useEffect } from "react";
import store from "./store/store";
import * as ACTIONS from "./actions/actions";
import { useSelector } from "react-redux";
import watch from 'redux-watch'

const API_KEY = "c942cc3f9f5de3dadacc";

function App() {

    const state = useSelector((state) => state.currencies);

    const [listOfCurrencies, setListOfCurrencies] = useState(null);

    const fetchListOfCurrencies = () => {
        fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => setListOfCurrencies(data.results));
    };

    const saveToLocalStorage = (data) => {
        localStorage.setItem("currencies", JSON.stringify(data));
    };

    const getFromLocalStorage = () => {
      if(localStorage.getItem("currencies")) {
        store.dispatch(ACTIONS.INITIALIZE_STATE(JSON.parse(localStorage.getItem("currencies"))))
      }
    }
    
    store.subscribe(() => saveToLocalStorage());

    useEffect(() => {
        fetchListOfCurrencies();
        getFromLocalStorage();
    }, []);

    

    let w = watch(store.getState, 'currencies')
    store.subscribe(w((newVal, oldVal, objectPath) => {
      saveToLocalStorage(newVal);
    }))

    return (
        <Router>
            <div className="app">

                <NavBar />

                <Switch>
                    <Route exact path="/">
                        <Converter listOfCurrencies={listOfCurrencies} API_KEY={API_KEY} />
                    </Route>
                    <Route path="/exchange-rate">
                        <ExchangeRates listOfCurrencies={listOfCurrencies} API_KEY={API_KEY} />
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}

export default App;
