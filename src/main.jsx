import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
const cartRootElement = document.getElementById('cart-react-root');

if (cartRootElement) {
    ReactDOM.createRoot(cartRootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
}