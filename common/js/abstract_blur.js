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
    "u_useGrad","u_edgeOnly","u_gradPower","u_mouse"
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

// --- ボロノイ(ポリゴン)ノイズ ---
float voronoi(vec2 uv) {
    vec2 g = floor(uv);
    vec2 f = fract(uv);
    float res = 8.0;
    for(int y=-1; y<=1; y++)
    for(int x=-1; x<=1; x++) {
        vec2 lattice = vec2(x, y);
        vec2 p = g + lattice;
        vec2 offset = vec2(
            fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453),
            fract(sin(dot(p, vec2(269.5, 183.3))) * 43758.5453)
        );
        vec2 diff = lattice + offset - f;
        res = min(res, dot(diff, diff));
    }
    return sqrt(res);
}

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

// UVをボロノイの中心に吸着させる関数
vec2 snapVoronoi(vec2 uv, float t, float scale) {
    vec2 p = uv * scale + vec2(t * 0.2, -t * 0.2);
    vec2 g = floor(p);
    vec2 f = fract(p);
    float minDist = 99.0;
    vec2 nearest;
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 lattice = vec2(x, y);
            vec2 q = g + lattice;
            vec2 offset = vec2(
                fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453),
                fract(sin(dot(q, vec2(269.5, 183.3))) * 43758.5453)
            );
            vec2 candidate = lattice + offset - f;
            float dist = dot(candidate, candidate);
            if(dist < minDist) {
                minDist = dist;
                nearest = offset + g + lattice;
            }
        }
    }
    // ボロノイ中心にスナップ
    return (nearest - vec2(t * 0.2, -t * 0.2)) / scale;
}

// 三角形グリッドにスナップ
vec2 snapTriangle(vec2 uv, float size){
    // 六角グリッド的な格子を使って三角形タイルを作る
    float s = size;
    float x = uv.x / s;
    float y = uv.y / (s * sqrt(3.0)/2.0);

    float xi = floor(x + 0.5);
    float yi = floor(y + 0.5);

    float rx = x - xi;
    float ry = y - yi;

    // 上下交互の三角形タイル分け
    bool up = mod(xi + yi, 2.0) < 1.0;
    if (up ? (rx + ry > 0.0) : (rx + ry < 0.0)) {
        xi += 1.0;
    }

    return vec2(xi * s, yi * s * sqrt(3.0)/2.0);
}

// シード用乱数生成
float hash12(vec2 p){
    return fract(sin(dot(p, vec2(41.7, 289.2))) * 43758.5453);
}
vec3 randomColor(vec2 seed, vec3 base) {
    float h = hash12(seed);
    float s = hash12(seed + 17.3);
    float v = hash12(seed - 43.2);
    // 色成分変化量は好みで
    return base + vec3(h, s, v) * 0.13;
}

// タイルごとに周期の違う滑らかキラキラ
vec3 timeColorMod(vec2 seed, float t, vec3 base) {
    float phase = hash12(seed) * 6.283;
    float speed = 0.13 + 0.06 * hash12(seed + 31.8);
    float s = 0.12 * (0.5 + 0.5 * sin(t * speed + phase));
    float s2 = 0.12 * (0.5 + 0.5 * cos(t * (speed+0.07) + phase));
    float s3 = 0.10 * (0.5 + 0.5 * sin(t * (speed+0.11) - phase));
    return base + vec3(s, s2, s3);
}


void main() {
    // 標準UV
    vec2 uv = (gl_FragCoord.xy / u_res.xy);
    uv = uv * 2.0 - 1.0;
    uv.x *= u_res.x / u_res.y;
    float t = u_time * u_speed;

    // hover範囲判定（ぼかし＆超広）
    vec2 mouseNorm = u_mouse * 2.0 - 1.0;
    mouseNorm.x *= u_res.x / u_res.y;
    float d = distance(uv, mouseNorm);
    float hover = 1.0 - smoothstep(0.03, 0.85, d);
    float fade = pow(smoothstep(0.0, 1.0, hover), 2.8);

    // タイルUV（モザイク化）
    float tileSize = 0.09; // 粒の大きさ
    vec2 tileUv = mix(uv, snapTriangle(uv, tileSize), fade);

    // グラデーション or 単色（ノイズなし）
    float n = getNoise(tileUv, t); // 使わないなら削除OK
    float edge = smoothstep(u_threshold, u_threshold + u_lineSharpness, n);
    float gradT = pow(edge, u_gradPower);

    vec3 baseColor = u_useGrad == 1
        ? mix(u_gradColor1, u_gradColor2, gradT)
        : u_gradColor1;

    // ★色ノイズ・ランダム一切ナシ！タイルごとに均一な色だけ
    vec3 color = baseColor;

    if (edge > 0.1) {
        gl_FragColor = vec4(color, 1.0);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}







`;

// ============= クラス定義 =============
class CanvasNoiseBlur {
  constructor(canvasOrId) {
    const canvas = typeof canvasOrId === 'string'
      ? document.getElementById(canvasOrId)
      : canvasOrId;

    if (!canvas) {
      throw new Error('CanvasNoiseBlur: canvas が見つかりません');
    }

    this.canvas = canvas;
    this.glData = setupWebGL(this.canvas, fragShaderNoise);

    // マウス用
    this.mouse = [0.5, 0.5];

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
    gl.uniform2fv(uniforms.u_mouse, this.mouse);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(this._draw);
  }
}

// DOMContentLoaded 後に .canvasNoise を全て初期化
window.addEventListener('DOMContentLoaded', function() {
  const canvases = document.querySelectorAll('canvas.canvasNoise');
  canvases.forEach(function(c) {
    new CanvasNoiseBlur(c);
  });
});

// グローバルにクラスを公開
global.CanvasNoiseBlur = CanvasNoiseBlur;

})(window);
