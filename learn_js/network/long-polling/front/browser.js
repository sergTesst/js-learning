
function PublishForm(form, url){

	function sendMessage(message){
		fetch(url, {
			method: 'POST',
			body: message
		});
	}

	form.onsubmit = function(){
		let message = form.message.value.trim();
		if(message){
			form.message.value = '';
			sendMessage(message);
		}
		return false;
	}
}


//get message with long polling

function SubscribePane(elem, url){

	function showMessage(message){
		let msgelem = document.createElement('div');
		msgelem.append(message);
		elem.append(msgelem);
	}

	async function subscribe(){
		let response = await fetch(url);
	
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
}