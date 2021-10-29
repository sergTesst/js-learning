
async function subscribe(){
	let response = await fetch('/subscribe');

	if(response.status === 502){
		// status 502 is a connection timeout error, 
		// may happen when the connection was pending for too long, 
		// and the remote server or a proxy closed it
		// let's reconnect

		await subscribe();

	}else if( response.status !== 200) {
		// An error show it
		showMessage(response.statusText);

		// Reconnect it one second 

		await new Promise(resolve => setTimeout(resolve, 1000));
		await subscribe();
	}else{
		//get and show the message
		let message = await response.text();
		showMessage(message);
		// Call subscribe() again to get the next message
		await subscribe();
	}
}

subscribe();

//server must be able to work with many pending connections

