const THEME_KEY = 'wizzy-theme';
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const metaTheme = document.querySelector('meta[name="theme-color"]');

const currentTheme = root.dataset.theme || 'light';

const granimInstance = new window.Granim({
  element: '#granim-canvas',
  direction: 'left-right',
  isPausedWhenNotInView: true,
  defaultStateName: currentTheme === 'dark' ? 'dark-state' : 'light-state',
  stateTransitionSpeed: 500,
  states: {
    'light-state': {
      gradients: [
        ['#ede4ff', '#cbb9ff', '#b294ff'],
        ['#b294ff', '#dfd1ff', '#f3ecff'],
        ['#d5c2ff', '#a786ff', '#e7dbff']
      ],
      transitionSpeed: 2800
    },
    'dark-state': {
      gradients: [
        ['#251e35', '#433361', '#6b5294'],
        ['#5c4582', '#2c2340', '#7d62ab'],
        ['#382b52', '#70569c', '#211a30']
      ],
      transitionSpeed: 2800
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
