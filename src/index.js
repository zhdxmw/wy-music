import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ROUTER from './router/Index'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store/Index'

const store = configureStore()
ReactDOM.render(
    <Provider store={store}>
        <ROUTER/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
