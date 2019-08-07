import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getStore from './utils/redux-utils';
import ScrollToTop from './components/utils/ScrollToTop';

import './index.css';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = getStore();

const app = (
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <App />
      </Provider>
    </ScrollToTop>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
