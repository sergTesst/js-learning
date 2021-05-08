
export function fireAsk(){
	ask("Do you agree? \n",okShow,noShow);
}

function okShow(){
	console.log('you agreed ');
}

function noShow(){
	console.log('you canceled ');
}

function ask(question, yes, no){
	if(confirm(question))
		yes();
	else 
		no();
}

export function ConfirmUserAsnwer(){
	let agreeContent = document.querySelector(".agree-content");
	handleAnswer(agreeContent,"yesBtn",'user agreed');
	handleAnswer(agreeContent,"noBtn",'user disagreed');
}
function handleAnswer(container,btnId,response){
	container.querySelector(`#${btnId}`).addEventListener('click',()=>{
		console.log(response);
		container.innerHTML = `your answer is submited <br> ${response}`;
	});
}

module.exports = {fireAsk};

