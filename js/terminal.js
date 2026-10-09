/**
 * AmeOS 16 - Interactive Cyberpunk Terminal Application
 * Features command history, autocomplete, structured HTML tables,
 * system command integrations, and cyberpunk AmeOS shell aesthetics.
 */

class TerminalApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.history = [];
    this.historyIndex = -1;
    this.commandList = [
      'help', 'about', 'projects', 'skills', 'resume', 
      'contact', 'sysinfo', 'neofetch', 'open', 'theme', 
      'wallpaper', 'matrix', 'ls', 'cat', 'clear', 
      'whoami', 'date', 'echo', 'history', 'sudo', 'exit'
    ];
    this.virtualFiles = {
      'about.md': `# Hannan — Senior Full Stack Engineer & Creative Developer\nArchitecture: AmeOS 16 Liquid-Glass Cyber Kernel\nFocus: Distributed backend APIs, high-performance UI systems, AI workflows\nLocation: Remote / Available Globally\nStatus: 🟢 Online // Open to High-Impact Opportunities`,
      'skills.yaml': `frontend:\n  - React / Next.js 14\n  - TypeScript & Modern JavaScript\n  - CSS3 Liquid Glassmorphism & Tailwind\n  - HTML5 Canvas & WebGL\nbackend:\n  - Node.js & Express\n  - Python & FastAPI\n  - PostgreSQL & Supabase\n  - Redis & Docker Containers\n  - AWS Cloud Architecture`,
      'contact.json': `{\n  "email": "hannan.developer@example.com",\n  "github": "https://github.com",\n  "linkedin": "https://linkedin.com",\n  "twitter": "https://twitter.com"\n}`,
      'secrets.txt': `✨ AmeOS 16 Easter Egg Unlocked!\n"Simplicity is the soul of efficiency." — Austin Freeman\nTry running 'sysinfo', 'matrix', or 'theme cyber' in this terminal!`
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
 █████╗ ███╗   ███╗███████╗ ██████╗ ███████╗    ██╗ ██████╗ 
██╔══██╗████╗ ████║██╔════╝██╔═══██╗██╔════╝   ███║██╔════╝ 
███████║██╔████╔██║█████╗  ██║   ██║███████╗   ╚██║███████╗ 
██╔══██║██║╚██╔╝██║██╔══╝  ██║   ██║╚════██║    ██║██╔═══██╗
██║  ██║██║ ╚═╝ ██║███████╗╚██████╔╝███████║    ██║╚██████╔╝
╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚══════╝    ╚═╝ ╚═════╝ 
      </div>
      <div class="terminal-welcome">
        Welcome to <strong>AmeOS 16 Liquid Cyber Shell v16.4</strong>. Type <span class="cmd">help</span> for commands, <span class="cmd">sysinfo</span> for system specs, or <span class="cmd">projects</span> to inspect shipped apps.
      </div>
      <div class="terminal-history" id="term-history"></div>
      <div class="terminal-input-row">
        <span class="terminal-prompt">
          <span class="terminal-prompt-user">hannan</span>@<span class="terminal-prompt-host">ameos16</span>:<span class="terminal-prompt-path">~</span><span class="terminal-prompt-symbol">❯</span>
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
        <span class="terminal-prompt-user">hannan</span>@<span class="terminal-prompt-host">ameos16</span>:<span class="terminal-prompt-path">~</span><span class="terminal-prompt-symbol">❯</span>
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
                <th style="width: 150px;">Command</th>
                <th>AmeOS 16 Functionality</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong style="color:#00f0ff;">about</strong></td><td>View Hannan's engineering bio and background</td></tr>
              <tr><td><strong style="color:#00f0ff;">projects</strong></td><td>List featured full stack applications & live demos</td></tr>
              <tr><td><strong style="color:#00f0ff;">skills</strong></td><td>Inspect engineering domains & tech proficiencies</td></tr>
              <tr><td><strong style="color:#00f0ff;">resume</strong></td><td>Print or review official curriculum vitae</td></tr>
              <tr><td><strong style="color:#00f0ff;">sysinfo</strong></td><td>Display AmeOS 16 kernel specs & architecture</td></tr>
              <tr><td><strong style="color:#00f0ff;">contact</strong></td><td>Get verified email, socials & dispatch form</td></tr>
              <tr><td><strong style="color:#00f0ff;">open &lt;app&gt;</strong></td><td>Launch AmeOS window (about, projects, skills, resume, settings, etc.)</td></tr>
              <tr><td><strong style="color:#00f0ff;">theme &lt;name&gt;</strong></td><td>Switch theme aesthetic (dark, cyber, light)</td></tr>
              <tr><td><strong style="color:#00f0ff;">wallpaper &lt;1-6&gt;</strong></td><td>Change AmeOS 16 desktop background</td></tr>
              <tr><td><strong style="color:#00f0ff;">matrix</strong></td><td>Toggle cyber dynamic code rain visualizer</td></tr>
              <tr><td><strong style="color:#00f0ff;">ls</strong></td><td>List virtual files in home directory</td></tr>
              <tr><td><strong style="color:#00f0ff;">cat &lt;file&gt;</strong></td><td>Print virtual file contents</td></tr>
              <tr><td><strong style="color:#00f0ff;">clear / cls</strong></td><td>Purge terminal screen history</td></tr>
              <tr><td><strong style="color:#00f0ff;">whoami</strong></td><td>Display active user credentials</td></tr>
              <tr><td><strong style="color:#00f0ff;">date</strong></td><td>Print AmeOS real-time timestamp</td></tr>
              <tr><td><strong style="color:#00f0ff;">echo &lt;text&gt;</strong></td><td>Print text to console</td></tr>
              <tr><td><strong style="color:#00f0ff;">history</strong></td><td>Show recent command stack</td></tr>
              <tr><td><strong style="color:#00f0ff;">sudo</strong></td><td>Execute privileged root instruction</td></tr>
              <tr><td><strong style="color:#00f0ff;">exit</strong></td><td>Terminate and close terminal window</td></tr>
            </tbody>
          </table>
        `);
        break;

      case 'sysinfo':
      case 'neofetch':
        this.printOutput(`
          <div style="display: flex; gap: 24px; align-items: center; margin: 10px 0; background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 12px; padding: 14px 18px;">
            <div style="color: #00f0ff; font-weight: bold; line-height: 1.25; flex-shrink: 0;">
              <pre style="margin: 0; font-size: 11px;">
       /\_/\  
      ( o.o ) 
       > ^ <  
      AME-OS
        16
              </pre>
            </div>
            <div style="line-height: 1.65; font-size: 13px;">
              <div><strong style="color: #00f0ff;">OS:</strong> AmeOS 16 (Obsidian Liquid-Glass Kernel v16.4)</div>
              <div><strong style="color: #00f0ff;">Host:</strong> Quantum Obsidian 64-bit Architecture</div>
              <div><strong style="color: #00f0ff;">Window Manager:</strong> AmeOS GlassWM (Spring Physics Enabled)</div>
              <div><strong style="color: #00f0ff;">Shell:</strong> zsh 5.9 (x86_64-ameos)</div>
              <div><strong style="color: #00f0ff;">Terminal:</strong> AmeTerm Liquid Edition</div>
              <div><strong style="color: #00f0ff;">Theme:</strong> Obsidian Liquid Cyan (#00f0ff) & Neon Violet (#b026ff)</div>
              <div><strong style="color: #00f0ff;">CPU:</strong> Neural Core i9 (16 Cores @ 5.4GHz)</div>
              <div><strong style="color: #00f0ff;">Memory:</strong> 64 GB Liquid RAM (14.2 GB Allocated)</div>
              <div><strong style="color: #00f0ff;">Uptime:</strong> 99.98% High Availability</div>
            </div>
          </div>
        `);
        break;

      case 'about':
      case 'bio':
        this.printOutput(`
          <div style="line-height: 1.65; color: #e2e8f0; background: rgba(0, 240, 255, 0.04); border-left: 3px solid #00f0ff; padding: 12px 16px; border-radius: 0 10px 10px 0;">
            <p><strong style="color: #00f0ff; font-size: 14px;">Hannan</strong> — Senior Full Stack Engineer & Creative Developer</p>
            <p style="margin-top: 4px; color: #cbd5e1;">Bridging the boundary between robust distributed backend architectures and delightful, high-fidelity liquid interfaces on AmeOS 16.</p>
            <p style="margin-top: 8px; color: #94a3b8; font-size: 12px;">📍 Remote / Available Worldwide &nbsp;|&nbsp; 🟢 Status: Available for High-Impact Roles</p>
            <p style="margin-top: 8px;">Run <span class="cmd" style="color: #00f0ff;">open about</span> to launch the interactive experience matrix.</p>
          </div>
        `);
        break;

      case 'projects':
        this.printOutput(`
          <div style="line-height: 1.65;">
            <p style="color: #00f0ff; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Shipped High-Impact Systems:</p>
            <div style="margin-bottom: 8px; padding-left: 10px; border-left: 2px solid rgba(0, 240, 255, 0.3);">
              <strong style="color: #ffffff;">1. Nexus AI</strong> — Autonomous Agentic Workflow Platform<br/>
              <span style="color: #94a3b8; font-size: 12px;">Stack: Next.js, Python FastAPI, WebSockets, Docker, Tailwind</span>
            </div>
            <div style="margin-bottom: 8px; padding-left: 10px; border-left: 2px solid rgba(0, 255, 157, 0.3);">
              <strong style="color: #ffffff;">2. OmniFlow</strong> — Real-time Collaborative Infinite Canvas<br/>
              <span style="color: #94a3b8; font-size: 12px;">Stack: TypeScript, WebGL/Canvas, CRDTs, Redis, Node.js</span>
            </div>
            <div style="margin-bottom: 8px; padding-left: 10px; border-left: 2px solid rgba(176, 38, 255, 0.3);">
              <strong style="color: #ffffff;">3. Krypton Analytics</strong> — Web3 Portfolio & Asset Intelligence Engine<br/>
              <span style="color: #94a3b8; font-size: 12px;">Stack: React, Ethers.js, Chart.js, Tailwind, PostgreSQL</span>
            </div>
            <div style="margin-bottom: 8px; padding-left: 10px; border-left: 2px solid rgba(255, 0, 127, 0.3);">
              <strong style="color: #ffffff;">4. Veloce E-Commerce</strong> — High-Performance Headless Storefront<br/>
              <span style="color: #94a3b8; font-size: 12px;">Stack: Next.js 14, Stripe API, PostgreSQL, Prisma, Vercel Edge</span>
            </div>
            <p style="color: #00f0ff; margin-top: 10px;">Run <span class="cmd">open projects</span> to launch the interactive gallery with live details.</p>
          </div>
        `);
        break;

      case 'skills':
        this.printOutput(`
          <div style="line-height: 1.65;">
            <p><strong style="color: #00f0ff;">Frontend Architecture:</strong> React, Next.js, TypeScript, JavaScript (ES6+), HTML5/CSS3 Liquid Glass, Tailwind, WebGL</p>
            <p><strong style="color: #00ff9d;">Backend & APIs:</strong> Node.js, Express, Python, FastAPI, WebSockets, RESTful & GraphQL, Microservices</p>
            <p><strong style="color: #ffb703;">Databases & Storage:</strong> PostgreSQL, MongoDB, Redis, Supabase, Prisma ORM</p>
            <p><strong style="color: #b026ff;">Cloud & DevOps:</strong> Docker, Git / GitHub Actions CI/CD, AWS (S3, Lambda, EC2), Linux / Bash</p>
            <p style="color: #00f0ff; margin-top: 10px;">Run <span class="cmd">open skills</span> for animated liquid neon proficiency metrics.</p>
          </div>
        `);
        break;

      case 'resume':
      case 'cv':
        this.printOutput(`
          <div style="line-height: 1.65;">
            <p><strong style="color: #00f0ff;">Hannan | Senior Full Stack Developer & Technical Architect</strong></p>
            <p>5+ years demonstrable expertise engineering scalable cloud systems, responsive reactive apps, and modern developer tooling.</p>
            <p style="margin-top: 4px; color: #94a3b8;">Credentials: B.S. in Computer Science (Honors) &bull; AWS Certified Solutions Architect</p>
            <p style="color: #00f0ff; margin-top: 8px;">Run <span class="cmd">open resume</span> to view, print, or copy the formatted CV.</p>
          </div>
        `);
        break;

      case 'contact':
        this.printOutput(`
          <div style="line-height: 1.65;">
            <p>📬 <strong>Email:</strong> <a href="mailto:hannan.developer@example.com" style="color: #00f0ff; text-decoration: underline;">hannan.developer@example.com</a></p>
            <p>🐙 <strong>GitHub:</strong> <a href="https://github.com" target="_blank" style="color: #00f0ff; text-decoration: underline;">github.com/hannan</a></p>
            <p>💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com" target="_blank" style="color: #00f0ff; text-decoration: underline;">linkedin.com/in/hannan</a></p>
            <p>🐦 <strong>Twitter / X:</strong> <a href="https://twitter.com" target="_blank" style="color: #00f0ff; text-decoration: underline;">@hannan_dev</a></p>
            <p style="color: #00f0ff; margin-top: 8px;">Run <span class="cmd">open contact</span> to dispatch a message via AmeOS Mail.</p>
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
              this.printOutput(`<div class="terminal-output success">Launched ${appName}.app in AmeOS 16.</div>`);
            } else {
              this.printOutput(`<div class="terminal-output error">Unknown application: "${appName}". Available apps: about, projects, skills, resume, settings, contact, notes, music.</div>`);
            }
          }
        }
        break;

      case 'theme':
        if (!args[0] || !['dark', 'light', 'cyber'].includes(args[0].toLowerCase())) {
          this.printOutput(`<div class="terminal-output warn">Usage: theme &lt;dark | cyber | light&gt;</div>`);
        } else {
          const theme = args[0].toLowerCase();
          if (window.osSettings) {
            window.osSettings.setTheme(theme);
            this.printOutput(`<div class="terminal-output success">AmeOS 16 theme switched to: <strong>${theme}</strong></div>`);
          }
        }
        break;

      case 'wallpaper':
        if (!args[0]) {
          this.printOutput(`<div class="terminal-output warn">Usage: wallpaper &lt;1-6 | ameos-liquid | next&gt;</div>`);
        } else {
          if (window.osSettings) {
            window.osSettings.switchWallpaper(args[0]);
            this.printOutput(`<div class="terminal-output success">AmeOS 16 wallpaper updated!</div>`);
          }
        }
        break;

      case 'matrix':
        if (window.toggleMatrixWallpaper) {
          const active = window.toggleMatrixWallpaper();
          this.printOutput(`<div class="terminal-output success">AmeOS 16 Matrix code visualizer ${active ? 'ACTIVATED 🟢' : 'DEACTIVATED 🔴'}.</div>`);
        }
        break;

      case 'ls':
      case 'dir':
        const fileNames = Object.keys(this.virtualFiles).map(f => {
          if (f.endsWith('.md')) return `<span style="color: #00f0ff;">${f}</span>`;
          if (f.endsWith('.yaml') || f.endsWith('.json')) return `<span style="color: #ffb703;">${f}</span>`;
          return `<span style="color: #00ff9d;">${f}</span>`;
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
        this.printOutput(`<div>guest@ameos16 (Visitor session inspecting Hannan's portfolio)</div>`);
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
        this.printOutput(`<div class="terminal-output error">🔒 Permission denied: Guest user cannot sudo. Hannan is the verified administrator of AmeOS 16.</div>`);
        break;

      case 'exit':
        if (window.osWindowManager) {
          window.osWindowManager.closeApp('terminal');
        }
        break;

      default:
        this.printOutput(`<div class="terminal-output error">command not found: ${this.escapeHTML(cmd)}. Type <span class="cmd" style="color:#00f0ff">help</span> to view available commands.</div>`);
        break;
    }
  }
}

window.TerminalApp = TerminalApp;
