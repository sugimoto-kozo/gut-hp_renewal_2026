
window.addEventListener('DOMContentLoaded', function() {
// ---------- WebGLセットアップ ----------
const canvas = document.getElementById("webgl");
const gl = canvas.getContext("webgl2");
resize();
window.addEventListener("resize", resize);

let mouse = { x: 0.5, y: 0.5 };
canvas.addEventListener("mousemove", function(e){
  const rect = canvas.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left) / canvas.width;
  mouse.y = 1 - (e.clientY - rect.top) / canvas.height;
  // デバッグ出力
  console.log(`mouse norm: (${mouse.x.toFixed(3)}, ${mouse.y.toFixed(3)})`);
});

const vsSrc = `#version 300 es
in vec2 aPos;
void main(){
  gl_Position = vec4(aPos, 0, 1);
}`;
const fsSrc = `#version 300 es
precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
out vec4 outColor;
void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float d = distance(uv, u_mouse);
  float intensity = 1.0 - smoothstep(0.0, 0.1, d);
  outColor = vec4(intensity, 0.0, 0.0, 1.0);
}`;

// プログラム作成関数
function createProgram(gl, vsSource, fsSource) {
  function compile(src, type) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
      throw gl.getShaderInfoLog(s);
    }
    return s;
  }
  const vs = compile(vsSource, gl.VERTEX_SHADER);
  const fs = compile(fsSource, gl.FRAGMENT_SHADER);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
    throw gl.getProgramInfoLog(prog);
  }
  return prog;
}

// 四角形バッファ
const prog = createProgram(gl, vsSrc, fsSrc);
const posLoc = gl.getAttribLocation(prog, "aPos");
const resLoc = gl.getUniformLocation(prog, "u_resolution");
const mouseLoc = gl.getUniformLocation(prog, "u_mouse");
const quadBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1,-1,  1,-1,  -1,1,  1,1
]), gl.STATIC_DRAW);

// 描画
function draw(){
  resize();
  gl.useProgram(prog);
  gl.uniform2f(resLoc, canvas.width, canvas.height);
  gl.uniform2f(mouseLoc, mouse.x, mouse.y);

  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}
draw();

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}
});