import "../style/App.css";
import {Outlet} from "react-router-dom";
import {SocketContext, socket} from "../socket.js";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Slide} from "react-toastify";
toast.configure({
  draggable: false,
  theme: "light",
  position: "bottom-center",
  autoClose: 2000,
  transition: Slide,
});

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Outlet />
    </SocketContext.Provider>
  );
}

export default App;
