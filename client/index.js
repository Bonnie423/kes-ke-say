import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'

import App from './components/App'

import './styles/index.css'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app')).render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  )
})
