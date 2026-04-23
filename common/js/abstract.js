(function(global){
// ▼========= カスタムパラメータここだけ！ =========▼
const NOISE_SCALE    = 0.8;
const THRESHOLD      = 0.55;
const CONTRAST       = 1.0;
const BRIGHTNESS     = 1.0;
const LINE_SHARPNESS = 0.35;
const NOISE_TYPE     = 2;
const SPEED          = 0.5;
const SWIRL_SIZE     = 5.0;
const MOTION_AMPL    = 0.73;

const LINE_COLOR_1   = "#87F1D5";
const LINE_COLOR_2   = "#00CCFF";

// ★調整したい場合はここ
const TILE_SIZE      = 0.13; // 三角形グリッドの大きさ (例: 0.08を小さくすると細かく)
const MASK_RADIUS    = 0.30; // マウス範囲 (0～1)
const MASK_SOFT      = 0.10; // 境界のぼかし
const EASING_SPEED   = 0.01; // ←イージング速度（大きいほど早く追従）
// ▲============================================▲

const USE_GRADIENT   = true;
const EDGE_ONLY      = true;
const GRADIENT_POWER = 1.0;

function hexToRgb01(hex) {
  hex = hex.replace('#','');
  if(hex.length === 3) hex = hex.split('').map(x=>x+x).join('');
  const num = parseInt(hex,16);
  return [(num>>16)&255, (num>>8)&255, num&255].map(v=>v/255);
}
const gradColor1   = hexToRgb01(LINE_COLOR_1);
const gradColor2   = hexToRgb01(LINE_COLOR_2);

// ================= WebGLユーティリティ ===================
function createShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    console.error(src);
    throw new Error('GLSL compile error');
  }
  return s;
}
function setupWebGL(canvas, fragShader) {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
  const vs = createShader(gl, gl.VERTEX_SHADER, `
attribute vec2 pos;
void main() { gl_Position = vec4(pos, 0, 1); }
`);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragShader);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  // ユニフォームロケーションまとめて返す
  const uniforms = {};
  [
    "u_time","u_res","u_threshold","u_noiseScale","u_lineSharpness","u_noiseType",
    "u_gradColor1","u_gradColor2","u_speed","u_swirlSize","u_motionAmpl",
    "u_useGrad","u_edgeOnly","u_gradPower","u_mouse","u_tileSize","u_maskRadius","u_maskSoft"
  ].forEach(name => uniforms[name]=gl.getUniformLocation(prog,name));
  return {gl,prog,uniforms};
}

// ================ フラグメントシェーダ ===============
const fragShaderNoise = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform float u_threshold;
uniform float u_noiseScale;
uniform float u_lineSharpness;
uniform int   u_noiseType;
uniform vec3  u_gradColor1;
uniform vec3  u_gradColor2;
uniform float u_speed;
uniform float u_swirlSize;
uniform float u_motionAmpl;
uniform int   u_useGrad;
uniform int   u_edgeOnly;
uniform float u_gradPower;
uniform vec2  u_mouse;
uniform float u_tileSize;
uniform float u_maskRadius;
uniform float u_maskSoft;

