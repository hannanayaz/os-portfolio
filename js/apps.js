/**
 * AmeOS 16 - Applications Logic & Portfolio Content
 * Detailed projects, interactive liquid neon skill bars, resume, settings, and contact handler.
 */

// Portfolio Data
const portfolioData = {
  profile: {
    name: "Hannan",
    title: "Senior Full Stack Engineer & Technical Architect",
    location: "Global / Remote",
    status: "AmeOS 16 Core // Open to High-Impact Roles",
    yearsExp: "5+",
    projectsCount: "35+",
    coffeeCount: "1,200+",
    bio: "I craft elegant, robust, and accessible digital products that bridge the gap between high-level architectural engineering and delightful user interactions. With deep experience across modern TypeScript frameworks, distributed backend APIs, and real-time systems, I build software that scales effortlessly."
  },

  projects: [
    {
      id: "nexus-ai",
      title: "Nexus AI — Agentic Workflow Engine",
      category: "ai",
      categoryLabel: "AI & Full Stack",
      desc: "An intelligent autonomous workflow orchestration engine allowing users to build, chain, and debug multi-agent AI systems with live stream reasoning and tool calling.",
      image: "linear-gradient(135deg, rgba(0, 240, 255, 0.4) 0%, rgba(176, 38, 255, 0.4) 60%, rgba(255, 0, 127, 0.4) 100%)",
      tags: ["Next.js", "FastAPI", "Python", "WebSockets", "Docker", "Tailwind"],
      demoUrl: "https://example.com/nexus-ai",
      repoUrl: "https://github.com/hannan/nexus-ai",
      featured: true
    },
    {
      id: "omniflow",
      title: "OmniFlow — Collaborative Canvas",
      category: "frontend",
      categoryLabel: "Real-time & WebGL",
      desc: "An ultra-fast infinite canvas for remote teams featuring zero-latency multiplayer editing, CRDT synchronization, and custom shape physics.",
      image: "linear-gradient(135deg, rgba(0, 255, 157, 0.4) 0%, rgba(0, 240, 255, 0.4) 60%, rgba(16, 185, 129, 0.4) 100%)",
      tags: ["TypeScript", "Canvas API", "WebGL", "Redis", "Node.js", "WebRTC"],
      demoUrl: "https://example.com/omniflow",
      repoUrl: "https://github.com/hannan/omniflow",
      featured: true
    },
    {
      id: "krypton",
      title: "Krypton — Web3 Portfolio Radar",
      category: "fullstack",
      categoryLabel: "Web3 & Analytics",
      desc: "Decentralized wealth tracker with multi-chain transaction indexing, real-time gas optimization alerts, and interactive profit/loss visualizations.",
      image: "linear-gradient(135deg, rgba(176, 38, 255, 0.4) 0%, rgba(255, 0, 127, 0.4) 60%, rgba(0, 240, 255, 0.4) 100%)",
      tags: ["React", "Ethers.js", "Chart.js", "Tailwind", "PostgreSQL"],
      demoUrl: "https://example.com/krypton",
      repoUrl: "https://github.com/hannan/krypton",
      featured: true
    },
    {
      id: "veloce",
      title: "Veloce — Headless E-Commerce",
      category: "fullstack",
      categoryLabel: "Full Stack & E-Com",
      desc: "Blazing fast headless e-commerce platform boasting 99+ Lighthouse performance scores, edge-rendered product catalogs, and Stripe micro-checkouts.",
      image: "linear-gradient(135deg, rgba(255, 0, 127, 0.4) 0%, rgba(255, 183, 3, 0.4) 60%, rgba(176, 38, 255, 0.4) 100%)",
      tags: ["Next.js 14", "Stripe API", "Prisma", "PostgreSQL", "Vercel Edge"],
      demoUrl: "https://example.com/veloce",
      repoUrl: "https://github.com/hannan/veloce",
      featured: false
    },
    {
      id: "terminalcraft",
      title: "CloudShell — In-Browser IDE & CLI",
      category: "tools",
      categoryLabel: "Developer Tools",
      desc: "A browser-based containerized terminal environment with instant compilation, custom syntax highlighting, and live sharing capabilities.",
      image: "linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(30, 41, 59, 0.8) 60%, rgba(15, 23, 42, 0.9) 100%)",
      tags: ["WebAssembly", "TypeScript", "Docker API", "Xterm.js", "Go"],
      demoUrl: "https://example.com/cloudshell",
      repoUrl: "https://github.com/hannan/cloudshell",
      featured: false
    },
    {
      id: "synthetix",
      title: "Synthetix — Audio Waveform Lab",
      category: "frontend",
      categoryLabel: "Creative Audio UI",
      desc: "Interactive modular synthesizer and visual soundscape explorer running entirely in client-side Web Audio API with MIDI keyboard controller support.",
      image: "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.4) 60%, rgba(0, 240, 255, 0.4) 100%)",
      tags: ["Web Audio API", "Three.js", "CSS Grid", "DSP"],
      demoUrl: "https://example.com/synthetix",
      repoUrl: "https://github.com/hannan/synthetix",
      featured: false
    }
  ],

  skills: {
    frontend: [
      { name: "React & Next.js 14", level: 96 },
      { name: "TypeScript & Modern JavaScript", level: 94 },
      { name: "CSS3 Liquid Glass & Tailwind", level: 95 },
      { name: "HTML5 Canvas, WebGL & Shaders", level: 85 },
      { name: "State Architecture (Zustand/Redux)", level: 92 }
    ],
    backend: [
      { name: "Node.js & Express / NestJS", level: 92 },
      { name: "Python & FastAPI Microservices", level: 89 },
      { name: "RESTful & GraphQL Architectures", level: 94 },
      { name: "WebSockets & Real-time Streams", level: 88 },
      { name: "Distributed System Design", level: 86 }
    ],
    database: [
      { name: "PostgreSQL & Query Optimization", level: 91 },
      { name: "Redis In-Memory Caching", level: 87 },
      { name: "MongoDB & Document Stores", level: 83 },
      { name: "Prisma ORM & Supabase", level: 93 }
    ],
    devops: [
      { name: "Docker & Containerization", level: 89 },
      { name: "Git & GitHub Actions CI/CD", level: 95 },
      { name: "AWS Cloud (S3, Lambda, EC2)", level: 84 },
      { name: "Linux / Bash Shell Scripting", level: 88 }
    ]
  },

  wallpapers: [
    {
      id: "ameos-liquid",
      name: "AmeOS Obsidian Liquid",
      type: "gradient",
      src: "radial-gradient(circle at 20% 25%, rgba(0, 240, 255, 0.22) 0%, transparent 45%), radial-gradient(circle at 80% 75%, rgba(176, 38, 255, 0.2) 0%, transparent 45%), #03050a"
    },
    {
      id: "sonoma",
      name: "Sonoma Dark Waves",
      type: "image",
      src: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat"
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk Horizon",
      type: "image",
      src: "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat"
    },
    {
      id: "nebula",
      name: "Deep Space Nebula",
      type: "image",
      src: "url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat"
    },
    {
      id: "aurora",
      name: "Emerald Aurora",
      type: "image",
      src: "url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat"
    },
    {
      id: "dunes",
      name: "Dark Minimalist Dunes",
      type: "image",
      src: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat"
    }
  ]
};

