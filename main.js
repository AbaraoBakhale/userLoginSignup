const http=require('http');
const app=require("./app");
const server=http.createServer(app);

server.listen(2701,console.log("running  http://localhost:2701"));