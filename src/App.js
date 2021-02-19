/*jshint esversion: 8 */
// imports
import React, { Component } from "react";
import "./App.scss";
import { Settings } from "./components/main.components/Settings/Settings.components";
import { select1 } from "./components/Data/inputs";
import { CustomBtn } from "./components/accessory.components/Button/Button.component";
import { Chart } from "./components/main.components/Chart/Chart.component";
import {
  bubbleSort,
  insertionSort,
  quickSort,
} from "./components/Data/sort.function";
import { ranArr, sleep } from "./components/Data/function";
import Slider from "./components/accessory.components/Slider/Slider.component";

// variable declaration
const chartWidth = 800;
const chartHeight = 400;
const defLen = 10;
let compare = "#f2a154";
let sorted = "#44CA87";
let def = "red";
let defArr = ranArr(defLen);
let delay = 10;
// class declaration
class App extends Component {
  constructor() {
    super();
    // state
    this.state = {
      arr: defArr,
      curr: "",
      range: defLen,
      selected: "random",
      algo: "",
      barVal: [chartHeight / defLen, chartWidth / (3 * defLen)],
      disable: true,
      disableTab: false,
      rRange: 0,
      rewind: [],
      rAble: false,
      arrayShow: defArr,
    };
  }

  // class functions
  handleAdd = (ev) => {
    if (!this.state.disableTab) {
      this.setState({ curr: ev.target.value });
    }
  };
  handleClick = (ev) => {
    if (!this.state.disableTab) {
      let tmpArr = [...this.state.arr];
      if (ev.target.name === "custom") {
        if (this.state.curr !== "") {
          tmpArr.push(parseInt(this.state.curr));
          const heightMult =
            chartHeight / Math.max(tmpArr.length, Math.max(...tmpArr));
          const widthMult = chartWidth / (3 * tmpArr.length);
          this.setState({
            arr: tmpArr,
            arrayShow: tmpArr,
            curr: "",
            barVal: [heightMult, widthMult],
            range: tmpArr.length,
          });
        }
      } else {
        const len = ev.target.value;
        let newArr = ranArr(len);
        const heightMult = chartHeight / newArr.length;
        const widthMult = chartWidth / (3 * newArr.length);
        this.setState({
          arr: newArr,
          arrayShow: newArr,
          range: len,
          barVal: [heightMult, widthMult],
        });
      }
    }
  };
  handleReset = (e) => {
    if (!this.state.disableTab) {
      this.setState({
        arr: defArr,
        arrayShow: defArr,
        barVal: [chartHeight / defLen, chartWidth / (3 * defLen)],
        curr: "",
        range: 150,
      });
    }
  };
  handleDelete = (e) => {
    let tmpArr = [...this.state.arr];
    if (!this.state.disableTab) {
      tmpArr.pop();
      const heightMult =
        chartHeight / Math.max(tmpArr.length, Math.max(...tmpArr));
      const widthMult = parseInt(chartWidth / tmpArr.length) - 2;
      this.setState({
        arr: tmpArr,
        arrayShow: tmpArr,
        barVal: [heightMult, widthMult],
      });
    }
  };
  handleSort = async (e) => {
    if (!this.state.disableTab) {
      // quickSort
      if (this.state.algo === "QuickSort") {
        const newArr = quickSort(this.state.arr);
        this.setState({ arr: newArr[0], time: newArr[1] });

        // insertionSort
      } else if (this.state.algo === "InsertionSort") {
        const newArr = insertionSort(this.state.arr);
        this.setState({ arr: newArr[0], time: newArr[1] });

        // bubbleSort
      } else if (this.state.algo === "BubbleSort") {
        let tmpArr = [...this.state.arr];
        let pHolder = [...this.state.arrayShow];
        const newArr = bubbleSort(tmpArr);
        await this.setState({ disableTab: true });
        const [arr, span, idxRec] = newArr;
        let bars = document.getElementsByClassName("bar");

        for (let i = 0; i < idxRec.length; i++) {
          let obj = idxRec[i];
          let barOne = bars[obj[0]];
          let barTwo = bars[obj[0] + 1];
          let val1 = pHolder[obj[0]];
          let val2 = pHolder[obj[0] + 1];
          let h1 = barOne.offsetHeight;
          let h2 = barTwo.offsetHeight;
          barOne.style.backgroundColor = compare;
          barTwo.style.backgroundColor = compare;
          await sleep(delay);
          if (obj[1] === true) {
            barOne.style.height = `${h2}px`;
            barTwo.style.height = `${h1}px`;
            pHolder[obj[0]] = val2;
            pHolder[obj[0] + 1] = val1;
          }
          await this.setState({ arrayShow: pHolder });
          await sleep(delay);
          barOne.style.backgroundColor = sorted;
          barTwo.style.backgroundColor = sorted;
          await sleep(delay);
          barOne.style.backgroundColor = def;
          barTwo.style.backgroundColor = def;
        }
        await this.setState({
          // disableTab: false,
          arr: pHolder,
          rRange: idxRec.length + 1,
          rewind: idxRec,
          rAble: true,
        });
      } else {
        console.log("Either invalid or feature under Developpment");
      }
    }
  };
  handleAlgo = (e) => {
    if (!this.state.disableTab) {
      let algo = e.target.value;
      this.setState({ algo: algo, disable: algo !== "" ? false : true });
    }
  };
  handleSlide = async (e) => {
    // for (let i = idxRec.length - 1; i >= 0; i--) {
    //   let obj = idxRec[i];
    //   let barOne = bars[obj[0]];
    //   let barTwo = bars[obj[0] + 1];
    //   let h1 = barOne.offsetHeight;
    //   let h2 = barTwo.offsetHeight;
    //   barOne.style.backgroundColor = compare;
    //   barTwo.style.backgroundColor = compare;
    //   await sleep(delay);
    //   if (obj[1] === true) {
    //     barOne.style.height = `${h2}px`;
    //     barTwo.style.height = `${h1}px`;
    //   }
    //   await sleep(delay);
    //   barOne.style.backgroundColor = def;
    //   barTwo.style.backgroundColor = def;
    // }
    let tmpArr = [...this.state.arr];
    const record = [...this.state.rewind];
    let val = e.target.value;
    let prev = this.state.rRange;
    if (
      val < record.length + 1 &&
      val > 0 &&
      val !== prev &&
      prev < record.length + 1 &&
      prev > 0
    ) {
      if (val > prev) {
        for (let i = prev + 1; i <= val; i++) {
          let bars = document.getElementsByClassName("bar");
          let step = record[i - 1];
          let barOne = bars[step[0]];
          let barTwo = bars[step[0] + 1];
          let h1 = barOne.offsetHeight;
          let h2 = barTwo.offsetHeight;
          // barOne.style.backgroundColor = compare;
          // barTwo.style.backgroundColor = compare;
          await sleep(delay);
          if (step[1] === true) {
            barOne.style.height = `${h2}px`;
            barTwo.style.height = `${h1}px`;
          }
          await sleep(delay);
          // barOne.style.backgroundColor = def;
          // barTwo.style.backgroundColor = def;
        }
      } else {
        for (let i = prev - 1; i >= val; i--) {
          let bars = document.getElementsByClassName("bar");
          let step = record[i - 1];
          let barOne = bars[step[0]];
          let barTwo = bars[step[0] + 1];
          let h1 = barOne.offsetHeight;
          let h2 = barTwo.offsetHeight;
          // barOne.style.backgroundColor = compare;
          // barTwo.style.backgroundColor = compare;
          await sleep(delay);
          if (step[1] === true) {
            barOne.style.height = `${h2}px`;
            barTwo.style.height = `${h1}px`;
          }
          await sleep(delay);
          // barOne.style.backgroundColor = def;
          // barTwo.style.backgroundColor = def;
        }
      }
    }
    this.setState({ rRange: val });
  };
  handleRelease = (e) => {
    this.setState({
      disableTab: false,
      rRange: 0,
      rewind: [],
      rAble: false,
    });
  };
  resetArr = (ev) => {
    if (!this.state.disableTab) {
      if (this.state.arr !== []) {
        this.setState({
          arr: ranArr(defLen),
          barVal: [chartHeight / defLen, chartWidth / (3 * defLen)],
          selected: ev.target.id,
          curr: "",
          range: 150,
        });
      }
    }
  };

