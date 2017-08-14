import React, {Component} from 'react';

require("./style.scss");

export default class ProgressBar extends Component {
    get element() {
        return this.refs["main"];
    }

    render() {
        let {children, percent, thickness, fillColor, className, vertical, onMouseDown} = this.props;
        let classList = className ? [className] : [];
        classList.push("progress_bar");
        let barStyle = null;
        let bgBarStyle = {};
        if (vertical) {
            classList.push("vertical");
            barStyle = {
                height: (100*percent)+'%',
                width: thickness + "px"
            };
            bgBarStyle.width = barStyle.width;
        } else {
            classList.push("horizontal");
            barStyle = {
                height: thickness + "px",
                width:(100*percent)+'%'
            };
            bgBarStyle.height = barStyle.height;
        }
        className = classList.join(' ');
        return (
            <div ref="main" className={className} onMouseDown={onMouseDown}>
                <div className="bar bg" style={bgBarStyle}></div>
                <div className="bar progress"
                  style={barStyle}></div>
                {children}
            </div>
        );
    }
}
