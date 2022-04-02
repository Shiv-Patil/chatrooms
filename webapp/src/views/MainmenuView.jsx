import "../style/MainmenuView.css";
import {useState} from "react";

const MainmenuView = () => {
  let [activebtn, setActivebtn] = useState("join");

  return (
    <div className="viewport">
      <span className="title">Chat Rooms</span>
      <div className="content">
        <TextInputGlass inputid="nickname" label="Nickname" />
        <div className="button-container">
          <FlexCardGlass className="roombutton" id="joinroommenubtn" onClick={() => setActivebtn("join")}>
            Join room
            <div className={activebtn === "join" ? "roombtn-indicator" : "roombtn-indicator indicator-hidden"}></div>
          </FlexCardGlass>
          <FlexCardGlass className="roombutton" id="createroommenubtn" onClick={() => setActivebtn("create")}>
            Create room
            <div className={activebtn === "create" ? "roombtn-indicator" : "roombtn-indicator indicator-hidden"}></div>
          </FlexCardGlass>
        </div>
        <div className={activebtn === "create" ? "slidingmenu-container movetoleft" : "slidingmenu-container"}>
          <FlexCardGlass className="optionmenu">
            <TextInputGlass inputid="room" label="Roomcode" />
            <FlexCardGlass className="roombutton" style={{margin: "6px"}}>
              Join this room
            </FlexCardGlass>
          </FlexCardGlass>
          <FlexCardGlass className="optionmenu">
            <SliderCheckBox id="haspass" label="Password" />
            <FlexCardGlass className="roombutton" style={{margin: "6px"}}>
              Create new room
            </FlexCardGlass>
          </FlexCardGlass>
        </div>
      </div>
    </div>
  );
};

const FlexCardGlass = props => {
  return (
    <div className={"flex-card-glass" + " " + props.className} style={props.style} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

const TextInputGlass = props => {
  return (
    <div className={"textinpglass" + " " + props.className}>
      <label htmlFor={props.inputid} className="text-input-label">
        {props.label}
      </label>
      <input id={props.inputid} className="text-input" maxLength="16" />
    </div>
  );
};

const SliderCheckBox = props => {
  let [roomhaspass, setRoomHasPass] = useState(true);
  return (
    <div className="checkboxcontainer">
      <span>{props.label}</span>
      <div className={roomhaspass ? "slidercontainer" : "slidercontainer inactive"} onClick={() => setRoomHasPass(!roomhaspass)}>
        <div className="slider" />
        <div className="handle"></div>
      </div>
    </div>
  );
};

export default MainmenuView;
