
// console.log('form.elements ', form.elements)
// console.log('form.elements.message ', form.elements.message)
// console.log('form.elements.submitOk ', form.elements.submitOk)
// console.log('form.elements.submitCancel ', form.elements.submitCancel)


let htmlFetched = `
<div
	id="modalForm"
	class="overlay d-flex align-items-center justify-content-center"
>
	<div class="col-sm-7 bg-light text-dark mt-2 rounded">
		<div class="m-2">Enter something</div>
		<form class="m-2" id="myForm">
			<input
				autocomplete="off"
				type="text"
				class="form-control"
				name="message"
				required
			/>

			<div class="mt-2 d-flex justify-content-center">
				<input
					name="submitOk"
					class="me-2 btn rounded border border-success"
					type="submit"
					value="Ok"
				/>
				<input
					name="submitCancel"
					class="btn rounded border border-secondary"
					type="submit"
					value="Cancel"
				/>
			</div>
		</form>
	</div>
</div>
`;


function initShowFormHandler() {
  const showFormButton = document.getElementById("showFormButton");

  showFormButton.addEventListener("click", (e) => {
		document.body.style.overflow = 'hidden';

    showPrompt(htmlFetched, (txt) => {
      alert(txt);
			document.body.style.overflow = '';
    });

  });
}

function showPrompt(html, callback) {
  document.body.insertAdjacentHTML("afterbegin",html);
  initModalFormHandler(callback);
}

initShowFormHandler();

function initModalFormHandler(callback) {
  const modalForm = document.getElementById("modalForm");
  const form = modalForm.querySelector("#myForm");

  form.addEventListener("submit", formSubmitHandler);
  function formSubmitHandler(e) {
    e.preventDefault();
  }

  const message = form.elements.message;
  const submitOk = form.elements.submitOk;
  const submitCancel = form.elements.submitCancel;

  function setFocusOnMessage() {
    message.focus();
		message.classList.add("focusedMessage");
  }
  setFocusOnMessage();

  message.setAttribute("tabindex", "1");
  submitOk.setAttribute("tabindex", "2");
  submitCancel.setAttribute("tabindex", "3");

  submitCancel.onblur = handleSubmitCancelBlur;
  function handleSubmitCancelBlur(e) {
    e.preventDefault();
    message.focus();
  }

  message.addEventListener("focus", messageFocusEventHandler);
  function messageFocusEventHandler(e) {

    // console.log('message focus', e.target);
		if(!message.classList.contains(`focusedMessage`))
			message.classList.add("focusedMessage");
  }

  message.onkeydown = message.onkeyup = messageInputKeyEventHandler;
  function messageInputKeyEventHandler(e) {
		// console.log(e.key)
    if (message.value.trim() !== "") {
      message.classList.remove("warning");
    }

		if(e.key === 'Enter'){
			submitForm();
		}
		if(e.key === 'Escape'){
			cancelForm();
		}
		if(e.key === 'Tab' && e.shiftKey){
			this.focus();
			return false;
		}
  }

  message.onblur = function (e) {
    // console.log('message.onblur');

		if(message.classList.contains(`focusedMessage`))
    	message.classList.remove("focusedMessage");

    addWarningIfEmpty(this);
  };

  function addWarningIfEmpty(elem) {
    if (elem.value.trim() === "") {
      if (!elem.classList.contains("warning")) {
        elem.classList.add("warning");
        return true;
      }

      return true;
    }
    return false;
  }

  submitOk.addEventListener("click", submitOkEventHandler);
  function submitOkEventHandler(e) {
    e.preventDefault();
		submitForm();
  }

	function submitForm(){
		if (addWarningIfEmpty(message)) {
      message.focus();
      return;
    }

    callback.call(null, `You entered ${message.value.trim()}`);

    resetData();
	}

  submitCancel.addEventListener("click", submitCancelClickEventHandler);
  function submitCancelClickEventHandler(e) {
    e.preventDefault();
		cancelForm();
  }

	function cancelForm(){

    callback.call(null, `You entered ${null}`);
    resetData();
	}

  function resetData() {
    submitOk.removeEventListener("click", submitOkEventHandler);
    submitCancel.removeEventListener("click", submitCancelClickEventHandler);
    message.removeEventListener("focus", messageFocusEventHandler);
    form.removeEventListener("submit", formSubmitHandler);

    message.onblur =
      message.onkeydown =
      message.onkeyup =
      submitCancel.onblur =
        null;
    modalForm.remove();
  }
}
