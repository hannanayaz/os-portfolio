/**
 * HannanOS - Operating System Engine & Window Manager
 * Manages windows, dock, desktop icons, top menu bar, control center,
 * spotlight search, lock screen, and wallpaper manager.
 */

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.highestZ = 100;
    this.activeWindowId = null;
    this.cascadeOffset = 0;
  }

  registerWindow(id, options = {}) {
    const el = document.getElementById(id);
    if (!el) return null;

    const winData = {
      id,
      el,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      prevBounds: { top: 60, left: 100, width: 720, height: 480 },
      title: options.title || id,
      icon: options.icon || '',
      minWidth: options.minWidth || 340,
      minHeight: options.minHeight || 240
    };

    this.windows.set(id, winData);
    this.setupWindowEvents(winData);
    return winData;
  }

  setupWindowEvents(winData) {
    const { el, id } = winData;
    const titlebar = el.querySelector('.window-titlebar');
    const btnClose = el.querySelector('.btn-close');
    const btnMin = el.querySelector('.btn-minimize');
    const btnMax = el.querySelector('.btn-maximize');

    // Focus on window click
    el.addEventListener('mousedown', () => this.bringToFront(id));
    el.addEventListener('touchstart', () => this.bringToFront(id), { passive: true });

    // Window controls
    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeApp(id);
      });
    }
    if (btnMin) {
      btnMin.addEventListener('click', (e) => {
        e.stopPropagation();
        this.minimizeApp(id);
      });
    }
    if (btnMax) {
      btnMax.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMaximize(id);
      });
    }

    // Double-click titlebar to toggle maximize
    if (titlebar) {
      titlebar.addEventListener('dblclick', () => this.toggleMaximize(id));
      this.makeDraggable(winData, titlebar);
    }

    // Resize handles
    this.makeResizable(winData);
  }

  makeDraggable(winData, handle) {
    const { el, id } = winData;
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const onPointerDown = (clientX, clientY) => {
      if (winData.isMaximized) return;
      this.bringToFront(id);
      isDragging = true;
      startX = clientX;
      startY = clientY;
      const rect = el.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      document.body.style.userSelect = 'none';
    };

    const onPointerMove = (clientX, clientY) => {
      if (!isDragging) return;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      let newLeft = initialLeft + deltaX;
      let newTop = initialTop + deltaY;

      // Bounds constraint (keep titlebar on desktop)
      const maxLeft = window.innerWidth - 80;
      const maxTop = window.innerHeight - 100;
      newLeft = Math.max(-rectWidth(el) + 100, Math.min(newLeft, maxLeft));
      newTop = Math.max(32, Math.min(newTop, maxTop));

      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
      }
    };

    handle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.window-btn')) return;
      onPointerDown(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onPointerUp);

    // Touch support
    handle.addEventListener('touchstart', (e) => {
      if (e.target.closest('.window-btn')) return;
      const t = e.touches[0];
      onPointerDown(t.clientX, t.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const t = e.touches[0];
      onPointerMove(t.clientX, t.clientY);
    }, { passive: true });

    window.addEventListener('touchend', onPointerUp);

    function rectWidth(elem) {
      return elem.offsetWidth || 400;
    }
  }

  makeResizable(winData) {
    const { el, id, minWidth, minHeight } = winData;
    const handles = el.querySelectorAll('.resize-handle');

    handles.forEach(handle => {
      let isResizing = false;
      let startX, startY, startWidth, startHeight, startLeft, startTop;
      const dir = handle.dataset.direction;

      const onMouseDown = (e) => {
        if (winData.isMaximized) return;
        e.stopPropagation();
        this.bringToFront(id);
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = el.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;
        document.body.style.userSelect = 'none';
      };

      const onMouseMove = (e) => {
        if (!isResizing) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (dir.includes('e')) {
          el.style.width = `${Math.max(minWidth, startWidth + dx)}px`;
        }
        if (dir.includes('s')) {
          el.style.height = `${Math.max(minHeight, startHeight + dy)}px`;
        }
        if (dir.includes('w')) {
          const newW = startWidth - dx;
          if (newW > minWidth) {
            el.style.width = `${newW}px`;
            el.style.left = `${startLeft + dx}px`;
          }
        }
        if (dir.includes('n')) {
          const newH = startHeight - dy;
          if (newH > minHeight && startTop + dy >= 32) {
            el.style.height = `${newH}px`;
            el.style.top = `${startTop + dy}px`;
          }
        }
      };

      const onMouseUp = () => {
        if (isResizing) {
          isResizing = false;
          document.body.style.userSelect = '';
        }
      };

      handle.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }

  bringToFront(id) {
    const win = this.windows.get(id);
    if (!win) return;

    this.highestZ += 2;
    win.el.style.zIndex = this.highestZ;

    this.windows.forEach(w => w.el.classList.remove('active'));
    win.el.classList.remove('minimized');
    win.el.classList.add('active');
    this.activeWindowId = id;

    // Update active app title in menu bar
    const menuTitle = document.getElementById('active-app-name');
    if (menuTitle) {
      menuTitle.textContent = win.title;
    }
  }

  openApp(id) {
    const win = this.windows.get(id);
    if (!win) return false;

    if (window.soundSystem) window.soundSystem.playOpen();

    if (!win.isOpen) {
      win.isOpen = true;
      win.el.classList.add('open');
      win.el.classList.remove('minimized');

      // Cascade positioning
      const baseTop = 60 + (this.cascadeOffset % 5) * 28;
      const baseLeft = 90 + (this.cascadeOffset % 5) * 28;
      this.cascadeOffset++;

      if (!win.el.style.top || win.el.style.top === '0px') {
        win.el.style.top = `${baseTop}px`;
        win.el.style.left = `${baseLeft}px`;
      }
    } else if (win.isMinimized) {
      win.isMinimized = false;
      win.el.classList.remove('minimized');
    }

    this.bringToFront(id);
    this.updateDockState(id, true);
    return true;
  }

  closeApp(id) {
    const win = this.windows.get(id);
    if (!win) return;

    if (window.soundSystem) window.soundSystem.playClick();

    win.isOpen = false;
    win.isMinimized = false;
    win.isMaximized = false;
    win.el.classList.remove('open', 'active', 'maximized');

    this.updateDockState(id, false);

    // Set active window to top remaining window
    let nextTopWin = null;
    let maxZ = -1;
    this.windows.forEach(w => {
      if (w.isOpen && !w.isMinimized) {
        const z = parseInt(w.el.style.zIndex || '0', 10);
        if (z > maxZ) {
          maxZ = z;
          nextTopWin = w;
        }
      }
    });

    if (nextTopWin) {
      this.bringToFront(nextTopWin.id);
    } else {
      const menuTitle = document.getElementById('active-app-name');
      if (menuTitle) menuTitle.textContent = 'Finder';
    }
  }

  minimizeApp(id) {
    const win = this.windows.get(id);
    if (!win) return;

    if (window.soundSystem) window.soundSystem.playMinimize();

    win.isMinimized = true;
    win.el.classList.add('minimized');
    win.el.classList.remove('active');
  }

  toggleMaximize(id) {
    const win = this.windows.get(id);
    if (!win) return;

    if (window.soundSystem) window.soundSystem.playClick();

    if (win.isMaximized) {
      // Restore
      win.isMaximized = false;
      win.el.classList.remove('maximized');
      win.el.style.top = `${win.prevBounds.top}px`;
      win.el.style.left = `${win.prevBounds.left}px`;
      win.el.style.width = `${win.prevBounds.width}px`;
      win.el.style.height = `${win.prevBounds.height}px`;
    } else {
      // Maximize
      const rect = win.el.getBoundingClientRect();
      win.prevBounds = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
      win.isMaximized = true;
      win.el.classList.add('maximized');
    }
  }

  updateDockState(id, isRunning) {
    const dockItem = document.querySelector(`.dock-item[data-app="${id}"]`);
    if (dockItem) {
      if (isRunning) {
        dockItem.classList.add('running');
      } else {
        dockItem.classList.remove('running');
      }
    }
  }
}

// Wallpaper & System Settings Manager
class SettingsManager {
  constructor() {
    this.init();
  }

  init() {
    const savedWall = localStorage.getItem('hannanos_wallpaper') || 'sonoma';
    const savedTheme = localStorage.getItem('hannanos_theme') || 'dark';

    if (savedWall === 'custom') {
      const customUrl = localStorage.getItem('hannanos_custom_wallpaper_url');
      if (customUrl) {
        this.setCustomWallpaper(customUrl, false);
      } else {
        this.switchWallpaper('sonoma', false);
      }
    } else {
      this.switchWallpaper(savedWall, false);
    }
    this.setTheme(savedTheme, false);
  }

  switchWallpaper(wallId, notify = true) {
    const bgElem = document.getElementById('wallpaper-layer');
    if (!bgElem) return;

    let targetStyle = '';
    const preset = portfolioData.wallpapers.find(w => w.id === wallId);
    if (preset) {
      targetStyle = preset.src;
      localStorage.setItem('hannanos_wallpaper', wallId);
    } else {
      const num = parseInt(wallId, 10);
      if (!isNaN(num) && portfolioData.wallpapers[num - 1]) {
        targetStyle = portfolioData.wallpapers[num - 1].src;
        localStorage.setItem('hannanos_wallpaper', portfolioData.wallpapers[num - 1].id);
      } else if (portfolioData.wallpapers.length > 0) {
        targetStyle = portfolioData.wallpapers[0].src;
        localStorage.setItem('hannanos_wallpaper', portfolioData.wallpapers[0].id);
      }
    }

    if (targetStyle) {
      bgElem.style.background = targetStyle;
      bgElem.style.backgroundSize = 'cover';
      bgElem.style.backgroundPosition = 'center';
      if (notify && window.showToast) {
        window.showToast("Wallpaper Changed", "Desktop background updated successfully.");
      }
    }
  }

  setCustomWallpaper(url, notify = true) {
    const bgElem = document.getElementById('wallpaper-layer');
    if (!bgElem) return;

    bgElem.style.background = `url("${url}") center/cover no-repeat`;
    localStorage.setItem('hannanos_wallpaper', 'custom');
    localStorage.setItem('hannanos_custom_wallpaper_url', url);
    if (notify && window.showToast) {
      window.showToast("Custom Wallpaper Applied", "Loaded custom background image.");
    }
  }

  setTheme(theme, notify = true) {
    document.body.classList.remove('theme-light', 'theme-cyber');
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else if (theme === 'cyber') {
      document.body.classList.add('theme-cyber');
    }
    localStorage.setItem('hannanos_theme', theme);
    if (notify && window.showToast) {
      window.showToast("Theme Changed", `Interface set to ${theme.toUpperCase()} mode.`);
    }
  }
}

// Toast System
function showToast(title, message, iconSvg = '') {
  const container = document.getElementById('toast-shelf');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">
      ${iconSvg || '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'}
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4200);
}
window.showToast = showToast;

