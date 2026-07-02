/* Interactive Graphics — shared era-graphics renderer.
   Four small procedural scenes, each using the RENDERING TECHNIQUE actually
   characteristic of its era (not the same algorithm recolored):
   - Apple II HGR  → NTSC artifact color (blue/orange fringing) + scanlines
   - NES-ish       → 8x8-ish tile grid + dithered checkerboard ground
   - Early Web     → ordered (Bayer) dithering between flat websafe colors + button bevel
   - Modern Canvas → smooth gradients + soft glow

   Used by: guidelines/brand-wordmark.card.html, components/cards/cards.card.html,
   ui_kits/course-site (HistoryStrip + card thumbnails). Plain <script src>,
   not a design-system component — a shared visual utility, like an icon set.
*/
(function () {
  const ERAS = [
    { key: 'appleii', name: 'Apple II HGR', sub: '~1977', technique: 'NTSC artifact color + scanlines', swatch: '#6fd0ff', draw: drawAppleII },
    { key: 'nes', name: 'NES-ish', sub: '~1985', technique: '8×8 tile grid + dithered ground', swatch: '#ef7d57', draw: drawNES },
    { key: 'gameboy', name: 'GameBoy DMG', sub: '~1989', technique: 'fixed 4-shade palette', swatch: '#8bac0f', draw: drawGameBoy },
    { key: 'web96', name: 'Early Web', sub: '~1996', technique: 'ordered GIF dither + bevel', swatch: '#336699', draw: drawWeb96 },
    { key: 'modern', name: 'Modern Canvas', sub: 'today', technique: 'gradients + soft glow', swatch: '#2563eb', draw: drawModern },
  ];
  // the four Constraint Machine eras, in order — used wherever the "same
  // scene, four eras" framing specifically matters (GameBoy is a fifth,
  // separate palette sourced from the GameBoy Sprite Editor tool instead).
  const FOUR_ERA_KEYS = ['appleii', 'nes', 'web96', 'modern'];

  function drawAppleII(ctx, W, H) {
    const cols = 40, rows = 26;
    const cell = Math.min(W / cols, H / rows);
    const ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2;
    const horizon = Math.floor(rows * 0.62);
    const BLACK = '#0f1720', WHITE = '#ffffff', BLUE = '#6fd0ff', ORANGE = '#ff7a53';
    function cell_(x, y, c) { ctx.fillStyle = c; ctx.fillRect(ox + x * cell, oy + y * cell, Math.ceil(cell), Math.ceil(cell)); }
    ctx.fillStyle = BLACK; ctx.fillRect(0, 0, W, H);
    const cx = Math.floor(cols * 0.5), top = Math.floor(rows * 0.26);
    for (let y = top; y < horizon; y++) {
      const half = Math.floor((y - top) * 0.95);
      for (let x = cx - half; x <= cx + half; x++) cell_(x, y, x % 2 === 0 ? BLUE : ORANGE);
    }
    const sx = Math.floor(cols * 0.78), sy = Math.floor(rows * 0.2), r = 2;
    for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) if (Math.abs(dx) + Math.abs(dy) <= r) cell_(sx + dx, sy + dy, WHITE);
    ctx.globalAlpha = 0.14; ctx.fillStyle = '#000';
    for (let y = 0; y < H; y += 2) ctx.fillRect(0, y, W, 1);
    ctx.globalAlpha = 1;
  }

  function drawNES(ctx, W, H) {
    const cols = 32, rows = 22;
    const cell = Math.min(W / cols, H / rows);
    const ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2;
    const horizon = Math.floor(rows * 0.62);
    const pal = ['#1a1c2c', '#5d275d', '#b13e53', '#ef7d57', '#ffcd75', '#a7f070', '#38b764', '#257179'];
    function cell_(x, y, c) { ctx.fillStyle = c; ctx.fillRect(ox + x * cell, oy + y * cell, Math.ceil(cell), Math.ceil(cell)); }
    for (let y = 0; y < horizon; y++) for (let x = 0; x < cols; x++) cell_(x, y, pal[7]);
    for (let y = horizon; y < rows; y++) for (let x = 0; x < cols; x++) cell_(x, y, (x + y) % 2 === 0 ? pal[6] : pal[5]);
    const cx = Math.floor(cols / 2);
    for (let t = 0; t < 6; t++) {
      const y = horizon - t * 2 - 2, half = 6 - t;
      for (let x = cx - half; x <= cx + half; x++) { cell_(x, y, pal[0]); cell_(x, y + 1, pal[0]); }
    }
    const sx = Math.floor(cols * 0.78), sy = Math.floor(rows * 0.16);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) cell_(sx + dx, sy + dy, pal[4]);
    ctx.strokeStyle = 'rgba(0,0,0,0.16)'; ctx.lineWidth = 1;
    for (let x = 0; x <= cols; x += 2) { ctx.beginPath(); ctx.moveTo(ox + x * cell, oy); ctx.lineTo(ox + x * cell, oy + rows * cell); ctx.stroke(); }
    for (let y = 0; y <= rows; y += 2) { ctx.beginPath(); ctx.moveTo(ox, oy + y * cell); ctx.lineTo(ox + cols * cell, oy + y * cell); ctx.stroke(); }
  }

  function drawWeb96(ctx, W, H) {
    const cols = 46, rows = 30;
    const cell = Math.min(W / cols, H / rows);
    const ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2;
    const horizon = Math.floor(rows * 0.62);
    const bayer = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
    const skyA = [0, 51, 102], skyB = [153, 204, 255];
    function cell_(x, y, c) { ctx.fillStyle = c; ctx.fillRect(ox + x * cell, oy + y * cell, Math.ceil(cell), Math.ceil(cell)); }
    for (let y = 0; y < horizon; y++) {
      const t = y / horizon;
      for (let x = 0; x < cols; x++) {
        const th = (bayer[y % 4][x % 4] + 0.5) / 16;
        const useB = t > th;
        const c = useB ? skyB : skyA;
        cell_(x, y, 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')');
      }
    }
    for (let y = horizon; y < rows; y++) for (let x = 0; x < cols; x++) cell_(x, y, '#336699');
    const cx = Math.floor(cols * 0.5), top = Math.floor(rows * 0.26);
    for (let y = top; y < horizon; y++) { const half = Math.floor((y - top) * 1.05); for (let x = cx - half; x <= cx + half; x++) cell_(x, y, '#003366'); }
    const sx = ox + cols * cell * 0.8, sy = oy + rows * cell * 0.18, s = cell * 3;
    ctx.fillStyle = '#ffcc66'; ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
    ctx.strokeStyle = '#fff176'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(sx - s / 2, sy + s / 2); ctx.lineTo(sx - s / 2, sy - s / 2); ctx.lineTo(sx + s / 2, sy - s / 2); ctx.stroke();
    ctx.strokeStyle = '#8a6d1a';
    ctx.beginPath(); ctx.moveTo(sx + s / 2, sy - s / 2); ctx.lineTo(sx + s / 2, sy + s / 2); ctx.lineTo(sx - s / 2, sy + s / 2); ctx.stroke();
  }

  function drawGameBoy(ctx, W, H) {
    // sourced from tools/gameboy-sprite-editor: the real DMG 4-shade palette,
    // darkest to lightest — the whole point of that tool is this fixed palette.
    const cols = 32, rows = 20;
    const cell = Math.min(W / cols, H / rows);
    const ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2;
    const pal = ['#0f380f', '#306230', '#8bac0f', '#9bbc0f'];
    function cell_(x, y, ci) { ctx.fillStyle = pal[ci]; ctx.fillRect(ox + x * cell, oy + y * cell, Math.ceil(cell), Math.ceil(cell)); }
    const horizon = Math.floor(rows * 0.62);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) cell_(x, y, y < horizon ? 3 : 2);
    const cx = Math.floor(cols / 2);
    for (let t = 0; t < 5; t++) {
      const y = horizon - t - 1, half = 5 - t;
      for (let x = cx - half; x <= cx + half; x++) cell_(x, y, 0);
    }
    const sx = Math.floor(cols * 0.78), sy = Math.floor(rows * 0.18), r = 2;
    for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) if (Math.abs(dx) + Math.abs(dy) <= r) cell_(sx + dx, sy + dy, 1);
  }

  function drawModern(ctx, W, H) {
    const horizonY = H * 0.62;
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, '#1f2937'); skyGrad.addColorStop(1, '#60a5fa');
    ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, horizonY);
    ctx.fillStyle = '#111827'; ctx.fillRect(0, horizonY, W, H - horizonY);
    const sx = W * 0.78, sy = H * 0.2;
    ctx.save();
    ctx.shadowColor = '#facc15'; ctx.shadowBlur = 16;
    const sunGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.055);
    sunGrad.addColorStop(0, '#fff7cc'); sunGrad.addColorStop(1, '#facc15');
    ctx.fillStyle = sunGrad;
    ctx.beginPath(); ctx.arc(sx, sy, W * 0.055, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    const cx = W * 0.5, top = H * 0.28;
    const mGrad = ctx.createLinearGradient(0, top, 0, horizonY);
    mGrad.addColorStop(0, '#2563eb'); mGrad.addColorStop(1, '#1f2937');
    ctx.fillStyle = mGrad;
    ctx.beginPath();
    ctx.moveTo(cx - (horizonY - top) * 0.95, horizonY);
    ctx.lineTo(cx, top);
    ctx.lineTo(cx + (horizonY - top) * 0.95, horizonY);
    ctx.closePath(); ctx.fill();
  }

  window.IGEraGraphics = {
    ERAS: ERAS,
    FOUR_ERA_KEYS: FOUR_ERA_KEYS,
    byKey: function (key) { return ERAS.filter(function (e) { return e.key === key; })[0] || ERAS[0]; },
    render: function (canvas, key) {
      const era = window.IGEraGraphics.byKey(key);
      era.draw(canvas.getContext('2d'), canvas.width, canvas.height);
      return era;
    },
  };
})();
