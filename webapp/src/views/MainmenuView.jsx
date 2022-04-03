import {useContext, useEffect} from "react";
import {SocketContext} from "../socket";
import "../style/MainmenuView.css";
import {useState} from "react";
import {toast} from "react-toastify";
import {FlexCardGlass, IndicatorButton, SliderCheckBox, TextInputGlass} from "../components/components";
import {useNavigate} from "react-router-dom";

const MainmenuView = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  let hasPass = true;
  let [activebtn, setActivebtn] = useState("join");

  useEffect(() => {
    const [nickname, room, roompass] = [
      // Last used nickname, room
      localStorage.getItem("nickname"),
      localStorage.getItem("room"),
      localStorage.getItem("roompass") || "",
    ];
    if (nickname) document.getElementById("nickname").value = nickname;
    if (room)
      socket.emit("room:check", room, roompass, exists => {
        // Check if room still exists in the server
        if (exists) {
          document.getElementById("room").value = room;
          document.getElementById("roompass").value = roompass; // Autofill if it exists, remove from storage if it doesn't
        } else {
          localStorage.removeItem("room");
        }
      });
  }, []);

  const roomJoinedCallback = res => {
    if (res.status === "error") {
      toast.error(res.message);
    } else {
      localStorage.setItem("nickname", res.nickname);
      localStorage.setItem("room", res.room);
      localStorage.setItem("roompass", res.password);
      navigate("chatroom/", {state: {nickname: res.nickname, room: res.room, roompass: res.password}});
    }
  };

  const createRoom = () => {
    const nickname = document.getElementById("nickname").value;
    socket.emit("room:create", hasPass, nickname, roomJoinedCallback);
  };

  const joinRoom = () => {
    const room = document.getElementById("room").value;
    const password = document.getElementById("roompass").value;
    const nickname = document.getElementById("nickname").value;
    socket.emit("room:join", room, password, nickname, roomJoinedCallback);
  };

  return (
    <>
      <span className="title">Chat Rooms</span>
      <div className="mainmenu-content">
        <TextInputGlass inputid="nickname" label="Nickname" />

        <div className="room-option-button-container">
          <IndicatorButton label="Join room" active={activebtn === "join"} onClick={() => setActivebtn("join")} />
          <IndicatorButton label="Create room" active={activebtn === "create"} onClick={() => setActivebtn("create")} />
        </div>

        <div className={activebtn === "create" ? "slidingmenu-container movetoleft" : "slidingmenu-container"}>
          <FlexCardGlass className="optionmenu">
            <TextInputGlass inputid="room" label="Roomcode" />
            <TextInputGlass inputid="roompass" label="Password (leave empty if none)" />
            <FlexCardGlass className="button" onClick={joinRoom} style={{margin: "6px"}}>
              Join this room
            </FlexCardGlass>
          </FlexCardGlass>

          <FlexCardGlass className="optionmenu">
            <SliderCheckBox label="Password" toggleCallback={val => (hasPass = val)} />
            <FlexCardGlass className="button" onClick={createRoom} style={{margin: "6px"}}>
              Create new room
            </FlexCardGlass>
          </FlexCardGlass>
        </div>
      </div>
    </>
  );
};

export default MainmenuView;
