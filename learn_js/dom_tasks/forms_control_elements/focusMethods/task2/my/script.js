

let table = document.getElementById("bagua-table");

let currentElem = null;
let contentEditArea = null;

table.addEventListener("click", (e) => {
  let tdTarget = e.target.closest("td");

  if (tdTarget.classList.contains("styledTd")) return;
  if (contentEditArea) return;

	console.log("tdTarget", tdTarget);

  currentElem = tdTarget; 

	const { offsetWidth, offsetHeight } = currentElem;

	let width = offsetWidth;
	let height = offsetHeight;

	console.log(` width, height`,  width, height);

	currentElem.hidden = true;

  currentElem.insertAdjacentHTML(
    "afterend",
    `
			<td class="styledTd">
				<textarea
					id="contentEditArea"
					class="tdStyles"
					name="contentEditArea"
				></textarea>
				<div class="edit-controls">
					<button
						id="okButton"
						class="btn btn-light border border-success rounded"
					>
						OK
					</button>
					<button
						id="cancelButton"
						class="btn btn-light border border-1 rounded"
					>
						CANCEL
					</button>
				</div>
			</td>
		`
  );

  contentEditArea = document.getElementById("contentEditArea");
  contentEditArea.style.width = `${width}px`;
  contentEditArea.style.height = `${height}px`;
  contentEditArea.value = currentElem.innerHTML.trim();
	contentEditArea.focus();

  table.dispatchEvent(new CustomEvent("htmlInserted"));
});

table.addEventListener("htmlInserted", (e) => {
  cancelButton.addEventListener("click", (e) => {
		resetValues();
  });
  okButton.addEventListener("click", (e) => {
    currentElem.innerHTML = contentEditArea.value.trim();
		resetValues();
  });
});
function resetValues(){
	document.querySelector(".styledTd").remove();
	currentElem.hidden = false;
	currentElem = null;
	contentEditArea = null;
}
