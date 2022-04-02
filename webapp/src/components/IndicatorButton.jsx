import "../style/IndicatorButton.css";
import {FlexCardGlass} from "./FlexCardGlass";

export const IndicatorButton = props => {
  return (
    <FlexCardGlass className="button" onClick={props.onClick}>
      {props.label}
      <div className={props.active ? "indicator" : "indicator hidden"}></div>
    </FlexCardGlass>
  );
};
