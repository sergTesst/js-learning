'use strict';


export const counterHolder = function counterContainer(){
	this.counter = 0;
	this.intervalId;
	this.counterEl = document.querySelector(".counter-container");

	this.makeIncrement =  function(){
		return this.counter++;
	}
	this.registerStartCounter = function(){
		const startBtn = this.counterEl.querySelector('#startCounter');
		startBtn.addEventListener('click',()=>{
			this.count();
		})
	}
	this.registerStopCounter = function(){
		const stopBtn = this.counterEl.querySelector('#stopCounter');
		stopBtn.addEventListener('click',()=>{
			this.clearInnerCounter();
		})
	}
	this.registerResetCounter = function(){
		const resetBtn = this.counterEl.querySelector('#resetCounter');
		resetBtn.addEventListener('click',()=>{
			this.reset();
		})
	}

	this.count = function(){
		this.intervalId = setInterval(()=>{
			this.counterEl.querySelector('.counter').innerHTML = this.makeIncrement();
		},1000);
	}

	this.clearInnerCounter = function(){
		clearInterval(this.intervalId);
	}

	this.reset = function(){
		this.counter = 0;
		this.counterEl.querySelector('.counter').innerHTML = "";
	}

}
