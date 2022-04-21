import "../style/TextInputGlass.css";

export const TextInputGlass = props => {
  return (
    <div className={"textinpglass" + " " + props.className}>
      <label htmlFor={props.inputid} className="text-input-label">
        {props.label}
      </label>
      <input id={props.inputid} className="text-input" maxLength={props.maxLength || "16"} />
    </div>
  );
};
