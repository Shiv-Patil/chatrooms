import "../style/App.css";
import {Outlet} from "react-router-dom";
import {SocketContext, socket} from "../socket.js";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Slide} from "react-toastify";
toast.configure({
  draggable: false,
  theme: "light",
  position: "top-right",
  autoClose: 1500,
  transition: Slide,
});

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="viewport">
        <Outlet />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
