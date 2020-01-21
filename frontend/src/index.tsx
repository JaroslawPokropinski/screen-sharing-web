import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import App from './views/App';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <Router basename='/app'>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
