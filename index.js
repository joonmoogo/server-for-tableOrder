const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
 const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const cors = require('cors');
app.use(cors());

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')
})

app.get('/data',(req,res)=>{
    res.json({name:'oh',age:26,major:'computer science'})
})

io.on('connection', (socket) => {
  console.log(`${socket.id} has entered`);
  socket.on('order',(data)=>{
    console.log(data)
    io.emit('userOrder',data);
  })
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
