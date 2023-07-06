import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from 'store'
const render = () => {
    ReactDOM.render(<App />, document.querySelector('#app'))
}
render()
store.subscribe(render)
