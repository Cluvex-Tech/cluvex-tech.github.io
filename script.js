'use strict';
document.documentElement.classList.add('js-enabled');
document.getElementById('year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const opened = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
const filters = document.querySelector('.filters');
filters.hidden = false;
filters.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    filters.querySelectorAll('button').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    document.querySelectorAll('.project-card').forEach(card => {
      const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.hidden = !visible;
      if (visible) count++;
    });
    document.getElementById('filter-status').textContent = `${count} ${count === 1 ? 'game' : 'games'} shown.`;
  });
});
const games = {
  patchle: {
    name: 'Patchle: Grid Puzzle', asset: 'patchle', package: 'patchle',
    description: 'A colorful grid puzzle about finding the right fit. Place shapes, fill the board, and enjoy a new little challenge.',
    features: ['1,000 handcrafted puzzles', 'Shape-based logic and colorful grids'],
    privacy: '00ec457f-e7bb-40a3-8385-07e134e39f0a'
  },
  numdrop: {
    name: 'NumDrop: Brain Puzzle', asset: 'numdrop', package: 'numdrop',
    description: 'Guide numbered tiles into a five-column grid. When a row or column adds up to the target, it clears. Chain your clears to build combos.',
    features: ['Play offline, with no account needed', 'Light, dark, and system themes', 'Track your best score and play streak'],
    privacy: '881b7373-1170-4068-81bf-5e8a553fccb9'
  },
  shrink: {
    name: 'Shrink & Grow: Brain Puzzle', asset: 'shrink-grow', package: 'shrinkandgrow',
    description: 'Find the perfect size and a fresh way forward. Follow a mountain journey built around clever changes in scale.',
    features: ['200 logic puzzles', 'A mountain journey with size-based challenges'],
    privacy: 'b9804d1e-a4cb-413b-98a0-b7ae13a726ef'
  },
  tile: {
    name: 'Tile Card: Match Puzzle', asset: 'tile-card', package: 'tilecard',
    description: 'Tap available cards into a seven-slot tray. Match three cards with the same rank and suit, reveal the layers beneath, and clear the board.',
    features: ['1,000 levels across four difficulty tiers', 'Daily challenges and helpful boosters', 'An internet connection is required to play'],
    privacy: 'f0dc3d8e-9adb-460c-ba16-218bbdb6f596'
  }
};
const dialog = document.getElementById('game-dialog');
let lastDialogTrigger = null;
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('.details-button').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      const game = games[button.dataset.game];
      lastDialogTrigger = button;
      document.getElementById('dialog-title').textContent = game.name;
      document.getElementById('dialog-description').textContent = game.description;
      const features = document.getElementById('dialog-features');
      features.replaceChildren(...game.features.map(feature => {
        const item = document.createElement('li');
        item.textContent = feature;
        return item;
      }));
      document.getElementById('dialog-icon').src = `assets/apps/${game.asset}-icon.webp`;
      const screenshot = document.getElementById('dialog-screen');
      screenshot.src = `assets/apps/${game.asset}-screen.webp`;
      screenshot.alt = `${game.name} preview`;
      document.getElementById('dialog-store').href = `https://play.google.com/store/apps/details?id=com.cluvextech.${game.package}`;
      document.getElementById('dialog-privacy').href = `https://www.freeprivacypolicy.com/live/${game.privacy}`;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      dialog.querySelector('.dialog-close').focus();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    lastDialogTrigger?.focus();
  });
}
const copyButton = document.querySelector('.copy-email');
if (navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText('cluvextech@gmail.com');
      status.textContent = 'Email copied';
    } catch {
      status.textContent = 'Use the email link above.';
    }
  });
}
