const tags = [
  'Responsive Design',
  'UI/UX Expertise',
  'HTML & CSS',
  'Team Player',
  'JavaScript Proficiency',
  'Problem Solving',
  'Keeping Abreast of Trends'
];

const mk = () => tags.map((tag) => `<span class="c">${tag}</span>`).join('');

const rows = document.getElementById('rows');
if (rows) {
  rows.innerHTML = [0, 1].map(() => `<div class="row">${mk()}${mk()}</div>`).join('');
}

const showPage = () => {
  const hash = (location.hash || '#home').slice(1);
  const valid = ['home', 'about', 'projects'];
  const pageId = valid.includes(hash) ? hash : 'home';

  document.querySelectorAll('.page').forEach((page) => {
    page.classList.toggle('on', page.id === pageId);
  });

  document.querySelectorAll('nav a').forEach((link) => {
    link.classList.toggle('on', link.dataset.p === pageId);
  });
};

window.addEventListener('hashchange', showPage);
showPage();

const themeButton = document.getElementById('theme');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeButton?.addEventListener('click', () => {
  const current = root.dataset.theme === 'light' ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});

const portraitSwitch = document.getElementById('portrait-switch');
portraitSwitch?.addEventListener('click', () => {
  const showOriginal = portraitSwitch.classList.toggle('is-original');
  portraitSwitch.setAttribute('aria-label', showOriginal ? 'Show anime-style portrait' : 'Show your original photo');
});

const roles = ['Developer', 'Designer', 'Problem Solver'];
const roleEl = document.getElementById('role');
if (roleEl) {
  let index = 0;
  let charIndex = 0;
  let deleting = false;

  const renderRole = () => {
    const current = roles[index];
    roleEl.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex += 1;
      setTimeout(renderRole, 90);
      return;
    }

    if (!deleting && charIndex >= current.length) {
      deleting = true;
      setTimeout(renderRole, 1200);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(renderRole, 60);
      return;
    }

    deleting = false;
    index = (index + 1) % roles.length;
    charIndex = 0;
    setTimeout(renderRole, 260);
  };

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderRole();
  }
}
