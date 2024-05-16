
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://52.15.144.174:5010");

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const callback =  (msg) => {
      setData(prevData => [...prevData, msg]);
    };
  
    socket.on("data", callback);
  
    return () => {
      socket.off("data", callback);
    };
  }, []);

  return (
    data.map((ele, i) => {
      return <div key={i}>
        <h1>Call from {ele.name}</h1>
        {
          ele.data.map((item, j) => {
            return <div key={j}>
              {JSON.stringify(item)}
            </div>
          })
        }
      </div>
    })
  );
}

export default App;
