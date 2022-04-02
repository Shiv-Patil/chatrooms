import {useContext, useRef} from "react";
import {SocketContext} from "../socket";
import "../style/MainmenuView.css";
import {useState} from "react";
import {toast} from "react-toastify";

const MainmenuView = () => {
  const socket = useContext(SocketContext);
  let hasPass = true;
  let [activebtn, setActivebtn] = useState("join");

  const createRoom = () => {
    const nickname = document.getElementById("nickname").value;
    socket.emit("room:create", hasPass, nickname, res => {
      if (res.status === "error") {
        toast.error(res.message);
      } else {
        toast.success("Success");
      }
    });
  };

  const joinRoom = () => {
    const room = document.getElementById("room").value;
    const password = document.getElementById("roompass").value;
    const nickname = document.getElementById("nickname").value;
    socket.emit("room:join", room, password, nickname, res => {
      if (res.status === "error") {
        toast.error(res.message);
      }
    });
  };

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
            <TextInputGlass inputid="roompass" label="Password (leave empty if none)" />
            <FlexCardGlass className="roombutton" onClick={joinRoom} style={{margin: "6px"}}>
              Join this room
            </FlexCardGlass>
          </FlexCardGlass>
          <FlexCardGlass className="optionmenu">
            <SliderCheckBox label="Password" toggleCallback={val => (hasPass = val)} />
            <FlexCardGlass className="roombutton" onClick={createRoom} style={{margin: "6px"}}>
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

export default MainmenuView;
