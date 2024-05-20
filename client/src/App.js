
import { useEffect, useState } from "react";
import { TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const socket = io.connect("http://52.15.144.174:5010");
//const socket = io.connect("http://localhost:5010");

function ToastBody(data) {
  return <div className="text-red-500 overflow-auto">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>PHONE1</TableCell>
            <TableCell>PHONE2</TableCell>
            <TableCell>PHONE3</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Billing</TableCell>
            <TableCell>Customer#</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row["PHONE1"]}</TableCell>
              <TableCell>{row["PHONE2"]}</TableCell>
              <TableCell>{row["PHONE3"]}</TableCell>
              <TableCell>{row["Service"]}</TableCell>
              <TableCell>{row["Billing"]}</TableCell>
              <TableCell>{row["Customer#"]}</TableCell>
              <TableCell>{row["Address"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
      if (msg.length > 0)
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
      <div className="m-auto flex gap-4">
        <TextField variant="outlined" size="small" label="Enter name here..." value={input} onChange={(e) => setInput(e.target.value)} />
        <Button variant="contained" onClick={login}>LOGIN</Button>
      </div>
    </div>
  }
  else {
    return (
      <div className="m-4">
        <div className="flex">
          <span className="text-4xl mr-auto">👋 Hi, {name}! Welcome to Phone Lookup System.</span>
          <Button variant="contained" onClick={logout}>LOGOUT</Button>
        </div>
        <ToastContainer
          autoClose={30000}
          position="top-center"
          className="!w-[1024px]"
          bodyClassName="max-h-[320px] overflow-auto !m-4 !items-start"
        />
      </div>
    );
  }
}

export default App;
