// jshint esversion:6
import React from "react";
import "./Button.style.scss";

export const CustomBtn = (props) => (
  <div>
    <button
      name={props.name}
      type={props.type}
      onClick={props.disableTab || props.disable ? null : props.func}
      className={props.Class + " " + props.size}
    >
      {props.children}
    </button>
  </div>
);
