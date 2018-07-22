	const path = require('path');
	const http = require('http');

	const express = require('express');
	const socketIO = require('socket.io');

	const publicPath = path.join(__dirname, '../public');
	const port = process.env.PORT || 3000;
	var app = express();
	var server = http.createServer(app);
	var io = socketIO(server);

	app.use(express.static(publicPath));

	io.on('connection',(socket)=>{
		console.log('new user connected');

		socket.emit('newEmail',
		{
			from: "kalpeshrajvir@gmail.com",
			subject: "this is test socket"
		});

		socket.emit('newMessage',
		{
			messaage: "New Message recieved"
		});		

		socket.on('disconnect',()=>{
			console.log('User disconnected');
		});

		socket.on('createEmail',(newEmail)=>{
			console.log('create Email',newEmail);
		});

		socket.on('createMessage',(message)=>{
			console.log('create Message',message);
		});				
	});


	server.listen(port, () => {
	  console.log(`Server is up on ${port}`);
	});	

