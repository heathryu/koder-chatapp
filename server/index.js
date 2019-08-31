const app = require("express")();
const http = require("http").createServer(app);
const path = require("path");
const io = require('socket.io')(http);

app.get("/", (req, res) => {
    // res.send("Express is running");
    const htmlPath = path.resolve(__dirname, '..', 'index.html');
    res.sendFile(htmlPath);
})

io.on('connection', socket => {
    console.log('connected');

    socket.on('disconnect', () => {
        console.log('disconnected');
    })
})

http.listen(3001, () => {
    console.log("listening on 3001");
})