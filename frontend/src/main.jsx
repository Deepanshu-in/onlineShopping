import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import productReducer, { productsFetch } from './features.js/productSlice.js'
import { productsApi } from './features.js/productsApi.js'


const store=configureStore({
   reducer:{
    products:productReducer,
    [productsApi.reducerPath]:productsApi.reducer,
   },
   middleware:(getDefaultMiddleware)=>{
     return getDefaultMiddleware().concat(productsApi.middleware)
   }
})

store.dispatch(productsFetch())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
)
