// Logic Wise navigation and lightweight page interactions.
const toggle = document.querySelector('.navbar-toggler');
const menu = document.getElementById('mainNav');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(opened));
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('show')) {
      menu.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  if (window.matchMedia) {
    const desktopQuery = window.matchMedia('(min-width: 1200px)');
    const resetMenu = event => {
      if (event.matches) {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', resetMenu);
    else if (desktopQuery.addListener) desktopQuery.addListener(resetMenu);
  }
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Highlight the current section when it enters the viewport.
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll('.nav-link').forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
