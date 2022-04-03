import "../style/ChatroomView.css";
import {FlexCardGlass, IndicatorButton} from "../components/components";
import React, {useEffect, useState, useContext} from "react";
import {SocketContext} from "../socket";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ReactComponent as SendIcon} from "../assets/send.svg";
import dayjs from "dayjs";

let wasScrolledDown = true;

const ChatroomView = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  let [userData, setUserData] = useState({});
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket.connected || socket.disconnected) return navigate("/", {replace: true});
    setUserData({});
    socket.emit("user:getroomdata", (room, roompass, nickname, messages) => {
      if (room) {
        setUserData({room, roompass, nickname});
        setMessages([
          ...messages.map((msgObj, index) => (
            <Message
              content={msgObj.content}
              sender={msgObj.sender}
              timesent={dayjs(msgObj.timesent).format("HH:mm")}
              key={index}
              own={socket.auth.userid === msgObj.userid}
            />
          )),
          <SystemMessage content="You joined the chat" key="own" />,
        ]);
      } else navigate("/");
    });

    socket.removeAllListeners();

    socket.on("room:receivemessage", message => {
      setWasScrolledDown();
      setMessages(messages => [
        ...messages,
        <Message
          content={message.content}
          sender={message.sender}
          timesent={dayjs(message.timesent).format("HH:mm")}
          key={messages.length}
          own={socket.auth.userid === message.userid}
        />,
      ]);
    });

    socket.on("room:receivesystemmessage", message => {
      setWasScrolledDown();
      setMessages(messages => [...messages, <SystemMessage content={message.content} key={messages.length} />]);
    });

    return () => socket.removeAllListeners();
  }, []);

  const sendMessage = () => {
    const message = document.getElementById("message-textarea").value.trim();
    if (message.length === 0) return toast.error("Message cannot be empty");
    if (message.length > 800) return toast.error("Message should not be longer than 800 characters");
    document.getElementById("message-textarea").disabled = true;
    socket.emit("user:sendmessage", message, res => {
      if (res.status === "error") toast.error(res.message);
      else document.getElementById("message-textarea").value = "";
      document.getElementById("message-textarea").disabled = false;
    });
  };

  const leaveRoom = () => {
    socket.emit("room:leave", () => {
      navigate("/");
    });
  };

  const textAreaKeyDown = e => {
    if (e.keyCode === 13) {
      if (!e.shiftKey && !e.altKey && !e.ctrlKey) {
        sendMessage();
      } else {
        return 13;
      }
      e.preventDefault();
    }
  };

  const setWasScrolledDown = () => {
    const scrollArea = document.getElementById("chat-room-messages-scrollarea");
    wasScrolledDown = scrollArea.scrollTop === scrollArea.scrollHeight - scrollArea.clientHeight;
  };

  const scrollToBottom = () => {
    const scrollArea = document.getElementById("chat-room-messages-scrollarea");
    scrollArea.scrollTop = scrollArea.scrollHeight - scrollArea.clientHeight;
  };

  useEffect(() => {
    if (wasScrolledDown) scrollToBottom();
  }, [messages]);

  return (
    <>
      <ChatRoomInfoComponent
        leaveRoom={leaveRoom}
        room={userData.room}
        roompass={userData.roompass}
        nickname={userData.nickname}
      />
      <div id="chat-room-messages-scrollarea">
        <div className="chat-room-messages-container">{messages}</div>
      </div>
      <TextArea autoFocus textareaId="message-textarea" onSendClick={sendMessage} onKeyDown={textAreaKeyDown} />
    </>
  );
};

const ChatRoomInfoComponent = props => {
  let [showRoomInfo, setShowRoomInfo] = useState(props.showRoomInfo || false);

  const copyInfo = () => {
    if (props.room) {
      const toCopy = `Room code: ${props.room}
${props.roompass ? "Room Password: " + props.roompass + "\n" : ""}My nickname: ${props.nickname}`;
      return navigator.clipboard.writeText(toCopy).then(
        () => toast.success("Copied"),
        () => toast.error("Couldn't copy")
      );
    }
    toast.error("Couldn't copy");
  };

  return (
    <>
      <IndicatorButton label="Room Info" active={showRoomInfo} onClick={() => setShowRoomInfo(!showRoomInfo)} />
      <div className="chat-room-info-container">
        <FlexCardGlass className={showRoomInfo ? "chat-room-info" : "chat-room-info collapsed"}>
          <span className="chat-room-info-item">
            Room code <br />
            <span>{props.room}</span>
          </span>
          {props.roompass ? (
            <span className="chat-room-info-item">
              Room password <br />
              <span>{props.roompass}</span>
            </span>
          ) : null}
          <span className="chat-room-info-item">
            Nickname <br />
            <span>{props.nickname}</span>
          </span>
          <div className="chat-room-info-button-container">
            <FlexCardGlass className="button" onClick={copyInfo} style={{margin: "6px"}}>
              Copy info
            </FlexCardGlass>
            <FlexCardGlass
              className="button"
              onClick={props.leaveRoom ? props.leaveRoom : () => {}}
              style={{margin: "6px"}}>
              Leave room
            </FlexCardGlass>
          </div>
        </FlexCardGlass>
      </div>
    </>
  );
};

const SystemMessage = props => {
  return <span className="system-message">{props.content}</span>;
};

const Message = props => {
  return (
    <FlexCardGlass className={props.own ? "message own" : "message"}>
      <div className="message-header">
        <span className="message-sender">{props.sender || "noobmaster69"}</span>
        <span className="message-timesent">{props.timesent || "26:29"}</span>
      </div>
      <span className="message-content">{props.content || "Yo cool..."}</span>
    </FlexCardGlass>
  );
};

const TextArea = props => {
  return (
    <div className="chat-room-text-area">
      <textarea
        id={props.textareaId}
        autoFocus={props.autoFocus}
        onKeyDown={props.onKeyDown}
        placeholder="Type here..."
        className="chat-room-text-area-textfield"
      />
      <FlexCardGlass className="chat-room-text-area-sendicon-container" onClick={props.onSendClick}>
        <SendIcon className="chat-room-text-area-sendicon" fill="#be5fddcc" />
      </FlexCardGlass>
    </div>
  );
};

export default ChatroomView;
