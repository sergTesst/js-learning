"use strict";

const getCanvasAndContext = (id) => {
  const canvas = document.getElementById(id);
  if (!typeof canvas.getContext === "function") return;

  const context = canvas.getContext("2d");
  if (context instanceof CanvasRenderingContext2D) return { canvas, context };
};

export default getCanvasAndContext;
