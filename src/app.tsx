import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/app.less';
const render = () => {
    ReactDOM.render(
        <div className={styles.test}>12345</div>,
        document.querySelector('#app')
    )
}
render();