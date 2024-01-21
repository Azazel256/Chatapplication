//node server, it will handle socket io connection


const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
})

const users = {};

io.on('connection',socket=>{                           //socket io instance , listens to connections(whoever connectieed)
    socket.on('new-user-joined',name=>{ 
        //console.log("New User:", name);                    //handles the connection ,what happens to the connections
        users[socket.id]=name;        //append name to user
        socket.broadcast.emit('user-joined',name);
    });
      // If someone sends a message broadcast it to other people
    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    });
    // If someone disconnects broadcast it to other people
    socket.on('disconnect', message=>{  //disconnect is built in eventuuuuu
      socket.broadcast.emit('left',users[socket.id])
      delete users[socket.id]
  });
})
