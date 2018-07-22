var socket = io();

		socket.on('connect',function(){
			console.log('Connected to server');
/*			socket.emit('createEmail',{ to: "mohitrajvir@gmail.com", subject: "this is emit"});

			socket.emit('createMessage',{ from: "mohit", message: "this is emit for createMessaage"});			*/
		});
		socket.on('disconnect',function(){
			console.log('Disconnected to server');
		});		

		socket.on('newEmail',function(email){
			console.log('New email');
			console.log(email);
		});

		socket.on('newMessage',function(msgData){
			console.log(msgData);
		});			