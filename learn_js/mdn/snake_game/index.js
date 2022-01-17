"use strict";

import getCanvasAndContext from "./getContext.js";

function twoRects(context) {
  context.fillStyle = "#e46af2";
  context.fillRect(10, 10, 40, 40);

  context.fillStyle = "#67c78d";
  context.fillRect(20, 20, 40, 40);
}

function rectangularShape(context) {
  context.fillStyle = "#62809d";
  context.fillRect(35, 35, 100, 100);
  context.clearRect(55, 55, 60, 60);
  context.strokeRect(60, 60, 50, 50);
}

function drawTriangle(context) {
  context.beginPath();

  // context.moveTo(0, 0);
  context.moveTo(75, 50);

  context.lineTo(100, 75);
  context.lineTo(100, 25);
  context.lineTo(90, 25);
  context.lineTo(80, 25);
  context.lineTo(70, 35);
  context.fill();
}

function drawSmileFace(context) {
  context.beginPath();

  context.arc(75, 75, 50, 0, Math.PI * 2, true);

  context.moveTo(105, 85);
  context.arc(75, 85, 30, 0, Math.PI, false);

  context.moveTo(65, 60);
  context.arc(60, 60, 5, 0, Math.PI * 2, false);

  context.moveTo(95, 60);
  context.arc(90, 60, 5, 0, Math.PI * 2, false);

  context.stroke();
}

(function implementCanvas() {
  const arrOfFunctionsToCall = [
    [twoRects, "tutorial"],
    [rectangularShape, "rectangularShape_canvas"],
    [drawTriangle, "drawTriangle_canvas"],
    [drawSmileFace, "drawSmileFace_canvas"],
  ];
  for (const arr of arrOfFunctionsToCall) {
    const [func, id] = arr;
    const { canvas, context } = getCanvasAndContext(id);
    func.call(null, context);
  }
})();
