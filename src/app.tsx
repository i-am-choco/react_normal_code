import { Test } from '@components/test';
import React from 'react';
import ReactDOM from 'react-dom';
const render = () => {
    ReactDOM.render(
        <Test />,
        document.querySelector('#app')
    )
}
render();