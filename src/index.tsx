import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Selected from './containers/Selected';
import Plane from './containers/Plane';
import * as serviceWorker from './serviceWorker';
import store from './ducks/createStore';

import io from 'socket.io-client';
import {
  loadInitialData,
  reservedBySomeoneElse,
  cancelledBySomeoneElse
} from './ducks/seats/actions';

const socket = io('localhost:3000');
store.dispatch(loadInitialData(socket) as any);

socket.on('reserved', ({ row, column }: { row: number; column: string }) => {
  console.log('Reserved by someone else', row, column);
  store.dispatch(reservedBySomeoneElse(row, column));
});

socket.on('cancelled', ({ row, column }: { row: number; column: string }) => {
  console.log('Cancelled seat reservation by someone else', row, column);
  store.dispatch(cancelledBySomeoneElse(row, column));
});

ReactDOM.render(
  <Provider store={store}>
    <Selected />
    <Plane socket={socket} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