// Real-Time Clock & Date in Menu Bar
function initClock() {
  const clockEl = document.getElementById('menu-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dateNum = now.getDate();

    let hours = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    clockEl.textContent = `${dayName} ${monthName} ${dateNum}  ${hours}:${mins} ${ampm}`;

    // Update lock screen clock if present
    const lockClock = document.getElementById('lock-screen-clock');
    const lockDate = document.getElementById('lock-screen-date');
    if (lockClock) lockClock.textContent = `${hours}:${mins} ${ampm}`;
    if (lockDate) lockDate.textContent = `${dayName}, ${monthName} ${dateNum}`;
  }

  update();
  setInterval(update, 1000);
}

// Matrix Falling Code Animation Canvas
function setupMatrixWallpaper() {
  const canvas = document.getElementById('canvas-wallpaper');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(3, 7, 18, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff70';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    animationId = requestAnimationFrame(draw);
  }

  let isActive = false;
  window.toggleMatrixWallpaper = () => {
    isActive = !isActive;
    if (isActive) {
      canvas.classList.add('active');
      draw();
    } else {
      canvas.classList.remove('active');
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return isActive;
  };
}

// Spotlight Global Search
function setupSpotlightSearch() {
  const overlay = document.getElementById('spotlight-modal');
  const input = document.getElementById('spotlight-input');
  const resultsContainer = document.getElementById('spotlight-results');
  const triggerBtn = document.getElementById('menu-spotlight-btn');

  if (!overlay || !input || !resultsContainer) return;

  const searchableItems = [
    { title: "About Me", desc: "Hannan's bio, journey, and technical experience", app: "about" },
    { title: "Projects Showcase", desc: "Explore 6+ web, AI, and full stack applications", app: "projects" },
    { title: "Skills Matrix", desc: "Interactive proficiency bars and technical skills", app: "skills" },
    { title: "Resume / CV", desc: "Professional background, credentials, and printable CV", app: "resume" },
    { title: "Interactive Terminal", desc: "UNIX style developer command-line shell", app: "terminal" },
    { title: "System Settings", desc: "Change desktop wallpapers, accents, and themes", app: "settings" },
    { title: "Contact Hannan", desc: "Send an email message and find social handles", app: "contact" },
    { title: "Lo-Fi Music Lounge", desc: "Web Audio ambient chill sound synthesizer", app: "music" },
    { title: "Quick Notes", desc: "Sticky scratchpad with persistent local storage", app: "notes" }
  ];

  function openSpotlight() {
    overlay.classList.add('open');
    input.value = '';
    renderResults('');
    input.focus();
  }

  function closeSpotlight() {
    overlay.classList.remove('open');
  }

  function renderResults(q) {
    const filtered = searchableItems.filter(item => 
      item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-dim); font-size: 13px;">No results found for "${q}"</div>`;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
      <div class="spotlight-item" data-app="${item.app}">
        <div class="spotlight-item-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div class="spotlight-item-text">
          <div class="spotlight-item-title">${item.title}</div>
          <div class="spotlight-item-desc">${item.desc}</div>
        </div>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.spotlight-item').forEach(el => {
      el.addEventListener('click', () => {
        const app = el.getAttribute('data-app');
        if (window.osWindowManager) window.osWindowManager.openApp(app);
        closeSpotlight();
      });
    });
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openSpotlight);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSpotlight();
  });

  input.addEventListener('input', (e) => {
    renderResults(e.target.value.toLowerCase().trim());
  });

  // Shortcut Cmd+K / Ctrl+K / Escape
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) closeSpotlight();
      else openSpotlight();
    } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeSpotlight();
    }
  });
}

