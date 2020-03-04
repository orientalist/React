import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import Counter_reducer from './redux/reducer/Counter_reducer';

const store=createStore(Counter_reducer);

ReactDom.render(
    <Provider store={store}></Provider>
    ,document.getElementById('root')
);