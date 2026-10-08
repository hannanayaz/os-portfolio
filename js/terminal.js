/**
 * HannanOS - Interactive Terminal Application
 * Features command history, autocomplete, formatted HTML outputs,
 * and system command integrations.
 */

class TerminalApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.history = [];
    this.historyIndex = -1;
    this.commandList = [
      'help', 'about', 'projects', 'skills', 'resume', 
      'contact', 'open', 'theme', 'wallpaper', 'matrix', 
      'ls', 'cat', 'clear', 'whoami', 'date', 'echo', 
      'history', 'sudo', 'exit'
    ];
    this.virtualFiles = {
      'about.md': `# Hannan - Full Stack Engineer & Creative Technologist\nBuilding high-performance web applications, AI workflows, and bespoke UI/UX experiences.\nLocation: Remote / Global\nStatus: 🟢 Open to high-impact opportunities`,
      'skills.yaml': `frontend:\n  - React / Next.js\n  - TypeScript\n  - Tailwind CSS / Vanilla CSS3\n  - Canvas / WebGL\nbackend:\n  - Node.js / Express\n  - Python / FastAPI\n  - PostgreSQL / Supabase\n  - Docker / AWS`,
      'contact.json': `{\n  "email": "hannan.developer@example.com",\n  "github": "https://github.com",\n  "linkedin": "https://linkedin.com",\n  "twitter": "https://twitter.com"\n}`,
      'secrets.txt': `✨ Easter Egg Unlocked!\n"Simplicity is the soul of efficiency." — Austin Freeman\nTry running 'matrix' or 'theme cyber' in this terminal!`
    };

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="terminal-banner">
██╗  ██╗ █████╗ ███╗   ██╗███╗   ██╗ █████╗ ███╗   ██╗ ██████╗ ███████╗
██║  ██║██╔══██╗████╗  ██║████╗  ██║██╔══██╗████╗  ██║██╔═══██╗██╔════╝
███████║███████║██╔██╗ ██║██╔██╗ ██║███████║██╔██╗ ██║██║   ██║███████╗
██╔══██║██╔══██║██║╚██╗██║██║╚██╗██║██╔══██║██║╚██╗██║██║   ██║╚════██║
██║  ██║██║  ██║██║ ╚████║██║ ╚████║██║  ██║██║ ╚████║╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
      </div>
      <div class="terminal-welcome">
        Welcome to <strong>HannanOS Terminal v2.4.0</strong>. Type <span class="cmd">help</span> to view available commands or <span class="cmd">about</span> to learn more.
      </div>
      <div class="terminal-history" id="term-history"></div>
      <div class="terminal-input-row">
        <span class="terminal-prompt">
          <span class="terminal-prompt-user">hannan@os</span>:<span class="terminal-prompt-path">~</span>$
        </span>
        <input type="text" class="terminal-input" id="term-input" autocomplete="off" spellcheck="false" autofocus />
      </div>
    `;

    this.input = this.container.querySelector('#term-input');
    this.historyContainer = this.container.querySelector('#term-history');
  }

  bindEvents() {
    this.container.addEventListener('click', () => {
      if (this.input) this.input.focus();
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.executeCommand(cmd);
        } else {
          this.printPromptLine('');
        }
        this.input.value = '';
        this.scrollToBottom();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex] || '';
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.handleAutocomplete();
      }
    });
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  handleAutocomplete() {
    const text = this.input.value.trim();
    if (!text) return;

    const matches = this.commandList.filter(cmd => cmd.startsWith(text.toLowerCase()));
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.printPromptLine(text);
      this.printOutput(`<div class="terminal-output info">${matches.join('   ')}</div>`);
      this.scrollToBottom();
    }
  }

  printPromptLine(cmd) {
    const line = document.createElement('div');
    line.className = 'terminal-line cmd-echo';
    line.innerHTML = `
      <span class="terminal-prompt">
        <span class="terminal-prompt-user">hannan@os</span>:<span class="terminal-prompt-path">~</span>$
      </span>
      <span>${this.escapeHTML(cmd)}</span>
    `;
    this.historyContainer.appendChild(line);
  }

  printOutput(htmlContent) {
    const output = document.createElement('div');
    output.className = 'terminal-output';
    output.innerHTML = htmlContent;
    this.historyContainer.appendChild(output);
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  executeCommand(fullCmd) {
    this.printPromptLine(fullCmd);
    if (window.soundSystem) window.soundSystem.playClick();

    const parts = fullCmd.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
      case '?':
        this.printOutput(`
          <table class="terminal-table">
            <thead>
              <tr>
                <th style="width: 140px;">Command</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>about</strong></td><td>Learn about Hannan and personal background</td></tr>
              <tr><td><strong>projects</strong></td><td>View showcase projects and applications</td></tr>
              <tr><td><strong>skills</strong></td><td>Display technical skills and stack overview</td></tr>
              <tr><td><strong>resume</strong></td><td>View CV summary or open Resume window</td></tr>
              <tr><td><strong>contact</strong></td><td>Get email, social channels & direct links</td></tr>
              <tr><td><strong>open &lt;app&gt;</strong></td><td>Launch desktop app (about, projects, skills, resume, settings, etc.)</td></tr>
              <tr><td><strong>theme &lt;name&gt;</strong></td><td>Set theme (dark, light, cyber)</td></tr>
              <tr><td><strong>wallpaper &lt;1-6&gt;</strong></td><td>Change desktop background wallpaper</td></tr>
              <tr><td><strong>matrix</strong></td><td>Toggle Matrix green falling code visualizer</td></tr>
              <tr><td><strong>ls</strong></td><td>List virtual files</td></tr>
              <tr><td><strong>cat &lt;file&gt;</strong></td><td>Print contents of a virtual file</td></tr>
              <tr><td><strong>clear / cls</strong></td><td>Clear the terminal screen</td></tr>
              <tr><td><strong>whoami</strong></td><td>Display current user profile</td></tr>
              <tr><td><strong>date</strong></td><td>Print current system timestamp</td></tr>
              <tr><td><strong>echo &lt;text&gt;</strong></td><td>Echo text to the screen</td></tr>
              <tr><td><strong>history</strong></td><td>Show recent command history</td></tr>
              <tr><td><strong>sudo</strong></td><td>Execute as root superuser</td></tr>
              <tr><td><strong>exit</strong></td><td>Close terminal window</td></tr>
            </tbody>
          </table>
        `);
        break;

      case 'about':
      case 'bio':
        this.printOutput(`
          <div style="line-height: 1.6; color: #e2e8f0;">
            <p><strong style="color: var(--accent-color);">Hannan</strong> — Full Stack Engineer & Creative Web Developer</p>
            <p>Specializing in modern web applications, performant architecture, high-fidelity UI systems, and interactive tools.</p>
            <p style="margin-top: 6px; color: #94a3b8;">📍 Remote / Available Worldwide &nbsp;|&nbsp; 🟢 Status: Open for opportunities</p>
            <p style="margin-top: 6px;">Type <span class="cmd" style="color: #facc15;">open about</span> to view the full interactive profile with experience timeline.</p>
          </div>
        `);
        break;

      case 'projects':
        this.printOutput(`
          <div style="line-height: 1.6;">
            <p style="color: #38bdf8; font-weight: bold; margin-bottom: 6px;">Featured Projects Shipped:</p>
            <div style="margin-bottom: 6px;">
              <strong>1. Nexus AI</strong> — Autonomous Agentic Workflow Platform<br/>
              <span style="color: #94a3b8;">Stack: Next.js, Python FastAPI, WebSockets, Tailwind</span>
            </div>
            <div style="margin-bottom: 6px;">
              <strong>2. OmniFlow</strong> — Real-time Collaborative Infinite Canvas<br/>
              <span style="color: #94a3b8;">Stack: TypeScript, WebGL/Canvas, CRDTs, Redis</span>
            </div>
            <div style="margin-bottom: 6px;">
              <strong>3. Krypton Analytics</strong> — Web3 Portfolio & Asset Intelligence Engine<br/>
              <span style="color: #94a3b8;">Stack: React, Ethers.js, Chart.js, Tailwind CSS</span>
            </div>
            <div style="margin-bottom: 6px;">
              <strong>4. Veloce E-Commerce</strong> — High-Performance Headless Storefront<br/>
              <span style="color: #94a3b8;">Stack: Next.js 14, Stripe API, PostgreSQL, Prisma</span>
            </div>
            <p style="color: #facc15; margin-top: 8px;">Run <span class="cmd">open projects</span> to launch the interactive gallery with live demos.</p>
          </div>
        `);
        break;

      case 'skills':
        this.printOutput(`
          <div style="line-height: 1.6;">
            <p><strong style="color: #60a5fa;">Frontend:</strong> React, Next.js, TypeScript, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, Canvas API</p>
            <p><strong style="color: #34d399;">Backend:</strong> Node.js, Express, Python, FastAPI, RESTful APIs, WebSockets, GraphQL</p>
            <p><strong style="color: #f59e0b;">Databases:</strong> PostgreSQL, MongoDB, Redis, Supabase, Prisma ORM</p>
            <p><strong style="color: #c084fc;">DevOps & Tools:</strong> Docker, Git, Linux / Bash, AWS, Vercel, CI/CD, Vite</p>
            <p style="color: #facc15; margin-top: 8px;">Run <span class="cmd">open skills</span> for animated visual proficiency metrics.</p>
          </div>
        `);
        break;

      case 'resume':
      case 'cv':
        this.printOutput(`
          <div style="line-height: 1.6;">
            <p><strong style="color: var(--accent-color);">Hannan | Senior Full Stack Developer</strong></p>
            <p>5+ years engineering scalable applications, modern responsive interfaces, and robust backend microservices.</p>
            <p style="margin-top: 4px;">Education: B.S. in Computer Science &bull; Certifications: AWS Certified Developer</p>
            <p style="color: #facc15; margin-top: 8px;">Run <span class="cmd">open resume</span> to view and download the formatted resume.</p>
          </div>
        `);
        break;

      case 'contact':
        this.printOutput(`
          <div style="line-height: 1.6;">
            <p>📬 <strong>Email:</strong> <a href="mailto:hannan.developer@example.com" style="color: #38bdf8; text-decoration: underline;">hannan.developer@example.com</a></p>
            <p>🐙 <strong>GitHub:</strong> <a href="https://github.com" target="_blank" style="color: #38bdf8; text-decoration: underline;">github.com/hannan</a></p>
            <p>💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com" target="_blank" style="color: #38bdf8; text-decoration: underline;">linkedin.com/in/hannan</a></p>
            <p>🐦 <strong>Twitter / X:</strong> <a href="https://twitter.com" target="_blank" style="color: #38bdf8; text-decoration: underline;">@hannan_dev</a></p>
            <p style="color: #facc15; margin-top: 8px;">Run <span class="cmd">open contact</span> to send a message via the OS Mail app.</p>
          </div>
        `);
        break;

      case 'open':
        if (!args[0]) {
          this.printOutput(`<div class="terminal-output error">Usage: open &lt;app&gt; (e.g. open about, open projects, open skills, open resume, open settings, open contact)</div>`);
        } else {
          const appName = args[0].toLowerCase();
          if (window.osWindowManager) {
            const success = window.osWindowManager.openApp(appName);
            if (success) {
              this.printOutput(`<div class="terminal-output success">Launched ${appName}.app successfully.</div>`);
            } else {
              this.printOutput(`<div class="terminal-output error">Unknown application: "${appName}". Available apps: about, projects, skills, resume, settings, contact, notes, music.</div>`);
            }
          }
        }
        break;

      case 'theme':
        if (!args[0] || !['dark', 'light', 'cyber'].includes(args[0].toLowerCase())) {
          this.printOutput(`<div class="terminal-output warn">Usage: theme &lt;dark | light | cyber&gt;</div>`);
        } else {
          const theme = args[0].toLowerCase();
          if (window.osSettings) {
            window.osSettings.setTheme(theme);
            this.printOutput(`<div class="terminal-output success">Theme switched to: <strong>${theme}</strong></div>`);
          }
        }
        break;

      case 'wallpaper':
        if (!args[0]) {
          this.printOutput(`<div class="terminal-output warn">Usage: wallpaper &lt;1-6 | next&gt;</div>`);
        } else {
          if (window.osSettings) {
            window.osSettings.switchWallpaper(args[0]);
            this.printOutput(`<div class="terminal-output success">Wallpaper changed!</div>`);
          }
        }
        break;

      case 'matrix':
        if (window.toggleMatrixWallpaper) {
          const active = window.toggleMatrixWallpaper();
          this.printOutput(`<div class="terminal-output success">Matrix rain effect ${active ? 'ENABLED 🟢' : 'DISABLED 🔴'}.</div>`);
        }
        break;

      case 'ls':
      case 'dir':
        const fileNames = Object.keys(this.virtualFiles).map(f => {
          if (f.endsWith('.md')) return `<span style="color: #38bdf8;">${f}</span>`;
          if (f.endsWith('.yaml') || f.endsWith('.json')) return `<span style="color: #facc15;">${f}</span>`;
          return `<span style="color: #4ade80;">${f}</span>`;
        }).join('    ');
        this.printOutput(`<div>${fileNames}</div>`);
        break;

      case 'cat':
        if (!args[0]) {
          this.printOutput(`<div class="terminal-output error">Usage: cat &lt;filename&gt; (e.g. cat about.md, cat skills.yaml, cat contact.json, cat secrets.txt)</div>`);
        } else {
          const fname = args[0];
          if (this.virtualFiles[fname]) {
            this.printOutput(`<pre style="color: #cbd5e1; white-space: pre-wrap; font-family: var(--font-mono);">${this.escapeHTML(this.virtualFiles[fname])}</pre>`);
          } else {
            this.printOutput(`<div class="terminal-output error">cat: ${this.escapeHTML(fname)}: No such file or directory</div>`);
          }
        }
        break;

      case 'clear':
      case 'cls':
        this.historyContainer.innerHTML = '';
        break;

      case 'whoami':
        this.printOutput(`<div>guest@hannan-portfolio (Visitor exploring HannanOS)</div>`);
        break;

      case 'date':
        this.printOutput(`<div>${new Date().toString()}</div>`);
        break;

      case 'echo':
        this.printOutput(`<div>${this.escapeHTML(args.join(' '))}</div>`);
        break;

      case 'history':
        const histList = this.history.map((h, i) => `${i + 1}  ${this.escapeHTML(h)}`).join('<br/>');
        this.printOutput(`<div>${histList}</div>`);
        break;

      case 'sudo':
        this.printOutput(`<div class="terminal-output error">🔒 Permission denied: Guest user cannot sudo. Hannan is the only administrator of this system.</div>`);
        break;

      case 'exit':
        if (window.osWindowManager) {
          window.osWindowManager.closeApp('terminal');
        }
        break;

      default:
        this.printOutput(`<div class="terminal-output error">command not found: ${this.escapeHTML(cmd)}. Type <span class="cmd" style="color:#facc15">help</span> to see available commands.</div>`);
        break;
    }
  }
}

window.TerminalApp = TerminalApp;
