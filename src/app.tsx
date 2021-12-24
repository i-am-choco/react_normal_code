import App from '@share/App';
import React from 'react';
import ReactDOM from 'react-dom';
const render = () => {
    ReactDOM.render(
        <App />,
        document.querySelector('#app')
    )
}
render();