// --- ノイズ等の関数は省略なしで同じ ---

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(27.619,57.583)))*43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a, b, u.x) + (c - a)*u.y*(1.0-u.x) + (d - b)*u.x*u.y;
}
float getNoise(vec2 uv, float t) {
  if(u_noiseType==0) {
    return noise(uv * u_noiseScale + vec2(t*0.41, -t*0.23) + sin(t*0.2)*2.0);
  }
  if(u_noiseType==1) {
    float n1 = noise(uv * u_noiseScale + vec2(t*0.5, 0.0) + cos(t*0.15)*2.0);
    float n2 = noise(uv * u_noiseScale * 1.9 + vec2(-t*0.18, t*0.37) + sin(t*0.23)*2.5);
    float s = sin(uv.y * u_noiseScale * 4.0 + n2*2.0 + t*0.6);
    return 0.55*n1 + 0.45*s*0.5+0.5;
  }
  if(u_noiseType==2) {
    float swirl = noise(uv * u_noiseScale * 0.7 + vec2(-t*0.22, t*0.22)) * u_swirlSize;
    vec2 nuv = uv + swirl*0.5 + vec2(
      u_motionAmpl*sin(t*0.53 + uv.y*2.4),
      u_motionAmpl*cos(t*0.5 + uv.x*2.3)
    );
    float n = noise(nuv * u_noiseScale + vec2(t*0.42, -t*0.33));
    float edge2 = smoothstep(0.43, 0.47, n);
    float stripe = sin((uv.y+nuv.x)*u_noiseScale*2.8 + t*0.4)*0.13+0.13;
    return n*0.7 + edge2*0.2 + stripe;
  }
  if(u_noiseType==3) {
    float n = noise(uv * u_noiseScale + vec2(t*0.4, t*0.3));
    float dx = noise((uv + vec2(0.005,0.0)) * u_noiseScale + t*0.4) - n;
    float dy = noise((uv + vec2(0.0,0.005)) * u_noiseScale + t*0.4) - n;
    float grad = sqrt(dx*dx + dy*dy);
    return smoothstep(0.02, 0.12, grad) * 1.1;
  }
  return 0.0;
}

// 三角形グリッドにスナップ
vec2 snapTriangle(vec2 uv, float size){
    float s = size;
    float x = uv.x / s;
    float y = uv.y / (s * sqrt(3.0)/2.0);
    float xi = floor(x + 0.5);
    float yi = floor(y + 0.5);
    float rx = x - xi;
    float ry = y - yi;
    bool up = mod(xi + yi, 2.0) < 1.0;
    if (up ? (rx + ry > 0.0) : (rx + ry < 0.0)) {
        xi += 1.0;
    }
    return vec2(xi * s, yi * s * sqrt(3.0)/2.0);
}

