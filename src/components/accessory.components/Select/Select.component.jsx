/*jshint esversion: 6 */
import React from "react";
import "./Select.style.scss";

export const Select = (props) => (
  <div>
    {!props.disableTab ? (
      <select
        name="cars"
        id="cars"
        defaultValue={"DEFAULT"}
        onChange={props.func}
      >
        <option value="DEFAULT" disabled>
          Choose an option ...
        </option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <select
        name="cars"
        id="cars"
        defaultValue={"DEFAULT"}
        onChange={props.func}
        disabled
      >
        <option value="DEFAULT" disabled>
          Choose an option ...
        </option>
      </select>
    )}
  </div>
);
