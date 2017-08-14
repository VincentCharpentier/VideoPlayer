import React, {Component} from 'react';
import VideoPlayer from '../VideoPlayer';

// import styles
require('./style.scss');

const App = () => (
    <div>
        <VideoPlayer src="https://s3-eu-west-1.amazonaws.com/onrewind-test-bucket/big_buck_bunny.mp4"/>
    </div>
);

export default App;
