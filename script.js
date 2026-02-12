/* ================================================
   PORTFOLIO — INTERACTIONS & ANIMATIONS
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initTypedText();
  initScrollReveal();
  initNavScroll();
  initFooterYear();
  initParallax();
});

/* ===== HAMBURGER MENU ===== */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
}

/* ===== TYPED TEXT EFFECT ===== */
function initTypedText() {
  const roles = [
    "Full Stack Web Developer",
    "Mobile Developer",
    "UI / UX Designer",
    "Backend Engineer",
  ];
  const el = document.getElementById("typed-role");
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 2000;
  const pauseStart = 500;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      el.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, pauseEnd);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, pauseStart);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  setTimeout(tick, 1000);
}

/* ===== SCROLL REVEAL (IntersectionObserver) ===== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-reveal-delay") || 0;
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ===== NAV SCROLL BEHAVIOR ===== */
function initNavScroll() {
  const desktopNav = document.getElementById("desktop-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Scrolled state
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (desktopNav) {
      desktopNav.style.backgroundColor = currentScroll > 50 ? "rgba(10, 10, 15, 0.92)" : "rgba(10, 10, 15, 0.6)";
      desktopNav.style.boxShadow = currentScroll > 50 ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none";
    }

    // Active link tracking
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (currentScroll >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ===== DYNAMIC FOOTER YEAR ===== */
function initFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ===== PARALLAX FOR ORBITS ===== */
function initParallax() {
  const orbit1 = document.querySelector(".orbit-1");
  const orbit2 = document.querySelector(".orbit-2");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    if (orbit1) orbit1.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.02}deg)`;
    if (orbit2) orbit2.style.transform = `translateY(${scrolled * -0.15}px) rotate(${scrolled * -0.01}deg)`;
  });
}

/* ===== FLOATING PARTICLES ===== */
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height, particles;
  const particleCount = 50;
  const maxDistance = 150;
  let mouse = { x: null, y: null };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          const lineOpacity = (1 - dist / maxDistance) * 0.1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${lineOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseout", () => { mouse.x = null; mouse.y = null; });

  resize(); createParticles(); drawParticles();
}
