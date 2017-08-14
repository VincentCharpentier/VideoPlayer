import React, {Component} from 'react';

import autobind from 'autobind-decorator';

import VideoControls from './VideoControls';

// import styles
require('./style.scss');

// Double click delay (ms)
const DBLC_DELAY = 600;

export default class VideoPlayer extends Component {
    constructor() {
        super();
        // state init
        this.state = {
            currentTime: 0,
            duration: 0,
            volume: 1,
            bufferEndRatio: 0,
            isPlaying: false,
            isFullScreen: false,
            isMuted: false
        };

        // multiple implementations for FS detection
        window.addEventListener("fullscreen", this.onFullScreenChange);
        window.addEventListener("fullscreenchange", this.onFullScreenChange);
        window.addEventListener("webkitfullscreenchange", this.onFullScreenChange);
        window.addEventListener("mozfullscreenchange", this.onFullScreenChange);
    }

    // --------------------- GETTERS
    get element() {
        return this.refs["main"];
    }
    get video() {
        return this.refs["video"];
    }

    get currentBufferEndRatio() {
        let video = this.video;
        if (video && video.duration > 0) {
            // from last to first
            for (let i = video.buffered.length-1; i >= 0;i--) {
                if (video.buffered.start(i) < video.currentTime) {
                    return video.buffered.end(i) / video.duration;
                }
            }
        }
        return null;
    }

    get isFullScreen() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
            return true;
        }
        return false;
    }
    // --------------------- END GETTERS

    // --------------------- VIDEO EVENTS
    @autobind
    loadedMetadata() {
        this.setState({
            duration: this.video.duration
        });
    }
    @autobind
    timeUpdate() {
        this.setState({
            currentTime:this.video.currentTime
        });
    }
    @autobind
    onPaused() {
        this.setState({
            isPlaying: false
        });
    }
    @autobind
    onPlay() {
        this.setState({
            isPlaying: true
        });
    }
    // --------------------- END VIDEO EVENTS

    // --------------------- OTHER EVENTS
    @autobind
    onFullScreenChange() {
        // detect ESC to exit fullscreen mode
        if ( !this.isFullScreen && this.state.isFullScreen ) {
            this.setState({isFullScreen: false});
        }
    }
    // --------------------- END OTHER EVENTS

    // --------------------- CONTROLS
    @autobind
    setVolume(ratio) {
        this.video.volume = ratio;
        this.setState({
            volume: ratio,
            isMuted:false
        });
    }
    @autobind
    setTime(ratio) {
        let time = ratio * this.state.duration;
        this.video.currentTime = time;
        this.setState({
            currentTime:time
        });
    }
    @autobind
    togglePlay() {
        if (this.state.isPlaying) {
            // should pause
            this.video.pause();
        } else {
            // should play
            this.video.play();
        }
    }
    @autobind
    toggleFS() {
        if (this.state.isFullScreen) {
            // disable FS
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozExitFullScreen) {
                document.mozExitFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            // enable FS
            let elem = this.refs['main'];
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        }
        this.setState({
            isFullScreen: !this.state.isFullScreen
        });
    }
    @autobind
    toggleMute() {
        if (this.state.isMuted) {
            // should unmute
            this.video.volume = this.state.volume;
            this.setState({isMuted:false});
        } else {
            // should mute
            this.video.volume = 0;
            this.setState({isMuted:true});
        }
    }
    @autobind
    videoClicked() {
        this.togglePlay();
        if (this.prevClickClose) {
            this.toggleFS();
            this.prevClickClose = false;
            clearTimeout(this._videoClicked_t);
        } else {
            clearTimeout(this._videoClicked_t);
            this.prevClickClose = true;
            this._videoClicked_t = setTimeout(() => {
                this.prevClickClose = false;
            }, DBLC_DELAY);
        }
    }
    // --------------------- END CONTROLS

    render() {
        let {
            currentTime,
            duration,
            volume,
            isPlaying,
            isFullScreen,
            isMuted
        } = this.state;
        return (
            <div ref="main" className="video_player">
                <div className="wrapper">
                    <video ref="video" src={this.props.src} preload="metadata"
                    onLoadedMetadata={this.loadedMetadata}
                    onTimeUpdate={this.timeUpdate}
                    onPause={this.onPaused}
                    onPlay={this.onPlay}
                    onProgress={this.onProgress}
                    onVolumeChange={this.onVolumeChange}
                    onClick={this.videoClicked}>
                    Votre navigateur ne permet pas de lire les vidéos.
                    </video>
                    <VideoControls
                    time={currentTime}
                    duration={duration}
                    volume={volume}
                    isPlaying={isPlaying}
                    isFullScreen={isFullScreen}
                    isMuted={isMuted}
                    bufferEndRatio={this.currentBufferEndRatio}
                    setTime={this.setTime}
                    setVolume={this.setVolume}
                    togglePlay={this.togglePlay}
                    toggleFS={this.toggleFS}
                    toggleMute={this.toggleMute}
                    />
                </div>
            </div>
        );
    }
}
