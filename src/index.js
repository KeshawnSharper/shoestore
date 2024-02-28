import React from 'react'
import ReactDOM from "react-dom/client";
import './styles.css'
import App from './App'
import { Provider } from "react-redux"
import { StoreReducer } from './reducers/reducer';
import thunk from "redux-thunk"
import logger from "redux-logger"
import { createStore,applyMiddleware } from "redux"
// import { loadState, saveState } from './localStorage';
// const rootElement = document.getElementById('root')
// const store = createStore(StoreReducer,applyMiddleware(thunk,logger))
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
const store = createStore(StoreReducer, applyMiddleware(thunk, logger));

root.render(
    <Provider store={store}>
<App />
</Provider>)