// Control Center Panel
function setupControlCenter() {
  const btn = document.getElementById('menu-cc-btn');
  const panel = document.getElementById('control-center-panel');
  if (!btn || !panel) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btn) {
      panel.classList.remove('open');
    }
  });

  // Dark/Light toggle
  const themeCard = document.getElementById('cc-theme-toggle');
  if (themeCard) {
    themeCard.addEventListener('click', () => {
      const isLight = document.body.classList.contains('theme-light');
      window.osSettings.setTheme(isLight ? 'dark' : 'light');
      themeCard.classList.toggle('active', !isLight);
    });
  }

  // Audio mute toggle
  const audioCard = document.getElementById('cc-sound-toggle');
  if (audioCard) {
    audioCard.addEventListener('click', () => {
      window.soundSystem.enabled = !window.soundSystem.enabled;
      audioCard.classList.toggle('active', window.soundSystem.enabled);
      if (window.showToast) {
        window.showToast("Sound " + (window.soundSystem.enabled ? "Enabled" : "Muted"), "UI sound effects updated.");
      }
    });
  }

  // Music toggle
  const musicCard = document.getElementById('cc-music-toggle');
  if (musicCard) {
    musicCard.addEventListener('click', () => {
      window.soundSystem.toggleLoFiMusic((playing) => {
        musicCard.classList.toggle('active', playing);
      });
    });
  }

  // Brightness slider
  const brightnessSlider = document.getElementById('cc-brightness-slider');
  if (brightnessSlider) {
    brightnessSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      document.body.style.filter = `brightness(${val}%)`;
    });
  }

  // Blur slider
  const blurSlider = document.getElementById('cc-blur-slider');
  if (blurSlider) {
    blurSlider.addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--glass-blur', `${e.target.value}px`);
    });
  }
}

