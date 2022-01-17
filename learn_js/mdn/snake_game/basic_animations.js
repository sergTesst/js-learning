import getCanvasAndContext from "./getContext.js";

function solarSystem(ctx) {
  if (!ctx instanceof CanvasRenderingContext2D) return;

  const sun = new Image();
  const moon = new Image();
  const earth = new Image();

  function init() {
    sun.src =
      "https://images.theconversation.com/files/397916/original/file-20210429-21-qm3fki.jpg?ixlib=rb-1.1.0&rect=32%2C70%2C1230%2C1153&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip";
    moon.src =
      "https://static.wixstatic.com/media/11062b_1a4b9f19c7d04747b5bf18c406ce3f55f000.png/v1/fill/w_280,h_280,al_c,q_85,usm_0.33_1.00_0.00/11062b_1a4b9f19c7d04747b5bf18c406ce3f55f000.webp";
    earth.src = "https://avatanplus.com/files/resources/original/57361521cd4a3154ab428c31.png";

    const arrImgs = [sun, moon, earth];
    const arrPromiseImgs = arrImgs.map((img) => {
      return new Promise((resolve) => {
        img.onload = () => resolve(img);
      });
    });

    Promise.allSettled(arrPromiseImgs)
      .then((results) => results.map((res) => res.value))
      .then((imgs) => {
        const [sun, moon, earth] = imgs;

        window.requestAnimationFrame(draw);

        function draw() {
          ctx.globalCompositeOperation = "destination-over";
          ctx.clearRect(0, 0, 450, 350);

          ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
          ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
          ctx.save();
          ctx.translate(260, 160);

          drawEarth(ctx, earth);

          drawMoon(ctx, moon);

          ctx.restore(); //make animation move slower, restore to initial settings

          earthOrbit(ctx);

          drawSun(ctx, sun);

          window.requestAnimationFrame(draw);
        }

        function drawEarth(ctx, earth) {
          const time = new Date();
          const angle = ((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds();

          ctx.rotate(angle);
          ctx.translate(0, 130);
          ctx.fillRect(0, -12, 40, 12); //shadow
          ctx.drawImage(earth, -12, -12, 20, 20);
        }

        function drawMoon(ctx, moon) {
          ctx.save();
          const time = new Date();
          const angle = ((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds();
          ctx.rotate(angle);
          ctx.translate(0, 28.5);
          ctx.drawImage(moon, -3.5, -3.5, 10, 10);

          ctx.restore();
        }

        function earthOrbit(ctx) {
          ctx.beginPath();
          ctx.arc(215, 170, 150, 0, Math.PI * 2, false);
          ctx.stroke();
        }

        function drawSun(ctx, sun) {
          ctx.drawImage(sun, 0, 0, 450, 350);
        }
      });
  }

  init();
}

(function implementCanvas() {
  const arrOfFunctionsToCall = [[solarSystem, "solarSystem_canvas"]];
  for (const arr of arrOfFunctionsToCall) {
    const [func, id] = arr;
    const { canvas, context } = getCanvasAndContext(id);
    func.call(null, context);
  }
})();
