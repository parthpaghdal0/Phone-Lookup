
const { extractInfo } = require("../../database");
const { server } = require("../../express_setup")

const io = require('socket.io')(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST']
  }
});

const net2phone = async (req, res) => {
  console.log(req.body);
  const result = await extractInfo(req.body.dialed_number);

  io.emit("data", {data: result, name: req.body.user_name});

  return res.status(200).json({ result: true });
}

module.exports = {
  net2phone
};