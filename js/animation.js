import * as datGui from "https://cdn.skypack.dev/dat.gui@0.7.7";

const state = {
  fps: 60,
  color: "#0f0",
  charset: "0123456789ABCDEF",
  size: 10
};


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h, p;
const resize = () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  p = Array(Math.ceil(w / state.size)).fill(0);
};
window.addEventListener("resize", resize);
sizeCtrl.onFinishChange((s) => resize());
resize();

const random = (items) => items[Math.floor(Math.random() * items.length)];

const draw = () => {
  ctx.fillStyle = "rgba(0,0,0,.05)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = state.color;

  ctx.font = state.size + "px sans-serif";
  for (let i = 0; i < p.length; i++) {
    let v = p[i];
    ctx.fillText(random(state.charset), i * state.size, v);
    p[i] = v >= h || v >= 10000 * Math.random() ? 0 : v + state.size;
  }
};

let interval = setInterval(draw, 1000 / state.fps);
fpsCtrl.onFinishChange((fps) => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(draw, 1000 / fps);
});