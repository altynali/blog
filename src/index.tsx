import * as React from 'react'
import * as ReactDom from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {store} from './reducers/rootReducer'

//  console.log(store.getState());
 
export let state:any;

store.subscribe(() => {
  state = store.getState();
});

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter forceRefresh>
        <App />
    </BrowserRouter>
  </Provider>,
    document.getElementById('root')
)