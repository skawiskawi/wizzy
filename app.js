const THEME_KEY = 'wizzy-theme';
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const metaTheme = document.querySelector('meta[name="theme-color"]');

const currentTheme = root.dataset.theme || 'light';

const granimInstance = new window.Granim({
  element: '#granim-canvas',
  direction: 'diagonal',
  isPausedWhenNotInView: true,
  defaultStateName: currentTheme === 'dark' ? 'dark-state' : 'light-state',
  stateTransitionSpeed: 500,
  states: {
    'light-state': {
      gradients: [
        ['#ede4ff', '#bfa3ff'],
        ['#d8c7ff', '#a987ff'],
        ['#c6b0ff', '#f0e7ff'],
        ['#b596ff', '#dfd2ff']
      ],
      transitionSpeed: 3000
    },
    'dark-state': {
      gradients: [
        ['#211a30', '#4a386e'],
        ['#3a2b57', '#664e91'],
        ['#523e78', '#251e35'],
        ['#2c2240', '#5b4585']
      ],
      transitionSpeed: 3000
    }
  }
});

const applyTheme = (theme, persist = false) => {
  root.dataset.theme = theme;
  if (persist) localStorage.setItem(THEME_KEY, theme);
  if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#251e35' : '#cbb9ff');
  granimInstance.changeState(theme === 'dark' ? 'dark-state' : 'light-state');
};

toggleBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next, true);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light', false);
  }
});