// App Initialization Functions
function initAboutApp() {
  const container = document.getElementById('about-content');
  if (!container) return;

  const p = portfolioData.profile;
  container.innerHTML = `
    <div class="about-app">
      <div class="about-header-card">
        <div class="about-avatar-wrap">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Hannan Avatar" class="about-avatar" />
          <div class="about-status-dot" title="AmeOS 16 Kernel Online"></div>
        </div>
        <div class="about-header-info">
          <h2>${p.name} <span class="about-badge">AME-OS 16 // ACTIVE</span></h2>
          <div class="about-title-tag">${p.title}</div>
          <div class="about-location">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${p.location} &bull; Open for Opportunities
          </div>
        </div>
      </div>

      <div class="about-stats">
        <div class="stat-card">
          <div class="stat-number">${p.yearsExp}</div>
          <div class="stat-label">Years Experience</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${p.projectsCount}</div>
          <div class="stat-label">Projects Shipped</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">99.9%</div>
          <div class="stat-label">System Uptime</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${p.coffeeCount}</div>
          <div class="stat-label">Git Commits</div>
        </div>
      </div>

      <div class="about-nav-tabs">
        <button class="about-tab-btn active" data-tab="bio">System Bio</button>
        <button class="about-tab-btn" data-tab="experience">Experience</button>
        <button class="about-tab-btn" data-tab="philosophy">Philosophy</button>
        <button class="about-tab-btn" data-tab="education">Education</button>
      </div>

      <div class="about-tab-content" id="about-tab-body">
        <p>${p.bio}</p>
        <p>I thrive on turning complex problems into elegant, maintainable code. Whether building reactive interfaces, orchestrating microservices, or implementing responsive designs, I ensure performance and aesthetic elegance are top priorities.</p>
        <div style="margin-top: 16px;">
          <button class="project-btn primary" id="about-contact-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Dispatch Transmission
          </button>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  const tabBtns = container.querySelectorAll('.about-tab-btn');
  const tabBody = container.querySelector('#about-tab-body');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');

      if (tab === 'bio') {
        tabBody.innerHTML = `
          <p>${p.bio}</p>
          <p>I thrive on turning complex problems into elegant, maintainable code. Whether building reactive interfaces, orchestrating microservices, or implementing responsive designs, I ensure performance and aesthetic elegance are top priorities.</p>
          <div style="margin-top: 16px;">
            <button class="project-btn primary" id="about-contact-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Dispatch Transmission
            </button>
          </div>
        `;
        setupContactTrigger();
      } else if (tab === 'experience') {
        tabBody.innerHTML = `
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-role">Lead Full Stack Engineer</div>
              <div class="timeline-company">Aether Labs &bull; Remote</div>
              <div class="timeline-date">2022 — Present</div>
              <p>Architected multi-tenant cloud platforms, built real-time WebSocket pipelines, and mentored a team of 8 engineers.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-role">Senior Frontend Engineer</div>
              <div class="timeline-company">HyperScale Tech</div>
              <div class="timeline-date">2020 — 2022</div>
              <p>Created enterprise design systems in React and TypeScript, boosting core web vitals by 45% and reducing build times.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-role">Full Stack Developer</div>
              <div class="timeline-company">CodeVelocity Studio</div>
              <div class="timeline-date">2018 — 2020</div>
              <p>Delivered custom web applications, REST APIs in Node.js/PostgreSQL, and responsive client portals.</p>
            </div>
          </div>
        `;
      } else if (tab === 'philosophy') {
        tabBody.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div class="timeline-item" style="margin: 0;">
              <strong style="color: var(--accent-cyan);">1. Liquid Aesthetic Excellence</strong>
              <p style="margin-top: 4px;">Software should not merely function; it should invoke delight. AmeOS 16 represents the union of high aesthetic polish, frosted glass refraction, and tactile kinetic feedback.</p>
            </div>
            <div class="timeline-item" style="margin: 0;">
              <strong style="color: var(--accent-cyan);">2. Architectural Resilience</strong>
              <p style="margin-top: 4px;">Robust type safety, strict separation of concerns, and resilient error recovery patterns guarantee that applications withstand real-world production stress.</p>
            </div>
            <div class="timeline-item" style="margin: 0;">
              <strong style="color: var(--accent-cyan);">3. Performance as a Core Feature</strong>
              <p style="margin-top: 4px;">Sub-millisecond interaction responses, optimized render cycles, and efficient in-memory caching turn good products into legendary experiences.</p>
            </div>
          </div>
        `;
      } else if (tab === 'education') {
        tabBody.innerHTML = `
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-role">B.S. in Computer Science & Software Engineering</div>
              <div class="timeline-company">University of Engineering & Technology</div>
              <div class="timeline-date">Graduated with High Honors</div>
              <p>Core curriculum in Distributed Systems, Algorithms & Data Structures, and Human-Computer Interaction.</p>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-role">AWS Certified Solutions Architect & Developer</div>
              <div class="timeline-company">Amazon Web Services</div>
              <div class="timeline-date">Credential ID: AWS-849204</div>
            </div>
          </div>
        `;
      }
    });
  });

  function setupContactTrigger() {
    const contactBtn = container.querySelector('#about-contact-btn');
    if (contactBtn) {
      contactBtn.addEventListener('click', () => {
        if (window.osWindowManager) {
          window.osWindowManager.openApp('contact');
        }
      });
    }
  }
  setupContactTrigger();
}