  // render
  render() {
    return (
      <div className="customs">
        <div className="banner">
          <p>SORTED</p>
        </div>
        <div className="chart">
          <Chart Data={this.state.arr} barVal={this.state.barVal} />
        </div>

        <div className="arrayShow">
          <div>
            {this.state.arrayShow.map((op, index) => (
              <p key={index}>{op}&ensp;</p>
            ))}
          </div>
        </div>
        <div className="tub">
          <div className="settings">
            {this.state.disableTab && this.state.rAble ? (
              <div>
                <Slider
                  Val={this.state.rRange}
                  min="0"
                  max={`${this.state.rewind.length + 1}`}
                  func={this.handleSlide}
                />
                <CustomBtn
                  name="Release"
                  Class="general"
                  size="medium"
                  func={this.handleRelease}
                  disableTab={!this.state.disableTab}
                >
                  Release
                </CustomBtn>
              </div>
            ) : (
              <Settings
                inputs={select1}
                handleAdd={this.handleAdd}
                handleClick={this.handleClick}
                curr={this.state.curr}
                resetArr={this.resetArr}
                selected={this.state.selected}
                handleReset={this.handleReset}
                handleDelete={this.handleDelete}
                handleAlgo={this.handleAlgo}
                range={this.state.range}
                disableTab={this.state.disableTab}
              />
            )}
          </div>

          <CustomBtn
            name="Sort"
            Class="general"
            size="medium"
            func={this.handleSort}
            disable={this.state.disable}
            disableTab={this.state.disableTab}
          >
            Sort
          </CustomBtn>
        </div>
      </div>
    );
  }
}
export default App;
