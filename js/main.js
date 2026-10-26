/**
 * IGNACIO GATTI - PORTFOLIO LOGIC
 * Dynamic rendering, modals, theme switcher, typing effect, clipboard & animations
 * No emojis • Clean & robust logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbar();
  renderProjects('all');
  initProjectFilters();
  renderSkills();
  renderTimeline();
  initStatsCounter();
  initModals();
  initClipboardAndContact();
  initBackToTop();
  fetchGitHubStats();
});

/* ===================================================================
   1. THEME SWITCHER (Dark / Light Mode)
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      themeIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }
}

/* ===================================================================
   2. HERO TYPING EFFECT
   =================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    "Estudiante de Desarrollo de Software",
    "Sistemas de Escritorio y POS",
    "Desarrollo Frontend y Backend",
    "Electron, TypeScript y React"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   3. NAVBAR & SCROLLSPY
   =================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
      }
    });
  }
}

/* ===================================================================
   4. RENDER PROJECTS & FILTERING
   =================================================================== */
function renderProjects(filter = 'all') {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  const filteredProjects = portfolioData.projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'desktop') return project.category === 'desktop';
    if (filter === 'web') return project.category === 'web';
    if (filter === 'featured') return project.featured;
    return true;
  });

  container.innerHTML = filteredProjects.map(project => `
    <article class="project-card" data-category="${project.category}">
      ${project.image ? `
        <div class="project-img-wrap">
          <img src="${project.image}" alt="${project.title} - Ignacio Gatti" class="project-img" loading="lazy" />
          <span class="project-category-badge">${project.badge}</span>
        </div>
      ` : `
        <div class="project-card-header">
          <div class="project-window-dots">
            <span class="window-dot"></span>
            <span class="window-dot"></span>
            <span class="window-dot"></span>
          </div>
          <span class="project-badge-tag">${project.badge}</span>
        </div>
      `}

      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-subtitle">${project.subtitle}</p>
        <p class="project-summary">${project.summary}</p>

        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>

        <div class="project-footer">
          <div class="project-links">
            <button class="btn btn-secondary btn-sm" onclick="openProjectModal('${project.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Detalles
            </button>
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderProjects(filterValue);
    });
  });
}

/* ===================================================================
   5. RENDER SKILLS
   =================================================================== */
function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;

  const categories = [
    {
      title: "Desarrollo Frontend & Web",
      skills: portfolioData.skills.frontend
    },
    {
      title: "Aplicaciones Desktop & Backend",
      skills: portfolioData.skills.desktopBackend
    },
    {
      title: "Bases de Datos & Persistencia",
      skills: portfolioData.skills.databases
    },
    {
      title: "Herramientas & Habilidades Profesionales",
      skills: portfolioData.skills.toolsAndSoft
    }
  ];

  container.innerHTML = categories.map(cat => `
    <div class="skill-category-card">
      <div class="skill-cat-header">
        <h3>${cat.title}</h3>
      </div>
      <div class="skill-items-list">
        ${cat.skills.map(skill => `
          <div class="skill-item">
            <div class="skill-meta">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-percent">${skill.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" style="width: 0%" data-target-width="${skill.level}%"></div>
            </div>
            <p class="skill-desc">${skill.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(fill => {
          fill.style.width = fill.getAttribute('data-target-width');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.skill-category-card').forEach(card => observer.observe(card));
}

/* ===================================================================
   6. RENDER TIMELINE
   =================================================================== */
function renderTimeline() {
  const educationContainer = document.getElementById('educationTimeline');
  const experienceContainer = document.getElementById('experienceTimeline');

  if (educationContainer) {
    educationContainer.innerHTML = portfolioData.education.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-period">${item.period}</span>
          <h4 class="timeline-title">${item.title}</h4>
          <p class="timeline-org">${item.institution} — ${item.status}</p>
          <p class="timeline-desc">${item.description}</p>
        </div>
      </div>
    `).join('');
  }

  if (experienceContainer) {
    experienceContainer.innerHTML = portfolioData.experience.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-period">${item.period}</span>
          <h4 class="timeline-title">${item.role}</h4>
          <p class="timeline-org">${item.company} — ${item.location}</p>
          <p class="timeline-desc">${item.description}</p>
        </div>
      </div>
    `).join('');
  }
}

/* ===================================================================
   7. STATS COUNTER ANIMATION
   =================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-target');
          let current = 0;
          const increment = target / 25;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.textContent = target + (stat.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              stat.textContent = Math.ceil(current) + (stat.getAttribute('data-suffix') || '');
            }
          }, 40);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ===================================================================
   8. PROJECT MODAL CONTROLLER
   =================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        modalOverlay.classList.remove('open');
      }
    });
  }
}

window.openProjectModal = function(projectId) {
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');

  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    ${project.image ? `
      <div class="modal-image-wrap">
        <img src="${project.image}" alt="${project.title}" style="width:100%; height:auto;" />
      </div>
    ` : ''}

    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <span class="badge">${project.badge}</span>
      <span style="font-family:var(--font-mono); font-size:0.8125rem; color:var(--text-muted);">${project.tags[0]}</span>
    </div>

    <h2 style="font-size:1.6rem; margin-bottom:4px;">${project.title}</h2>
    <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:18px;">${project.subtitle}</p>
    
    <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:20px;">
      ${project.description}
    </p>

    <h4 style="font-size:1rem; margin-bottom:10px; color:var(--text-primary);">Puntos clave:</h4>
    <ul class="modal-highlights">
      ${project.highlights.map(h => `<li>${h}</li>`).join('')}
    </ul>

    <h4 style="font-size:1rem; margin-bottom:10px; color:var(--text-primary);">Tecnologías:</h4>
    <div class="project-tags" style="margin-bottom:24px;">
      ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
    </div>

    <div style="display:flex; gap:12px; flex-wrap:wrap;">
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex:1;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        Ver en GitHub
      </a>
      ${project.demo ? `
        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex:1;">
          Demo online
        </a>
      ` : ''}
    </div>
  `;

  modalOverlay.classList.add('open');
};

/* ===================================================================
   9. CLIPBOARD COPY, TOAST & CONTACT FORM
   =================================================================== */
function initClipboardAndContact() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(portfolioData.profile.email).then(() => {
        showToast('Email copiado al portapapeles');
      }).catch(() => {
        showToast(portfolioData.profile.email);
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(portfolioData.profile.phone).then(() => {
        showToast('Teléfono copiado al portapapeles');
      }).catch(() => {
        showToast(portfolioData.profile.phone);
      });
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const message = document.getElementById('formMessage').value;

      const mailtoUrl = `mailto:${portfolioData.profile.email}?subject=Contacto%20Portfolio%20de%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AEmail%20de%20contacto:%20${encodeURIComponent(email)}`;
      
      showToast(`Abriendo correo...`);
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 500);
    });
  }
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

/* ===================================================================
   10. BACK TO TOP
   =================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================================================================
   11. REAL GITHUB STATS FETCH
   =================================================================== */
async function fetchGitHubStats() {
  try {
    const res = await fetch('https://api.github.com/users/Ignagatti');
    if (res.ok) {
      const data = await res.json();
      const repoCountElem = document.getElementById('ghRepoCount');
      if (repoCountElem && data.public_repos) {
        repoCountElem.textContent = `${data.public_repos}+`;
      }
    }
  } catch (err) {
    // Silently fallback to default in HTML
  }
}
