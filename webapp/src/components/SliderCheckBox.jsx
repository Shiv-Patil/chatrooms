import "../style/SliderCheckBox.css";
import {useState} from "react";

export const SliderCheckBox = props => {
  let [isActive, setIsActive] = useState(true);
  return (
    <div className="checkboxcontainer">
      <span>{props.label}</span>
      <div
        className={isActive ? "slidercontainer" : "slidercontainer inactive"}
        onClick={() => {
          props.toggleCallback ? props.toggleCallback(!isActive) : 0;
          setIsActive(!isActive);
        }}>
        <div className="slider" />
        <div className="handle"></div>
      </div>
    </div>
  );
};
