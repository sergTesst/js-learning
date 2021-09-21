"use strict";

const thumb = document.querySelector(".slider-draggable .thumb-custom");
const slider = document.querySelector(".slider-draggable");

let sliderExists = Boolean(slider);
let thumbExists = Boolean(thumb);
if (thumbExists && sliderExists) {
  makeElemDraggable(thumb, slider);
}

function makeElemDraggable(elem, slider) {
  elem.onmousedown = mouseDownHandlerForThumbInSlider;
	slider.onclick = sliderClickHandler;

  elem.ondragstart = () => {
    return false;
  };

  function mouseDownHandlerForThumbInSlider(event) {
    //prevent selection of the element
    event.preventDefault();

    console.clear();

    const sliderRect = slider.getBoundingClientRect();
    const thumbRect = elem.getBoundingClientRect();

    console.log("sliderRect ", sliderRect);
    console.log("thumbRect ", thumbRect);

    const maxLeft = sliderRect.width - elem.offsetWidth;
    const shiftX = event.clientX - thumbRect.left;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseMove(event) {

			console.clear();

      let left = event.clientX - shiftX - slider.getBoundingClientRect().left;

      console.log("onMouseMove left", left);

      if (left > maxLeft) {
        left = maxLeft;
      } else if (left < 0) {
        left = 0;
      }

      console.log("onMouseMove left", left);

      elem.style.left = left + "px";
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }

	function sliderClickHandler(event){
		event.preventDefault();
		const sliderRect = slider.getBoundingClientRect();
		const maxLeft = sliderRect.width - elem.offsetWidth;
		let left = event.clientX - sliderRect.left;

		if (left > maxLeft) {
			left = maxLeft;
		} else if (left < 0) {
			left = 0;
		}

		elem.style.left = left + "px";

	}
}

function hl(str, ...args) {
  console.clear();

  if (!args.length) {
    console.log(str);
    return;
  }
  const strArr = str.split(" ");
  if (strArr.length !== args.length) return;
  const resStr = strArr
    .map((prop, i) => {
      if (args[i]["tagName"]) {
        return `${prop}: ${args[i].classList} \n`;
      }
      return `${prop}: ${args[i]} \n`;
    })
    .join(" ");
  console.log(resStr);
}
