/* ACPS Cultural Club — shared script (mobile menu + scroll reveal) */
(function () {
  /* Mobile menu */
  var btn = document.querySelector('.menu-btn');
  var links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  /* Scroll reveal */
  var cards = document.querySelectorAll(
    '.highlight-card, .hub-card, .member-card, .advisor-card, .gallery-tile, .event-row, ' +
    '.seg-card, .cat-card, .summit-facts > div, .register-box, .mission-grid > div, .teaser-grid > div, .contact-grid > div, .info-item'
  );
  var heads = document.querySelectorAll('section h2, .sub-head');

  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (el) { el.classList.add('in-view'); });
    heads.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.classList.add('in-view');
        io.unobserve(el);
        setTimeout(function () { el.style.transitionDelay = ''; }, 1000);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.06 + 's';
    io.observe(el);
  });
  heads.forEach(function (el) { io.observe(el); });

  /* Segment filter (events page) */
  var chips = document.querySelectorAll('.seg-chip');
  var segs = document.querySelectorAll('.seg-card');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      segs.forEach(function (card) {
        var show = f === 'all' || card.getAttribute('data-cat') === f;
        card.hidden = !show;
        if (show) {
          card.classList.add('in-view');
          card.classList.remove('pop');
          void card.offsetWidth;
          card.classList.add('pop');
        }
      });
    });
  });
})();
