import express from 'express';
import http from 'http';
import router from './router';
require("../src/db/connection");

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
app.use(express.json())

server.listen(port, () => {
    console.log(`Server start at port ${port}`);
});

app.use('/', router());