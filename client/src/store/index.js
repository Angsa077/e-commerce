import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./reducers/productsSlice";
import { productsApi } from './actions/productsApi';
import cartReducer, { getTotals } from './reducers/cartSlice';
import authReducer, { loadUser } from './reducers/authSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

export default store;