import "../style/IndicatorButton.css";
import {FlexCardGlass} from "./FlexCardGlass";

export const IndicatorButton = props => {
  return (
    <FlexCardGlass
      passRef={props.passRef}
      className="button"
      onClick={props.onClick}
      onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
      }}>
      {props.label}
      <div className={props.active ? "indicator" : "indicator hidden"}></div>
    </FlexCardGlass>
  );
};
