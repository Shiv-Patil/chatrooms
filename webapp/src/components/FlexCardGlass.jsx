import "../style/FlexCardGlass.css";

export const FlexCardGlass = props => {
  return (
    <div
      className={"flex-card-glass" + " " + props.className}
      style={props.style}
      onMouseDown={props.onMouseDown}
      onClick={props.onClick}
      ref={props.passRef}>
      {props.children}
    </div>
  );
};
