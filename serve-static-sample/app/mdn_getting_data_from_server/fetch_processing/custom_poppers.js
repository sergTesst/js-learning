"use strict";

import {createElement} from './helpers.js';


const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle-custom="tooltip"]'))
const tooltipList = tooltipTriggerList.map( (tooltipTriggerEl)=> {
	// console.log(tooltipTriggerEl);
	const spanToolTip = createElement(
		{
			name:'span',
			classNamesString:'custom-tooltip-text p-2 text-white rounded'
		})
	const toolTipValue = tooltipTriggerEl.getAttribute('title-custom');
	spanToolTip.innerHTML = toolTipValue;
	tooltipTriggerEl.appendChild(spanToolTip);

})