function initProjectsApp() {
  const container = document.getElementById('projects-content');
  if (!container) return;

  container.innerHTML = `
    <div class="projects-app">
      <div class="projects-toolbar">
        <div class="projects-search-wrap">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" id="projects-search-input" class="projects-search-input" placeholder="Search AmeOS projects, stacks, tags..." />
        </div>
        <div class="projects-filters">
          <button class="filter-chip active" data-filter="all">All</button>
          <button class="filter-chip" data-filter="ai">AI / ML</button>
          <button class="filter-chip" data-filter="frontend">Frontend</button>
          <button class="filter-chip" data-filter="fullstack">Full Stack</button>
          <button class="filter-chip" data-filter="tools">Dev Tools</button>
        </div>
      </div>
      <div class="projects-grid" id="projects-grid-list"></div>
    </div>
  `;

  const gridList = container.querySelector('#projects-grid-list');
  const searchInput = container.querySelector('#projects-search-input');
  const filterChips = container.querySelectorAll('.filter-chip');

  let activeFilter = 'all';
  let searchQuery = '';

  function renderList() {
    const filtered = portfolioData.projects.filter(p => {
      const matchesFilter = (activeFilter === 'all') || (p.category === activeFilter);
      const matchesQuery = p.title.toLowerCase().includes(searchQuery) ||
                           p.desc.toLowerCase().includes(searchQuery) ||
                           p.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchesFilter && matchesQuery;
    });

    if (filtered.length === 0) {
      gridList.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p style="font-size: 16px; margin-bottom: 6px; color: #fff;">No projects found matching "${searchQuery}"</p>
          <p style="font-size: 13px;">Try searching for another keyword like React, AI, or WebGL.</p>
        </div>
      `;
      return;
    }

    gridList.innerHTML = filtered.map(p => `
      <div class="project-card">
        <div class="project-card-header" style="background: ${p.image};">
          <span class="project-card-badge">${p.categoryLabel}</span>
        </div>
        <div class="project-card-body">
          <div class="project-card-title">
            <span>${p.title.split('—')[0]}</span>
          </div>
          <p class="project-card-desc">${p.desc}</p>
          <div class="project-card-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-card-actions">
            <a href="${p.demoUrl}" target="_blank" class="project-btn primary" onclick="event.preventDefault(); showProjectModal('${p.id}');">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              Live Demo
            </a>
            <a href="${p.repoUrl}" target="_blank" class="project-btn secondary">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              Source
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');
      renderList();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderList();
  });

  renderList();
}

