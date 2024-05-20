
const { extractInfo } = require("../../database");
const { server } = require("../../express_setup")

const io = require('socket.io')(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  socket.on('name', name => {
    socket.join(name);
  })

  socket.on('logout', name => {
    socket.leave(name);
  })
})

const net2phone = async (req, res) => {
  console.log(req.body);
  const result = await extractInfo(req.body.dialed_number);

  io.to(req.body.name).emit("data", result);

  return res.status(200).json({ result: true });
}

module.exports = {
  net2phone
};