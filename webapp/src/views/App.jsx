import "../style/App.css";
import {Outlet} from "react-router-dom";
import {toast} from "react-toastify";
toast.configure({
  draggable: false,
  theme: "light",
  position: "top-right",
  autoClose: 1500,
  transition: Slide,
});
import "react-toastify/dist/ReactToastify.css";
import {Slide} from "react-toastify";
import {SocketContext, socket} from "../socket.js";

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
