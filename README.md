# HannanOS — Modern Desktop Operating System Portfolio

A sleek, high-fidelity single-page portfolio styled like a modern desktop operating system (inspired by macOS Sonoma and Windows 11 Fluent Design). Built with pure HTML5, vanilla CSS3 glassmorphism, and vanilla JavaScript (no heavyweight runtime frameworks needed).

---

## 🌟 Key Features

### 🖥️ Desktop & Window Management
- **Authentic Window Chrome**: macOS traffic lights (🔴 Close, 🟡 Minimize, 🟢 Maximize/Restore).
- **Smooth Drag & Resize**: Drag windows anywhere across the desktop with bounds detection. Resize from all 8 border and corner handles.
- **Dynamic Layering**: Active window auto-focus and z-index elevation.
- **Desktop Marquee**: Drag-to-select marquee box across desktop icons.
- **Desktop Context Menu**: Right-click anywhere on the desktop to change wallpaper, launch terminal, or toggle themes.

### 💻 Interactive Terminal (`terminal.app`)
A fully-featured UNIX-style shell (`hannan@portfolio:~$`) with command parsing, command history (Up/Down arrow keys), and Tab auto-completion:
- `help` / `?` — Lists all commands with interactive descriptions.
- `about` — Prints bio, core strengths, and current availability status.
- `projects` — Lists featured projects shipped with live stack tags.
- `skills` — Categorized breakdown of Frontend, Backend, Databases, and DevOps.
- `resume` — Qualifications, experience overview, and quick link.
- `contact` — Direct email, GitHub, LinkedIn, and social profiles.
- `open <app>` — Launches any window directly (`open projects`, `open resume`, etc.).
- `theme <dark|light|cyber>` — Switches the desktop visual theme.
- `wallpaper <1-6>` — Switches the desktop wallpaper directly from shell.
- `matrix` — Toggles falling green digital code rain on the desktop canvas.
- `clear` / `cls` — Clears terminal history.
- `whoami`, `date`, `echo`, `cat <file>`, `ls`, `history`, `sudo`.

### 🖼️ Customizable Wallpapers & Themes (`settings.app`)
- **6 High-Resolution Wallpapers**: Sonoma Dark Waves, Cyberpunk Horizon, Deep Space Nebula, Emerald Aurora, Dark Minimalist Dunes, Solar Mesh Gradient.
- **Custom Wallpaper URL**: Apply any custom image from the web.
- **Accent Color Picker**: Electric Blue, Radiant Purple, Emerald Green, Amber Gold, Rose Pink.
- **Themes**: Dark Mode, Light Mode, and Cyberpunk Neon.
- **Glassmorphism Blur Slider**: Customize the frosted backdrop filter blur in real time.

### 📁 Applications Included
1. **About Me (`about.app`)**: Avatar, availability badge, career statistics, interactive tabs (Story, Experience timeline, Education, Core Values).
2. **Projects Showcase (`projects.app`)**: Filter by category (AI/ML, Frontend, Full Stack, Dev Tools), live real-time keyword search, tech badges, and modal drawer.
3. **Skills Matrix (`skills.app`)**: Animated skill proficiency meters across Frontend, Backend, Databases, and Cloud/DevOps.
4. **Resume Viewer (`resume.app`)**: Professional CV layout with "Print Resume" and "Copy Contact" actions.
5. **Interactive Terminal (`terminal.app`)**: The complete command-line interface.
6. **Mail / Contact (`contact.app`)**: Send message form with animated submission states, notification toasts, and social pills.
7. **Lo-Fi Lounge (`music.app`)**: Relaxing chord progression synthesizer built using Web Audio API with spinning vinyl record and live frequency visualizer.
8. **Quick Notes (`notes.app`)**: Sticky notepad with auto-save to `localStorage`.

### 🔊 Pure Web Audio API Sound Effects
- Synthesized UI sounds: window open pops, clicks, minimize drops, notification chimes.
- Built-in Lo-Fi synthesizer generates ambient relaxation chords without any external audio files.

---

## 🚀 Running the Project

### Option 1: Directly in Browser
Simply double-click or open [index.html](file:///e:/hannan/os%20portfolio/index.html) in any modern browser (Google Chrome, Microsoft Edge, Brave, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000/index.html` in your browser.

---

## 📂 Project Structure

```
e:/hannan/os portfolio/
├── index.html           # Main OS desktop markup, windows, dock, and menus
├── css/
│   └── style.css        # Complete CSS design system, glassmorphism, responsive styles
├── js/
│   ├── os.js            # Window Manager, Dock, Menu Bar, Spotlight, Lock Screen
│   ├── apps.js          # App data, project list, skill bars, settings logic
│   ├── terminal.js      # Terminal shell command parser, history, autocompletion
│   └── audio.js         # Web Audio API sound synthesizer and Lo-Fi player
└── README.md            # Documentation and feature guide
```
