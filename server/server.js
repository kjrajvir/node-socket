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

		socket.emit('newMessage',
		{
			from: 'Admin',
			text: "welcome to the chat app"
		});

		socket.broadcast.emit('newMessage',{
			from: 'Admin',
			text: 'New user logged in',
			creatdAt: new Date().getTime()
		})

/*		socket.emit('newEmail',
		{
			from: "kalpeshrajvir@gmail.com",
			subject: "this is test socket"
		});

		socket.emit('newMessage',
		{
			messaage: "New Message recieved"
		});	*/	

		socket.on('disconnect',()=>{
			console.log('User disconnected');
		});

		socket.on('createEmail',(newEmail)=>{
			console.log('create Email',newEmail);
		});

		socket.on('createMessage',(message)=>{
			console.log('create Message',message);
			socket.broadcast.emit('newMessage',{
				from: message.from,
				text: message.text,
				createAt: new Date().getTime()
			})
		});				
	});


	server.listen(port, () => {
	  console.log(`Server is up on ${port}`);
	});	