function showProjectModal(projectId) {
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) return;
  if (window.showToast) {
    window.showToast(project.title, "Opened project view in AmeOS 16 focus mode.");
  }
}

function initSkillsApp() {
  const container = document.getElementById('skills-content');
  if (!container) return;

  const s = portfolioData.skills;
  container.innerHTML = `
    <div class="skills-app">
      <div class="skills-category">
        <div class="skills-category-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Frontend Engineering & UI Systems
        </div>
        <div class="skills-grid">
          ${s.frontend.map(item => `
            <div class="skill-bar-card">
              <div class="skill-info">
                <span class="skill-name">${item.name}</span>
                <span class="skill-pct">${item.level}%</span>
              </div>
              <div class="skill-progress-track">
                <div class="skill-progress-fill" style="width: ${item.level}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="skills-category">
        <div class="skills-category-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>
          Backend & Distributed Architecture
        </div>
        <div class="skills-grid">
          ${s.backend.map(item => `
            <div class="skill-bar-card">
              <div class="skill-info">
                <span class="skill-name">${item.name}</span>
                <span class="skill-pct">${item.level}%</span>
              </div>
              <div class="skill-progress-track">
                <div class="skill-progress-fill" style="width: ${item.level}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="skills-category">
        <div class="skills-category-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7M4 7c0-2 1.5-3 3.5-3h9c2 0 3.5 1 3.5 3M4 7c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3"/></svg>
          Databases & In-Memory Storage
        </div>
        <div class="skills-grid">
          ${s.database.map(item => `
            <div class="skill-bar-card">
              <div class="skill-info">
                <span class="skill-name">${item.name}</span>
                <span class="skill-pct">${item.level}%</span>
              </div>
              <div class="skill-progress-track">
                <div class="skill-progress-fill" style="width: ${item.level}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="skills-category">
        <div class="skills-category-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
          Cloud, DevOps & Tooling
        </div>
        <div class="skills-grid">
          ${s.devops.map(item => `
            <div class="skill-bar-card">
              <div class="skill-info">
                <span class="skill-name">${item.name}</span>
                <span class="skill-pct">${item.level}%</span>
              </div>
              <div class="skill-progress-track">
                <div class="skill-progress-fill" style="width: ${item.level}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function initResumeApp() {
  const container = document.getElementById('resume-content');
  if (!container) return;

  container.innerHTML = `
    <div class="resume-app">
      <div class="resume-header">
        <div class="resume-title">
          <h1>Hannan</h1>
          <p>Senior Full Stack Engineer & Technical Architect</p>
        </div>
        <div class="resume-contact-info">
          <span>📧 hannan.developer@example.com</span>
          <span>📍 Remote / Global Availability</span>
          <span>🌐 github.com/hannan</span>
        </div>
      </div>

      <div class="resume-toolbar-actions">
        <button class="project-btn primary" id="resume-print-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
          Print Official CV
        </button>
        <button class="project-btn secondary" id="resume-copy-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
          Copy Contact
        </button>
      </div>

      <div>
        <div class="resume-section-title">Executive Summary</div>
        <p style="font-size: 13.5px; line-height: 1.7; color: var(--text-secondary);">
          Innovative Full Stack Engineer with 5+ years of demonstrable expertise in engineering scalable cloud platforms, responsive reactive web applications, and intuitive user experiences. Passionate about performant design systems, type safety, clean architecture, and modern developer tooling on AmeOS 16.
        </p>
      </div>

      <div>
        <div class="resume-section-title">Work Experience</div>
        
        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <span class="resume-item-role">Lead Full Stack Engineer</span> &bull; 
              <span class="resume-item-company">Aether Labs</span>
            </div>
            <span class="resume-item-date">2022 — Present</span>
          </div>
          <ul class="resume-item-desc">
            <li>Directed technical architecture for high-throughput AI agent coordination application used by 120,000+ monthly active users.</li>
            <li>Reduced API latencies by 42% through smart Redis caching layers, query optimizations, and database indexing.</li>
            <li>Engineered automated CI/CD deployment pipelines on AWS ECS/Fargate with zero downtime deployments.</li>
          </ul>
        </div>

        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <span class="resume-item-role">Senior Frontend Engineer</span> &bull; 
              <span class="resume-item-company">HyperScale Tech</span>
            </div>
            <span class="resume-item-date">2020 — 2022</span>
          </div>
          <ul class="resume-item-desc">
            <li>Spearheaded component library refactor into a typed Next.js design system, elevating accessibility score to WCAG AAA.</li>
            <li>Engineered WebGL and Canvas based analytics dashboards rendering 50,000+ data nodes with silky 60fps rendering.</li>
            <li>Collaborated closely with product designers, UX researchers, and backend teams across 4 time zones.</li>
          </ul>
        </div>

        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <span class="resume-item-role">Software Developer</span> &bull; 
              <span class="resume-item-company">CodeVelocity Studio</span>
            </div>
            <span class="resume-item-date">2018 — 2020</span>
          </div>
          <ul class="resume-item-desc">
            <li>Built full stack web applications utilizing Node.js, Express, React, and PostgreSQL for diverse global clients.</li>
            <li>Implemented third-party OAuth integrations, payment processing gateways, and automated end-to-end testing suites.</li>
          </ul>
        </div>
      </div>

      <div>
        <div class="resume-section-title">Education & Credentials</div>
        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <span class="resume-item-role">B.S. in Computer Science</span> &bull; 
              <span class="resume-item-company">University of Engineering & Technology</span>
            </div>
            <span class="resume-item-date">Graduated with High Honors</span>
          </div>
        </div>
        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <span class="resume-item-role">AWS Certified Solutions Architect</span> &bull; 
              <span class="resume-item-company">Amazon Web Services</span>
            </div>
            <span class="resume-item-date">Credential ID: AWS-849204</span>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#resume-print-btn').addEventListener('click', () => {
    window.print();
  });

  container.querySelector('#resume-copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText("hannan.developer@example.com");
    if (window.showToast) {
      window.showToast("Copied to Clipboard", "Email address copied successfully!");
    }
  });
}

function initSettingsApp() {
  const container = document.getElementById('settings-content');
  if (!container) return;

  const currentWall = localStorage.getItem('ameos_wallpaper') || 'ameos-liquid';
  const currentTheme = localStorage.getItem('ameos_theme') || 'dark';

  container.innerHTML = `
    <div class="settings-app">
      <div>
        <div class="settings-section-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          AmeOS 16 Desktop Wallpapers
        </div>
        <div class="wallpaper-grid" id="settings-wallpapers-grid">
          ${portfolioData.wallpapers.map(w => `
            <div class="wallpaper-option ${w.id === currentWall ? 'selected' : ''}" data-wall-id="${w.id}" style="background: ${w.src};">
              <div class="wallpaper-option-title">${w.name}</div>
            </div>
          `).join('')}
        </div>
        <div class="settings-custom-wall">
          <input type="text" id="custom-wall-input" class="settings-input" placeholder="Or enter custom wallpaper image URL (https://...)" />
          <button class="project-btn primary" id="apply-custom-wall-btn">Apply URL</button>
        </div>
      </div>

      <div>
        <div class="settings-section-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
          System Accent Glow
        </div>
        <div class="accent-colors-row">
          <div class="accent-dot selected" data-color="#00f0ff" data-rgb="0, 240, 255" style="background: #00f0ff;" title="Neon Cyan"></div>
          <div class="accent-dot" data-color="#b026ff" data-rgb="176, 38, 255" style="background: #b026ff;" title="Radiant Purple"></div>
          <div class="accent-dot" data-color="#ff007f" data-rgb="255, 0, 127" style="background: #ff007f;" title="Neon Magenta"></div>
          <div class="accent-dot" data-color="#00ff9d" data-rgb="0, 255, 157" style="background: #00ff9d;" title="Cyber Emerald"></div>
          <div class="accent-dot" data-color="#ffb703" data-rgb="255, 183, 3" style="background: #ffb703;" title="Solar Amber"></div>
        </div>
      </div>

      <div>
        <div class="settings-section-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          Appearance Mode
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="project-btn ${currentTheme === 'dark' ? 'primary' : 'secondary'}" id="theme-dark-btn">Obsidian Dark</button>
          <button class="project-btn ${currentTheme === 'cyber' ? 'primary' : 'secondary'}" id="theme-cyber-btn">Cyberpunk Neon</button>
          <button class="project-btn ${currentTheme === 'light' ? 'primary' : 'secondary'}" id="theme-light-btn">Light Mode</button>
        </div>
      </div>

      <div>
        <div class="settings-section-title">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          Audio Feedback
        </div>
        <div style="display: flex; align-items: center; gap: 14px;">
          <label style="font-size: 13.5px; display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-main);">
            <input type="checkbox" id="settings-audio-chk" checked />
            Enable AmeOS Web Audio synthesized feedback
          </label>
        </div>
      </div>
    </div>
  `;

  // Wallpaper selection click
  const wallOptions = container.querySelectorAll('.wallpaper-option');
  wallOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const wallId = opt.getAttribute('data-wall-id');
      wallOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      if (window.osSettings) {
        window.osSettings.switchWallpaper(wallId);
      }
    });
  });

  // Custom wallpaper URL
  const customInput = container.querySelector('#custom-wall-input');
  container.querySelector('#apply-custom-wall-btn').addEventListener('click', () => {
    const url = customInput.value.trim();
    if (url && window.osSettings) {
      window.osSettings.setCustomWallpaper(url);
    }
  });

  // Accent color dots
  const accentDots = container.querySelectorAll('.accent-dot');
  accentDots.forEach(dot => {
    dot.addEventListener('click', () => {
      accentDots.forEach(d => d.classList.remove('selected'));
      dot.classList.add('selected');
      const hex = dot.getAttribute('data-color');
      const rgb = dot.getAttribute('data-rgb');
      document.documentElement.style.setProperty('--accent-cyan', hex);
      document.documentElement.style.setProperty('--accent-color', hex);
      document.documentElement.style.setProperty('--accent-color-rgb', rgb);
      document.documentElement.style.setProperty('--accent-cyan-glow', `rgba(${rgb}, 0.5)`);
      if (window.soundSystem) window.soundSystem.playClick();
      if (window.showToast) window.showToast("Accent Updated", `Accent set to ${dot.title}`);
    });
  });

  // Theme buttons
  const darkBtn = container.querySelector('#theme-dark-btn');
  const cyberBtn = container.querySelector('#theme-cyber-btn');
  const lightBtn = container.querySelector('#theme-light-btn');

  function updateThemeUI(theme) {
    [darkBtn, cyberBtn, lightBtn].forEach(b => {
      b.className = 'project-btn secondary';
    });
    if (theme === 'dark') darkBtn.className = 'project-btn primary';
    if (theme === 'cyber') cyberBtn.className = 'project-btn primary';
    if (theme === 'light') lightBtn.className = 'project-btn primary';
  }

  darkBtn.addEventListener('click', () => {
    if (window.osSettings) window.osSettings.setTheme('dark');
    updateThemeUI('dark');
  });
  cyberBtn.addEventListener('click', () => {
    if (window.osSettings) window.osSettings.setTheme('cyber');
    updateThemeUI('cyber');
  });
  lightBtn.addEventListener('click', () => {
    if (window.osSettings) window.osSettings.setTheme('light');
    updateThemeUI('light');
  });

  // Audio check
  const audioChk = container.querySelector('#settings-audio-chk');
  audioChk.addEventListener('change', (e) => {
    if (window.soundSystem) {
      window.soundSystem.enabled = e.target.checked;
    }
  });
}