// Desktop Context Menu & Selection Box
function setupDesktopInteractions() {
  const desktop = document.getElementById('desktop-area');
  const contextMenu = document.getElementById('desktop-context-menu');
  const selectionBox = document.getElementById('selection-box');
  if (!desktop || !contextMenu) return;

  // Right-click context menu
  desktop.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.os-window') || e.target.closest('.dock')) return;
    e.preventDefault();
    contextMenu.style.left = `${Math.min(e.clientX, window.innerWidth - 200)}px`;
    contextMenu.style.top = `${Math.min(e.clientY, window.innerHeight - 250)}px`;
    contextMenu.classList.add('open');
  });

  document.addEventListener('click', () => {
    contextMenu.classList.remove('open');
  });

  // Context Menu actions
  contextMenu.querySelectorAll('.context-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      if (action === 'open-settings') window.osWindowManager.openApp('settings');
      if (action === 'open-terminal') window.osWindowManager.openApp('terminal');
      if (action === 'open-projects') window.osWindowManager.openApp('projects');
      if (action === 'open-about') window.osWindowManager.openApp('about');
      if (action === 'toggle-theme') {
        const isLight = document.body.classList.contains('theme-light');
        window.osSettings.setTheme(isLight ? 'dark' : 'light');
      }
      if (action === 'lock-screen') toggleLockScreen(true);
      contextMenu.classList.remove('open');
    });
  });

  // Desktop Rubberband Selection
  let isSelecting = false;
  let startX, startY;

  desktop.addEventListener('mousedown', (e) => {
    if (e.target.closest('.os-window') || e.target.closest('.dock') || e.target.closest('.desktop-icon')) {
      return;
    }
    // Deselect desktop icons
    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));

    isSelecting = true;
    startX = e.clientX;
    startY = e.clientY;
    if (selectionBox) {
      selectionBox.style.left = `${startX}px`;
      selectionBox.style.top = `${startY}px`;
      selectionBox.style.width = '0px';
      selectionBox.style.height = '0px';
      selectionBox.style.display = 'block';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isSelecting || !selectionBox) return;
    const currentX = e.clientX;
    const currentY = e.clientY;

    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    selectionBox.style.left = `${left}px`;
    selectionBox.style.top = `${top}px`;
    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;
  });

  window.addEventListener('mouseup', () => {
    if (isSelecting) {
      isSelecting = false;
      if (selectionBox) selectionBox.style.display = 'none';
    }
  });
}

