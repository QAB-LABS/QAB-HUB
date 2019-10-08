import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import App from './components/App.jsx'

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
