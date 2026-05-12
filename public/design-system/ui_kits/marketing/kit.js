/* SupraCloud marketing kit — partial loader + tiny interactions */
(async function () {
  const slots = document.querySelectorAll('[data-include]');
  await Promise.all([...slots].map(async slot => {
    const url = slot.dataset.include;
    try {
      const r = await fetch(url);
      slot.outerHTML = await r.text();
    } catch (e) { console.warn('include failed', url, e); }
  }));
  if (window.lucide) lucide.createIcons();

  // Industry toggle on booking
  document.querySelectorAll('.industry-toggle .ind').forEach(b => {
    b.addEventListener('click', () => {
      b.parentElement.querySelectorAll('.ind').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });
  // Generic chip group
  document.querySelectorAll('.chip-group').forEach(g => {
    g.querySelectorAll('.chip-btn').forEach(c => {
      c.addEventListener('click', () => {
        g.querySelectorAll('.chip-btn').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
      });
    });
  });
  document.querySelectorAll('.time-grid').forEach(g => {
    g.querySelectorAll('.time-slot').forEach(s => {
      s.addEventListener('click', () => {
        g.querySelectorAll('.time-slot').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
      });
    });
  });
})();