// Lock Screen Logic
function setupLockScreen() {
  const lock = document.getElementById('lock-screen');
  const unlockBtn = document.getElementById('lock-screen-unlock-btn');
  if (!lock) return;

  unlockBtn.addEventListener('click', () => toggleLockScreen(false));
  window.addEventListener('keydown', (e) => {
    if (lock.classList.contains('active') && (e.key === 'Enter' || e.key === ' ')) {
      toggleLockScreen(false);
    }
  });
}

function toggleLockScreen(active) {
  const lock = document.getElementById('lock-screen');
  if (!lock) return;
  if (active) {
    lock.classList.add('active');
  } else {
    lock.classList.remove('active');
    if (window.soundSystem) window.soundSystem.playClick();
  }
}

// Global System Bootloader
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Window Manager
  const wm = new WindowManager();
  window.osWindowManager = wm;

  const appConfigs = [
    { id: 'about', title: 'About Me', minWidth: 460, minHeight: 380 },
    { id: 'projects', title: 'Projects Showcase', minWidth: 540, minHeight: 440 },
    { id: 'skills', title: 'Skills & Tech Stack', minWidth: 500, minHeight: 400 },
    { id: 'resume', title: 'Resume & Curriculum Vitae', minWidth: 520, minHeight: 450 },
    { id: 'terminal', title: 'hannan@os: ~', minWidth: 520, minHeight: 360 },
    { id: 'settings', title: 'System Settings', minWidth: 480, minHeight: 400 },
    { id: 'contact', title: 'Mail & Contact', minWidth: 440, minHeight: 420 },
    { id: 'music', title: 'Lo-Fi Lounge', minWidth: 360, minHeight: 380 },
    { id: 'notes', title: 'Quick Notes', minWidth: 360, minHeight: 300 }
  ];

  appConfigs.forEach(cfg => wm.registerWindow(cfg.id, cfg));

  // 2. Settings & Themes
  window.osSettings = new SettingsManager();

  // 3. Initialize Apps
  if (window.initAboutApp) window.initAboutApp();
  if (window.initProjectsApp) window.initProjectsApp();
  if (window.initSkillsApp) window.initSkillsApp();
  if (window.initResumeApp) window.initResumeApp();
  if (window.initSettingsApp) window.initSettingsApp();
  if (window.initContactApp) window.initContactApp();
  if (window.initMusicApp) window.initMusicApp();
  if (window.initNotesApp) window.initNotesApp();

  // 4. Interactive Terminal
  if (window.TerminalApp) {
    window.terminalInstance = new window.TerminalApp('terminal-content');
  }

  // 5. Desktop Icons
  document.querySelectorAll('.desktop-icon').forEach(icon => {
    const app = icon.getAttribute('data-app');
    
    // Selection state
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');
    });

    // Launch on double click (or single click on touch)
    let lastTap = 0;
    icon.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - lastTap < 350 || window.innerWidth < 768) {
        wm.openApp(app);
      }
      lastTap = now;
    });

    icon.addEventListener('dblclick', () => {
      wm.openApp(app);
    });
  });

  // 6. Dock Items
  document.querySelectorAll('.dock-item').forEach(item => {
    const app = item.getAttribute('data-app');
    item.addEventListener('click', () => {
      const win = wm.windows.get(app);
      if (win && win.isOpen && !win.isMinimized && wm.activeWindowId === app) {
        wm.minimizeApp(app);
      } else {
        wm.openApp(app);
      }
    });
  });

  // 7. System UI Components
  initClock();
  setupControlCenter();
  setupSpotlightSearch();
  setupDesktopInteractions();
  setupLockScreen();
  setupMatrixWallpaper();

  // Apple Logo Menu
  const appleMenuBtn = document.getElementById('apple-menu-btn');
  const appleDropdown = document.getElementById('apple-dropdown-menu');
  if (appleMenuBtn && appleDropdown) {
    appleMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      appleDropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => appleDropdown.classList.remove('open'));

    appleDropdown.querySelectorAll('.context-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        if (action === 'about-os') wm.openApp('about');
        if (action === 'settings') wm.openApp('settings');
        if (action === 'lock') toggleLockScreen(true);
        if (action === 'restart') location.reload();
        appleDropdown.classList.remove('open');
      });
    });
  }

  // Auto-open About Me and Terminal on launch for stunning first impression!
  setTimeout(() => {
    wm.openApp('about');
    // Position About Me nicely in upper-left
    const aboutWin = wm.windows.get('about');
    if (aboutWin) {
      aboutWin.el.style.top = '65px';
      aboutWin.el.style.left = '75px';
      aboutWin.el.style.width = '640px';
      aboutWin.el.style.height = '520px';
    }

    setTimeout(() => {
      wm.openApp('terminal');
      const termWin = wm.windows.get('terminal');
      if (termWin) {
        termWin.el.style.top = '120px';
        termWin.el.style.left = '380px';
        termWin.el.style.width = '620px';
        termWin.el.style.height = '430px';
      }
      showToast("Welcome to HannanOS!", "Type 'help' in Terminal or explore desktop icons.");
    }, 400);
  }, 200);
});
