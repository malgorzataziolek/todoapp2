const express = require('express');
const socket = require('socket.io');
const path = require('path');
const app = express();

let tasks = [];

app.use((req, res) => {
	res.status(404).send({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running...');
});

const io = socket(server);

io.on('connection', socket => {
	console.log('New client ! Its id - ' + socket.id);
	socket.emit('updateData', tasks);

	socket.on('addTask', task => {
		console.log(`Added task: ${task.name} id: ${task.id} by: ${socket.id}`);
		tasks.push(task);
		socket.broadcast.emit('addTask', task);
	});
});
