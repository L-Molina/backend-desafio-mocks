const chat = require("./src/utils/chat");

//express
const express = require("express");
const app = express();

//socket.io
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const router = require("./src/routes")

app.set('views', './src/views');
app.set('view engine', 'ejs');

//middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

//io.on
io.on('connection', async function(socket) {
    socket.on ('new-message', async function (data){
        try {
            chat.save(data);
            const messages = await chat.list();      
            io.sockets.emit('messages', messages);
        } catch (err) {
            console.log(err);
        }    
    });
});

httpServer.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
})