import React, {Component} from 'react';
import autobind from 'autobind-decorator';

import {toTimeLabel} from '~/src/utils';

import ProgressBar from '~/src/components/common/ProgressBar'
import SliderInput from '~/src/components/common/SliderInput'

const SLIDER_THICKNESS = 8; //px

class VideoControls extends Component {
    constructor() {
        super();
        this.state = {
            hoverPosRatio: 0
        }
    }

    // When time control is hovered, show time tooltip
    @autobind
    onTimeCtrlHover(e) {
        let time_controller = this.refs['tc'];
        let box = time_controller.getBoundingClientRect();
        let ratio = (e.clientX - box.left) / box.width;
        this.setState({hoverPosRatio: ratio});
    }

    render() {
        // shorthand on props
        let {
            isPlaying, isFullScreen, isMuted,
            time, duration, volume, bufferEndRatio, volumeRatio,
            setTime, setVolume, togglePlay, toggleFS, toggleMute
        } = this.props;
        // shorthand on state
        let { hoverPosRatio } = this.state;
        // compute values & styles
        let timeRatio = time / duration,
            // styles
            tlStyle = {left: (100 * hoverPosRatio) + "%"},
            tlText = toTimeLabel(hoverPosRatio * duration),
            playTimeLabel = (
                <span>{toTimeLabel(time)}&nbsp;/&nbsp;{toTimeLabel(duration)}</span>
            ),
            volumeIcon = isMuted ? "volume_off" :
                volume > .66 ? "volume_up" :
                volume > .33 ? "volume_down" :
                "volume_mute";
        return (
            <div className="controls">
                {/* PLAY/PAUSE BUTTON */}
                <div className="play_button button">
                    <i className="material-icons" onClick={togglePlay}>
                        {isPlaying ? 'pause':'play_arrow'}
                    </i>
                </div>
                <div>
                    {playTimeLabel}
                </div>
                {/* TIME CONTROLLER */}
                <div ref="tc" className="time_ctrl" onMouseMove={this.onTimeCtrlHover}>
                    <SliderInput thickness={SLIDER_THICKNESS} value={timeRatio} onChange={setTime}>
                        <ProgressBar thickness={SLIDER_THICKNESS} className="buffered" percent={bufferEndRatio}/>
                    </SliderInput>
                    {/* time tooltip helper */}
                    <div className="time_label" style={tlStyle}>
                        {tlText}
                    </div>
                </div>
                {/* VOLUME CONTROLLER */}
                <div className="button volume_ctrl">
                    <i className="material-icons" onClick={toggleMute}>
                        {volumeIcon}
                    </i>
                    <div className="slider_box">
                        <SliderInput value={volume} onChange={setVolume} thickness={SLIDER_THICKNESS} vertical/>
                    </div>
                </div>
                {/* FULLSCREEN BUTTON */}
                <div className="button">
                    <i className="material-icons" onClick={toggleFS}>
                        {isFullScreen ? "fullscreen_exit" : "fullscreen"}
                    </i>
                </div>
            </div>
        );
    }
}

export default VideoControls;
