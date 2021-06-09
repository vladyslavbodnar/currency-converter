import * as ACTIONS from "../actions/actions";

const stateCurrencies = {
    main_currency: "EUR",
    secondary_currency: "USD",
    list_for_currency: "USD",
}

export default function currenciesReducer(state = stateCurrencies, action) {
    switch (action.type) {
        case ACTIONS.CHANGE_MAIN_CURRENCY().type:
            return {...state, main_currency: action.payload};
        case ACTIONS.CHANGE_SECONDARY_CURRENCY().type:
            return {...state, secondary_currency: action.payload};
        case ACTIONS.CHANGE_LIST_FOR_CURRENCY().type:
            return {...state, list_for_currency: action.payload};
        case ACTIONS.INITIALIZE_STATE().type:
            return action.payload;
        default:
            return state;
    }
}