function initContactApp() {
  const container = document.getElementById('contact-content');
  if (!container) return;

  container.innerHTML = `
    <div class="contact-app">
      <div>
        <h3 style="font-size: 19px; font-weight: 800; margin-bottom: 4px; color: #ffffff;">Dispatch Transmission</h3>
        <p style="font-size: 13px; color: var(--text-secondary);">Direct message terminal to Hannan. Inquiries, advisory, or technical opportunities.</p>
      </div>

      <form id="contact-form" style="display: flex; flex-direction: column; gap: 14px;">
        <div class="contact-form-row">
          <label class="contact-form-label">Identifier / Name</label>
          <input type="text" class="contact-form-input" id="contact-name" placeholder="Alex Morgan" required />
        </div>

        <div class="contact-form-row">
          <label class="contact-form-label">Transmission Channel (Email)</label>
          <input type="email" class="contact-form-input" id="contact-email" placeholder="alex@company.com" required />
        </div>

        <div class="contact-form-row">
          <label class="contact-form-label">Transmission Subject</label>
          <input type="text" class="contact-form-input" id="contact-subject" placeholder="Project collaboration / Engineering role" required />
        </div>

        <div class="contact-form-row">
          <label class="contact-form-label">Encrypted Message</label>
          <textarea class="contact-form-textarea" id="contact-msg" placeholder="Hi Hannan, I came across AmeOS 16 and would love to chat about..." required></textarea>
        </div>

        <button type="submit" class="project-btn primary" id="contact-submit-btn" style="padding: 12px 20px; justify-content: center; font-size: 14px;">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          Dispatch Transmission
        </button>
      </form>

      <div class="contact-social-links">
        <a href="https://github.com" target="_blank" class="social-link-pill">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" class="social-link-pill">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          LinkedIn
        </a>
        <a href="mailto:hannan.developer@example.com" class="social-link-pill">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          Direct Email
        </a>
      </div>
    </div>
  `;

  const form = container.querySelector('#contact-form');
  const submitBtn = container.querySelector('#contact-submit-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.innerHTML = `Transmitting signal...`;
    submitBtn.style.opacity = '0.75';

    setTimeout(() => {
      submitBtn.innerHTML = `✓ Transmission Confirmed!`;
      submitBtn.style.background = 'linear-gradient(135deg, #00ff9d, #00f0ff)';
      submitBtn.style.color = '#03050a';
      submitBtn.style.opacity = '1';

      if (window.soundSystem) window.soundSystem.playNotification();
      if (window.showToast) {
        window.showToast("Signal Dispatched", "Transmission received. Hannan will establish contact shortly.");
      }

      form.reset();
      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          Dispatch Another Transmission
        `;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 3500);
    }, 900);
  });
}

function initMusicApp() {
  const container = document.getElementById('music-content');
  if (!container) return;

  container.innerHTML = `
    <div class="music-app">
      <div>
        <h3 style="font-size: 17px; font-weight: 800; color: #fff;">AmeOS Lo-Fi Lounge</h3>
        <p style="font-size: 12.5px; color: var(--text-secondary); margin-top: 3px;">Synthesizing ambient chill chords via client Web Audio DSP</p>
      </div>

      <div class="vinyl-disc-wrap" id="vinyl-disc">
        <div class="vinyl-center">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </div>
      </div>

      <canvas id="audio-visualizer" width="300" height="54"></canvas>

      <div class="music-controls">
        <button class="music-ctrl-btn" id="music-prev-btn" title="Previous Vibe">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button class="music-ctrl-btn play-btn" id="music-play-btn" title="Play / Pause">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="22" height="22" id="music-play-icon"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/></svg>
        </button>
        <button class="music-ctrl-btn" id="music-next-btn" title="Next Vibe">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;

  const playBtn = container.querySelector('#music-play-btn');
  const playIcon = container.querySelector('#music-play-icon');
  const vinyl = container.querySelector('#vinyl-disc');
  const canvas = container.querySelector('#audio-visualizer');
  const ctx = canvas.getContext('2d');

  function updateMusicState(playing) {
    if (playing) {
      vinyl.classList.add('spinning');
      playIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6"/>`;
      startVisualizer();
      if (window.showToast) window.showToast("Lo-Fi Synths Active", "Relax and explore AmeOS 16 with chill ambient chords.");
    } else {
      vinyl.classList.remove('spinning');
      playIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>`;
    }
  }

  playBtn.addEventListener('click', () => {
    if (window.soundSystem) {
      window.soundSystem.toggleLoFiMusic(updateMusicState);
    }
  });

  function startVisualizer() {
    function draw() {
      if (!window.soundSystem || !window.soundSystem.isPlayingMusic) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      requestAnimationFrame(draw);

      const bufferLength = window.soundSystem.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      window.soundSystem.analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = `rgba(0, 240, 255, ${dataArray[i] / 255 + 0.25})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    }
    draw();
  }
}

function initNotesApp() {
  const container = document.getElementById('notes-content');
  if (!container) return;

  const savedNotes = localStorage.getItem('ameos_notes') || `Welcome to AmeOS 16 Notes 📝\n\n- Liquid-Glass futuristic design system active\n- Floating capsule dock with proximity magnification\n- Type 'help' or 'sysinfo' in Cyber Terminal\n- Press Cmd+K (or Ctrl+K) for Spotlight search\n- Check out the Lo-Fi Lounge synthesizer!`;

  container.innerHTML = `
    <div class="notes-app">
      <textarea class="notes-textarea" id="notes-text" placeholder="Type quick notes, thoughts, or blueprints here...">${savedNotes}</textarea>
    </div>
  `;

  const textarea = container.querySelector('#notes-text');
  textarea.addEventListener('input', () => {
    localStorage.setItem('ameos_notes', textarea.value);
  });
}

window.initAboutApp = initAboutApp;
window.initProjectsApp = initProjectsApp;
window.initSkillsApp = initSkillsApp;
window.initResumeApp = initResumeApp;
window.initSettingsApp = initSettingsApp;
window.initContactApp = initContactApp;
window.initMusicApp = initMusicApp;
window.initNotesApp = initNotesApp;
