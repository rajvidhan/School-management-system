import React from 'react'
import ReactDOM from 'react-dom/client'
import storage from "redux-persist/lib/storage";
import App from './App.jsx'
import {Toaster} from "react-hot-toast"
import './index.css'
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./reducer";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
  key:"root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
