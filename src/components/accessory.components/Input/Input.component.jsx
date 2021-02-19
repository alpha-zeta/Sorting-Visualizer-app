/*jshint esversion: 6 */
import React, { Component } from "react";
import { CustomBtn } from "../Button/Button.component";
import "./Input.style.scss";

class InputArea extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    const {
      placeHolder,
      handleAdd,
      handleClick,
      curr,
      name,
      disableTab,
    } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="InputArea">
          <input
            name={name}
            className="text"
            type="number"
            placeholder={placeHolder}
            onChange={handleAdd}
            value={curr}
            disabled={disableTab}
          ></input>
          <CustomBtn
            name={name}
            type="submit"
            func={handleClick}
            Class="general"
            size="medium"
            disableTab={disableTab}
          >
            Submit
          </CustomBtn>
        </div>
      </form>
    );
  }
}
export default InputArea;
