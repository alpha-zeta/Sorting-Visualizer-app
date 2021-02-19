/*jshint esversion: 6 */
import React from "react";
import "./Setings.style.scss";
import { Select } from "../../accessory.components/Select/Select.component";
import { RadCompact } from "../../accessory.components/radio/RadCompact.component";
import { CustomBtn } from "../../accessory.components/Button/Button.component";
export const Settings = (props) => (
  <div>
    <RadCompact
      name="random"
      placeHolder="enter the array length"
      type="range"
      {...props}
    >
      Use on random array of length{" "}
    </RadCompact>
    <RadCompact
      name="custom"
      placeHolder="enter the values"
      delete="true"
      {...props}
      type="normal"
    >
      Make an custom array, insert here{" "}
    </RadCompact>
    <Select
      className="Select"
      options={props.inputs.val}
      func={props.handleAlgo}
      disableTab={props.disableTab}
    />
    <CustomBtn
      name="Reset"
      Class={props.disabletab ? "disabledBtn" : "primaryBtn"}
      size="large"
      func={props.handleReset}
      disableTab={props.disableTab}
    >
      Reset
    </CustomBtn>
  </div>
);
