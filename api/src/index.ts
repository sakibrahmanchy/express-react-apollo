import express from 'express';
import path from 'path';
import createServer from './server';

const server = createServer();

const port = process.env.PORT || 4000;

server.use(express.static(path.join(__dirname, '../../', 'build')));
server.use(express.static('public'));

server.listen(port, () => {
  console.log(`Server ready at ${port}`);
});
