"use strict";

import getCanvasAndContext from "./getContext.js";

(function loopPanorama() {
  const image = new Image();

  image.src = "https://upload.wikimedia.org/wikipedia/commons/8/83/Capitan_Meadows%2C_Yosemite_National_Park.jpg";

  let canvasXSize = 800;
  let canvasYSize = 200;

  let speed = 30; // lower is faster
  let scale = 1.05;

  let verticalOffset = -4.5;
  let horizontalOffset = 0;

  let dx = 0.75;

  let imgWidth;
  let imgHeight;
  let clearX;
  let clearY;

  let ctx;

  image.onload = () => {
    imgWidth = image.width * scale;
    imgHeight = image.height * scale;

    let imageXLargerThanCanvas = Boolean(imgWidth > canvasXSize);
    if (imageXLargerThanCanvas) {
      horizontalOffset = canvasXSize - imgWidth;
      clearX = imgWidth;
    } else {
      clearX = canvasXSize;
    }

    let imageYLargerThanCanvas = Boolean(imgHeight > canvasYSize);
    if (imageYLargerThanCanvas) {
      clearY = imgHeight;
    } else {
      clearY = canvasYSize;
    }

    let { canvas, context } = getCanvasAndContext("yosemiteNationalPark_canvas");
    ctx = context;
    return setInterval(draw, speed);
  };

  function draw() {
    // debugger;
    ctx.clearRect(0, 0, clearX, clearY);

    let imageIsSmallerThanCanvasSize = Boolean(imgWidth <= canvasXSize);
    if (imageIsSmallerThanCanvasSize) {
      if (horizontalOffset > canvasXSize) {
        horizontalOffset = -imgWidth + x;
      }

      let drawAdditionalImage1 = Boolean(horizontalOffset > 0);
      if (drawAdditionalImage1) {
        ctx.drawImage(image, -imgWidth + x, verticalOffset, imgWidth, imgHeight);
      }

      let drawAdditionalImage2 = Boolean(horizontalOffset - imgWidth > 0);
      if (drawAdditionalImage2) {
        ctx.drawImage(image, -imgWidth * 2 + horizontalOffset, verticalOffset, imgWidth, imgHeight);
      }
    } else {
      let resetStartFromBeginning = Boolean(horizontalOffset > canvasXSize);
      if (resetStartFromBeginning) {
        horizontalOffset = canvasXSize - imgWidth;
      }
      let drawAdditionalImage = Boolean(horizontalOffset > canvasXSize - imgWidth);
      if (drawAdditionalImage) {
        ctx.drawImage(image, horizontalOffset - imgWidth, verticalOffset, imgWidth, imgHeight);
      }
    }

    ctx.drawImage(image, horizontalOffset, verticalOffset, imgWidth, imgHeight);

    horizontalOffset += dx;
  }
})();
