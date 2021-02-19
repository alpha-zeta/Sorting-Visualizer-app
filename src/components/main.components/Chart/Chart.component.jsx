// jshint esversion:6
import React from "react";
import Slider from "../../accessory.components/Slider/Slider.component";
import "./Chart.style.scss";

export const Chart = (props) => (
  <div className="arrayCont">
    {props.Data.map((obj, index) => (
      <div
        key={index}
        className="bar"
        style={{
          height: `${parseInt(obj * props.barVal[0])}px`,
          width: `${props.barVal[1]}px`,
          margin: `0 ${props.barVal[1]}px`,
        }}
      ></div>
    ))}
  </div>
);
