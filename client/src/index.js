import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

const renderApp = () =>
    render(
        // <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes />
            </Router>
        </Provider>
        // </React.StrictMode>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// serviceWorker.register();
renderApp()