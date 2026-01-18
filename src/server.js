import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});