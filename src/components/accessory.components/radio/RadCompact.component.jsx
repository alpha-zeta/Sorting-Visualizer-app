import React from "react";
import "./RadCompact.style.scss";
import InputArea from "../../accessory.components/Input/Input.component";
import { CustomBtn } from "../Button/Button.component";
import Slider from "../Slider/Slider.component";

export const RadCompact = (props) => (
  <div className="block">
    <input
      type="radio"
      id={props.name}
      name="array"
      defaultChecked={props.name === "random" ? true : false}
      onChange={props.resetArr}
      disabled={props.disableTab}
    />
    <label>
      <p>{props.children} </p>
      {props.selected === props.name ? (
        props.type === "range" ? (
          <Slider
            Val={props.range}
            func={props.handleClick}
            max="1000"
            min="1"
            disableTab={props.disableTab}
          ></Slider>
        ) : (
          <InputArea {...props} />
        )
      ) : null}
      {props.selected === props.name && props.delete === "true" ? (
        <CustomBtn
          name="Delete"
          Class="Alert"
          size="small"
          func={props.handleDelete}
          disableTab={props.disableTab}
        >
          Delete
        </CustomBtn>
      ) : null}
    </label>
  </div>
);
