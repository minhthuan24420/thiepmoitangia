// Thiệp mời Mừng Nhà Mới
// - Co giãn thiệp 540×1080 cho vừa màn hình
// - Đổi tên khách mời qua đường link: ?ten=Thầy%20Minh  (ví dụ .../thiepmoitangia/?ten=Thầy Minh)
// - Đếm ngược tới ngày tiệc, hoa mai rơi
(function () {
  var CARD_W = 540, CARD_H = 1080;
  var EVENT = new Date('2026-11-28T11:00:00+07:00');

  var stage = document.getElementById('stage');
  var card = document.getElementById('card');

  function fit() {
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    var s = Math.min(vw / CARD_W, 1.25);
    if (vw >= 600) {
      // Máy tính: ưu tiên thấy trọn thiệp, nhưng không nhỏ quá
      s = Math.min(s, Math.max((vh - 48) / CARD_H, 0.72));
    }
    card.style.transform = 'scale(' + s + ')';
    stage.style.width = CARD_W * s + 'px';
    stage.style.height = CARD_H * s + 'px';
  }
  fit();
  window.addEventListener('resize', fit);

  // ----- tên khách mời từ đường link -----
  var guestEl = document.getElementById('guest');
  try {
    var params = new URLSearchParams(location.search);
    var ten = (params.get('ten') || params.get('name') || '').trim();
    if (ten) {
      guestEl.textContent = ten.slice(0, 60);
      document.title = 'Thiệp mời ' + ten + ' – Mừng Nhà Mới';
    }
  } catch (e) { /* giữ tên mặc định */ }

  // Thu nhỏ chữ nếu tên dài
  function fitGuest() {
    var size = 60;
    guestEl.style.fontSize = size + 'px';
    while (guestEl.scrollWidth > 370 && size > 28) {
      size -= 2;
      guestEl.style.fontSize = size + 'px';
    }
  }
  fitGuest();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitGuest);

  // ----- đếm ngược -----
  var cd = document.getElementById('countdown');
  function tick() {
    var diff = EVENT - new Date();
    if (diff <= 0) {
      cd.textContent = diff > -6 * 3600 * 1000
        ? 'Buổi tiệc đang diễn ra, kính mời quý thầy ghé chơi!'
        : 'Cảm ơn quý thầy đã chung vui cùng gia đình!';
      return;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor(diff / 3600000) % 24;
    var m = Math.floor(diff / 60000) % 60;
    cd.textContent = 'Còn ' + (d > 0 ? d + ' ngày ' : '') + h + ' giờ ' + m + ' phút nữa là đến buổi tiệc';
  }
  tick();
  setInterval(tick, 30000);

  // ----- hoa mai rơi -----
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    var box = document.getElementById('petals');
    for (var i = 0; i < 12; i++) {
      var p = document.createElement('span');
      p.className = 'petal';
      p.style.left = (Math.random() * 520) + 'px';
      var dur = 9 + Math.random() * 8;
      p.style.animationDuration = dur + 's';
      p.style.animationDelay = (-Math.random() * dur) + 's';
      var sc = 0.7 + Math.random() * 0.7;
      p.style.width = 9 * sc + 'px';
      p.style.height = 6 * sc + 'px';
      if (i % 4 === 0) p.style.background = '#e9b949';
      box.appendChild(p);
    }
  }
})();
