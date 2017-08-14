import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

require("./style.scss");

import API from './API';

import App from './components/App';

render(<App/>, document.getElementById('app'));

// API.TestOk({key1:'value1',key2:'value2'}).then((data) => {
//     console.log('TestOk return', data);
// });
// API.TestKo().then((data) => {
//     console.log('TestKo return', data);
// });
// API.TestKo2().then((data) => {
//     console.log('TestKo2 return', data);
// });