void main() {
    // 標準UV
    vec2 uv = (gl_FragCoord.xy / u_res.xy);
    uv = uv * 2.0 - 1.0;
    uv.x *= u_res.x / u_res.y;
    float t = u_time * u_speed;

    // 三角形グリッド（tileSizeで細かさ調整）
    float tileSize = u_tileSize;
    vec2 tileUv = snapTriangle(uv, tileSize);

    // インデックスでポリゴン毎の色揺れ
    float s = tileSize;
    float x = tileUv.x / s;
    float y = tileUv.y / (s * sqrt(3.0)/2.0);
    float idxX = floor(x + 0.5);
    float idxY = floor(y + 0.5);
    float triHash = fract(sin(idxX * 91.71 + idxY * 13.27) * 43758.5453);

    // グラデーション
    float n = getNoise(tileUv, t);
    float edge = smoothstep(u_threshold, u_threshold + u_lineSharpness, n);
    float gradT = pow(edge, u_gradPower);

    vec3 baseColor = u_useGrad == 1
        ? mix(u_gradColor1, u_gradColor2, gradT)
        : u_gradColor1;

    // 波揺れ
    float speed = 4.0;
    float strength = 0.02;
    float phase = triHash * 6.2831;
    float wave = sin(t * speed + phase);
    vec3 triColor = baseColor + wave * strength * baseColor;
    triColor = clamp(triColor, 0.0, 1.0);

    // マスク処理
    vec2 uv01 = (gl_FragCoord.xy / u_res.xy);
    vec2 mouse01 = u_mouse;
    float dist = distance(uv01, mouse01);
    float maskAlpha = 1.0 - smoothstep(u_maskRadius, u_maskRadius + u_maskSoft, dist);

    if (edge > 0.1) {
        gl_FragColor = vec4(triColor, maskAlpha);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}
`;

// ============= クラス定義 =============
class CanvasClear {
  constructor(canvasOrId) {
    const canvas = typeof canvasOrId === 'string'
      ? document.getElementById(canvasOrId)
      : canvasOrId;

    if (!canvas) {
      throw new Error('CanvasClear: canvas が見つかりません');
    }

    this.canvas = canvas;
    this.glData = setupWebGL(this.canvas, fragShaderNoise);

    // マウス用
    this.mouse = [0.5, 0.5];      // 即時反映用
    this.easedMouse = [0.5, 0.5]; // イージング後（描画用）

    // バインド
    this._onResize = this._onResize.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._draw = this._draw.bind(this);

    // 初期化
    this._onResize();
    window.addEventListener('resize', this._onResize);
    this.canvas.addEventListener('mousemove', this._onMouseMove);

    requestAnimationFrame(this._draw);
  }

  _onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse[0] = (e.clientX - rect.left) / this.canvas.width;
    this.mouse[1] = 1 - (e.clientY - rect.top) / this.canvas.height;

    // デバッグ表示（共通の1つだけ）
    // let debugDiv = document.getElementById('debug-mouse');
    // if (!debugDiv) {
    //   debugDiv = document.createElement('div');
    //   debugDiv.id = 'debug-mouse';
    //   debugDiv.style.position = 'fixed';
    //   debugDiv.style.left = '8px';
    //   debugDiv.style.bottom = '8px';
    //   debugDiv.style.background = 'rgba(0,0,0,0.6)';
    //   debugDiv.style.color = '#fff';
    //   debugDiv.style.fontSize = '13px';
    //   debugDiv.style.padding = '4px 8px';
    //   debugDiv.style.zIndex = 9999;
    //   document.body.appendChild(debugDiv);
    // }
    // debugDiv.innerText = `id: ${this.canvas.id}\npx: (${Math.floor(e.clientX-rect.left)}, ${Math.floor(e.clientY-rect.top)})\nUV: (${this.mouse[0].toFixed(3)}, ${this.mouse[1].toFixed(3)})`;
  }

  _draw(t) {
    // イージングで追従（lerp）
    this.easedMouse[0] += (this.mouse[0] - this.easedMouse[0]) * EASING_SPEED;
    this.easedMouse[1] += (this.mouse[1] - this.easedMouse[1]) * EASING_SPEED;

    const gl = this.glData.gl;
    const uniforms = this.glData.uniforms;
    const canvas = this.canvas;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(uniforms.u_time, t * 0.001);
    gl.uniform2f(uniforms.u_res, canvas.width, canvas.height);
    gl.uniform1f(uniforms.u_threshold, THRESHOLD);
    gl.uniform1f(uniforms.u_noiseScale, NOISE_SCALE);
    gl.uniform1f(uniforms.u_lineSharpness, LINE_SHARPNESS);
    gl.uniform1i(uniforms.u_noiseType, NOISE_TYPE);
    gl.uniform3fv(uniforms.u_gradColor1, gradColor1);
    gl.uniform3fv(uniforms.u_gradColor2, gradColor2);
    gl.uniform1f(uniforms.u_speed, SPEED);
    gl.uniform1f(uniforms.u_swirlSize, SWIRL_SIZE);
    gl.uniform1f(uniforms.u_motionAmpl, MOTION_AMPL);
    gl.uniform1i(uniforms.u_useGrad, USE_GRADIENT ? 1 : 0);
    gl.uniform1i(uniforms.u_edgeOnly, EDGE_ONLY ? 1 : 0);
    gl.uniform1f(uniforms.u_gradPower, GRADIENT_POWER);
    gl.uniform2fv(uniforms.u_mouse, this.easedMouse);  // ← イージング後の座標を渡す
    gl.uniform1f(uniforms.u_tileSize, TILE_SIZE);
    gl.uniform1f(uniforms.u_maskRadius, MASK_RADIUS);
    gl.uniform1f(uniforms.u_maskSoft, MASK_SOFT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(this._draw);
  }
}

// DOMContentLoaded 後に .canvasClear を全て初期化
window.addEventListener('DOMContentLoaded', function() {
  const canvases = document.querySelectorAll('canvas.canvasClear');
  canvases.forEach(function(c) {
    new CanvasClear(c);
  });
});

// グローバルにクラスを公開
global.CanvasClear = CanvasClear;

})(window);
