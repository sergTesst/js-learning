import getCanvasAndContext from "./getContext.js";

function drawInnerSquares(ctx) {
  ctx.fillRect(0, 0, 150, 150);
  ctx.save();

  ctx.fillStyle = "#32b442";
  ctx.fillRect(20, 20, 110, 110);
  ctx.save();

  ctx.fillStyle = "#dba64d";
  ctx.globalAlpha = 0.5;
  ctx.fillRect(40, 40, 70, 70);

  ctx.restore();

  ctx.fillRect(45, 45, 60, 60);

  ctx.restore();
  ctx.fillRect(60, 60, 30, 30);
}

function translateExample(ctx) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = `rgb(${51 * i}, ${255 - 51 * i}, 255)`;
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}

function drawRotatedSquares(ctx) {
  ctx.save();
  ctx.fillStyle = `#14a6a9`;
  ctx.fillRect(30, 30, 100, 100);
  ctx.rotate((Math.PI / 180) * 25);

  ctx.fillStyle = `#706479`;
  ctx.fillRect(90, 0, 100, 100);
  ctx.restore();

  ctx.fillStyle = `#ce62c9`;
  ctx.fillRect(150, 30, 100, 100);

  //translate to rectangle center
  ctx.translate(50, -50);
  ctx.rotate((Math.PI / 180) * 25);

  ctx.fillStyle = `#ab7d58`;
  ctx.fillRect(150, 30, 110, 110);
}

function scaleExample(ctx) {
  ctx.save();
  ctx.scale(10, 3);
  ctx.fillRect(1, 10, 10, 10);
  ctx.restore();

  // ctx.scale(-1, 1);
  ctx.font = "48px serif";
  ctx.fillText("TEXT", 120, 120);
}

function transformMatrix(ctx) {
  const sin = Math.sin(Math.PI / 6);
  const cos = Math.cos(Math.PI / 6);
  ctx.translate(100, 100);
  let rgbColor = 0;
  for (let i = 0; i < 13; i++) {
    rgbColor = Math.floor((255 / 12) * i);
    ctx.fillStyle = `rgb(${rgbColor}, ${rgbColor}, ${rgbColor})`;

    ctx.fillRect(0, 0, 100, 10);
    // console.log(`cos = ${cos}, sin = ${sin}, -sin = ${-sin}, cos = ${cos}, 0, 0`);
    ctx.transform(cos, sin, -sin, cos, 0, 0);
  }

  ctx.setTransform(-1, 0, 0, 1, 100, 100);
  ctx.fillStyle = `rgba(255, 128, 255, 0.5)`;
  ctx.fillRect(0, 50, 100, 100);
}

function clipStars(ctx) {
  ctx.fillRect(0, 0, 150, 150);
  ctx.translate(75, 75);

  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
  // ctx.stroke(); //draws circle
  ctx.clip();

  //draw background
  const lingrad = ctx.createLinearGradient(0, -75, 0, 75);
  // lingrad.addColorStop(0, "#9c52cd");
  // lingrad.addColorStop(1, "#145494");
  lingrad.addColorStop(0, "#232256");
  lingrad.addColorStop(1, "#143778");

  ctx.fillStyle = lingrad;
  ctx.fillRect(-75, -75, 150, 150);

  for (let i = 0; i < 50; i++) {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.translate(75 - Math.floor(Math.random() * 150), 75 - Math.floor(Math.random() * 150));

    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
    ctx.restore;
  }

  function drawStar(ctx, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    for (let i = 0; i < 9; i++) {
      ctx.rotate(Math.PI / 5);
      if (i % 2 === 0) {
        ctx.lineTo((radius / 0.525) * 0.2008, 0);
      } else {
        ctx.lineTo(radius, 0);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

(function implementCanvas() {
  const arrOfFunctionsToCall = [
    [drawInnerSquares, "drawInnerSquares_canvas"],
    [translateExample, "translateExample_canvas"],
    [drawRotatedSquares, "drawRotatedSquares_canvas"],
    [scaleExample, "scaleExample_canvas"],
    [transformMatrix, "transformMatrix_canvas"],
    [clipStars, "clipStarts_canvas"],
  ];
  for (const arr of arrOfFunctionsToCall) {
    const [func, id] = arr;
    const { canvas, context } = getCanvasAndContext(id);
    func.call(null, context);
  }
})();
