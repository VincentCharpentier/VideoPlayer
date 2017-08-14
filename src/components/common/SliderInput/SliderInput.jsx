import React, {Component} from 'react';
import autobind from 'autobind-decorator';

require("./style.scss");

import ProgressBar from '~/src/components/common/ProgressBar';

export default class SliderInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            position: props.value ? props.value : 0
        }
    }

    get progressBar() {
        return this.refs['bar'].element;
    }

    get isVertical() {
        return !!this.props.vertical;
    }


    updateDragPos(mousePos) {
        let bbox = this.progressBar.getBoundingClientRect();
        let relativePos = this.isVertical ?
            (bbox.bottom - mousePos) / bbox.height :
            (mousePos - bbox.left) / bbox.width;
        let ratio = Math.min(Math.max(relativePos, 0), 1);
        // value needs to insta-update because it may be used syncronously
        this.state.position = ratio;
        // trigger state update anyway
        this.setState({});
    }

    @autobind
    onMouseDown(e) {
        // begin drag
        // bind window.onmouseup and onmousemove because mouse can be moved/released elsewhere
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseup", this.onMouseUp);
        this.updateDragPos(e[this.isVertical ? "clientY" : "clientX"]);
        this.setState({isDragging:true});
    }
    @autobind
    onMouseUp(e) {
        // end drag
        // unbind window.onmouseup and mousemove
        window.removeEventListener("mouseup", this.onMouseUp);
        window.removeEventListener("mousemove", this.onMouseMove);
        this.updateDragPos(e[this.isVertical ? "clientY" : "clientX"]);
        // Value
        let newValue = this.state.position;
        this.setState({
            isDragging:false
        });
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }
    @autobind
    onMouseMove(e) {
        this.updateDragPos(e[this.isVertical ? "clientY" : "clientX"]);
    }

    render() {
        let { isDragging, position } = this.state;
        let { value, thickness, children } = this.props;
        // elements styles
        let sliderStyle = {
            padding: this.isVertical ?
                `${thickness}px 0` :
                `0 ${thickness}px`
        }
        let indStyle = {
            height: (thickness * 2) + "px",
            width: (thickness * 2) + "px"
        };
        indStyle[this.isVertical ? "bottom" : "left"] =
            ((isDragging ? position : value) * 100) + '%';
        let lineStyle = {};
        lineStyle[this.isVertical ? "height" : "width"] =
            (value * 100) + '%';
        return (
            <div className="slider_input" style={sliderStyle} onMouseDown={this.onMouseDown}>
                <ProgressBar ref="bar" vertical={this.isVertical} percent={value} thickness={thickness}>
                    {children}
                    <div className="indicator" style={indStyle}></div>
                </ProgressBar>
            </div>
        )
    }
}
// <div className="wrapper">
// <div className="line bg"></div>
// <div className="line fill" style={lineStyle}></div>
//
// </div>

// export ProgressBar;
// export LoadingBar;
