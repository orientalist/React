import React from 'react';
import {ReactDOM,render,unmountComponentAtNode} from 'react-dom';
import './index.css';
import Counter from './Counter';
import MessageList from './MessageList';
import MessageList_Context from './MessageList_Context';
import App from './App';
import currentValue from './App_redux';

console.log('第一次掛載');
let instance=render(<h1>{currentValue}</h1>, document.getElementById('root'));

window.renderComponent=()=>{
    console.log('掛載');
    instance=ReactDOM.render(<App />, document.getElementById('root'));
};

window.setState=()=>{
    console.log('更新');
    instance.setState({foo:'bar'});
};

window.unmountComponentAtNode=()=>{
    console.log('移除');
    unmountComponentAtNode(document.getElementById('root'));
};