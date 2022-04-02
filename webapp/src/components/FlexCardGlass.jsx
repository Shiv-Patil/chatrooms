import "../style/FlexCardGlass.css";

export const FlexCardGlass = props => {
  return (
    <div className={"flex-card-glass" + " " + props.className} style={props.style} onClick={props.onClick}>
      {props.children}
    </div>
  );
};
