/*jshint esversion: 6 */
import React, { Component } from "react";
import "./Slider.style.scss";
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { Val, func, disableTab, min, max } = this.props;
    return (
      <div>
        <input
          type="range"
          min={`${min}`}
          max={`${max}`}
          value={parseInt(Val)}
          onChange={func}
          disabled={disableTab}
        />
        <div>{Val}</div>
      </div>
    );
  }
}
