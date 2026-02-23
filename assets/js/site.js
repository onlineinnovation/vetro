// Central site JS: mobile menu and small helpers
document.addEventListener('DOMContentLoaded', function () {
  try {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    var refBtn = document.getElementById('mobile-referenser-btn');
    var refList = document.getElementById('mobile-referenser-list');

    if (btn && menu) {
      btn.addEventListener('click', function () {
        menu.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
      });
      // Close mobile menu when clicking any internal link inside it
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    if (refBtn && refList) {
      refBtn.addEventListener('click', function () {
        refList.classList.toggle('hidden');
      });
    }
  } catch (e) {
    // Fail silently; nothing critical
    console.error('site.js error', e);
  }
});
