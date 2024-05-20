
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const socket = io.connect("http://52.15.144.174:5010");
//const socket = io.connect("http://localhost:5010");

function ToastBody(data) {
  return <div className="text-red-500">
    {JSON.stringify(data)}
  </div>
}

function App() {
  //const [data, setData] = useState([]);
  const [name, setName] = useState(() => {
    const sessName = sessionStorage.getItem("SESS_NAME");
    if (sessName === null)
      return "";
    return sessName;
  });
  const [input, setInput] = useState(name);

  useEffect(() => {
    const callback = (msg) => {
      toast(ToastBody(msg));
      //setData(prevData => [...prevData, msg]);
    };

    socket.on("data", callback);

    return () => {
      socket.off("data", callback);
    };
  }, []);

  useEffect(() => {
    if (name !== "")
      socket.emit('name', name);
  }, [name]);

  const login = () => {
    sessionStorage.setItem("SESS_NAME", input);
    setName(input);
    setInput("");
  }

  const logout = () => {
    socket.emit('logout', name);
    sessionStorage.removeItem("SESS_NAME");
    setName("");
  }

  if (name === "") {
    return <div className="h-screen flex">
      <div className="m-auto flex">
        <input placeholder="Enter name here..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={login}>LOGIN</button>
      </div>
    </div>
  }
  else {
    return (
      <div className="m-4">
        <div className="flex">
          <span className="text-4xl mr-auto">👋 Hi, {name}! Welcome to Phone Lookup System.</span>
          <button onClick={logout}>LOGOUT</button>
        </div>
        <ToastContainer 
          autoClose={3000}
          hideProgressBar={true}
          position="top-center"
        />
      </div>
    );
  }
}

export default App;
