import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './views/App';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/app'>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
