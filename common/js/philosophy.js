document.addEventListener('DOMContentLoaded', () => {
  const obj = document.getElementById('svg-fig');
  if (!obj) return;

  function initSvg() {
    const svgDoc = obj.contentDocument;
    if (!svgDoc) return;

    const svg = svgDoc.querySelector('svg');
    if (!svg) return;

    svg.setAttribute('overflow', 'visible');

    const NS = 'http://www.w3.org/2000/svg';

    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = svgDoc.createElementNS(NS, 'defs');
      svg.insertBefore(defs, svg.firstChild);
    }

    const filterId = 'jsDropShadow';
    let filter = svg.querySelector(`#${filterId}`);
    if (!filter) {
      filter = svgDoc.createElementNS(NS, 'filter');
      filter.setAttribute('id', filterId);
      filter.setAttribute('x', '-50%');
      filter.setAttribute('y', '-50%');
      filter.setAttribute('width', '200%');
      filter.setAttribute('height', '220%');
      filter.setAttribute('color-interpolation-filters', 'sRGB');

      const fe = svgDoc.createElementNS(NS, 'feDropShadow');
      fe.setAttribute('dx', '0');
      fe.setAttribute('dy', '6');
      fe.setAttribute('stdDeviation', '8');
      fe.setAttribute('flood-color', 'rgba(0,0,0,0.25)');

      filter.appendChild(fe);
      defs.appendChild(filter);
    }

    ['ap_embody', 'ap_sustain', 'ap_think'].forEach(id => {
      const g = svgDoc.getElementById(id);
      if (g) g.setAttribute('filter', `url(#${filterId})`);
    });

    // SVG内のclipPathが影を切る場合に備えてclipCircleを拡張
    ['clip_bg_sustain', 'clip_bg_embody', 'clip_bg_think'].forEach(cid => {
      const c = svgDoc.getElementById(cid);
      if (c && c.tagName.toLowerCase() === 'circle') {
        const r = parseFloat(c.getAttribute('r'));
        if (!Number.isNaN(r)) c.setAttribute('r', String(r + 20));
      }
    });

    const textContainer = document.querySelector('#philosophy .img .text');
    if (!textContainer) return;

    const textMap = {
      embody: textContainer.querySelector('.embody'),
      sustain: textContainer.querySelector('.sustain'),
      think: textContainer.querySelector('.think'),
    };

    const setShow = (key) => {
      if (!key || !textMap[key]) return;
      Object.values(textMap).forEach(p => { if (p) p.classList.remove('show'); });
      textMap[key].classList.add('show');
    };

    const idToKey = {
      ap_embody: 'embody',
      ap_sustain: 'sustain',
      ap_think: 'think',
      ap_thik: 'think',
    };

    Object.entries(idToKey).forEach(([svgId, key]) => {
      const g = svgDoc.getElementById(svgId);
      if (!g) return;

      ['mouseenter', 'click', 'touchstart'].forEach(evt => {
        g.addEventListener(evt, (e) => {
          if (evt === 'touchstart') e.preventDefault();
          setShow(key);
        }, { passive: evt !== 'touchstart' });
      });
    });
  }

  // defer実行時にSVGが既に読み込み済みの場合は即実行、未読み込みならloadイベント待ち
  if (obj.contentDocument && obj.contentDocument.querySelector('svg')) {
    initSvg();
  } else {
    obj.addEventListener('load', initSvg);
  }
});
