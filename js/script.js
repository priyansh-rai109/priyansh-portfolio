/* ============================================================
   🌙 Priyansh Rai Portfolio JavaScript
   Handles:
   - Dark/Light Mode Toggle
   - Navbar Active Link Highlight
   - Auto Year Update in Footer
   - Scroll-to-top Button
   - Skills Animation
   - Certificate Popups
   - Contact Form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtn = document.getElementById("theme-toggle");
  const yearSpan = document.getElementById("year");
  const navLinks = document.querySelectorAll(".navbar a");
  const scrollBtn = document.createElement("button");
  scrollBtn.classList.add("scroll-top-btn");
  scrollBtn.innerHTML = "⬆️";
  document.body.appendChild(scrollBtn);

  // ===== Theme Toggle =====
  if(localStorage.getItem("theme") === "light"){
      body.classList.add("light");
      if(themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
      if(themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  if(themeBtn){
      themeBtn.addEventListener("click", () => {
          body.classList.toggle("light");
          if(body.classList.contains("light")){
              localStorage.setItem("theme","light");
              themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
          } else {
              localStorage.setItem("theme","dark");
              themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
          }
      });
  }

  // ===== Footer Year Auto Update =====
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ===== Multi-Page Navbar Active Link Highlight =====
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href && (href === currentPage || (currentPage === "" && href === "index.html"))) {
          link.classList.add("active");
      } else if (href && href.startsWith("#")) {
          // Single-page fallback scrollspy
          const sectionId = href.substring(1);
          const section = document.getElementById(sectionId);
          if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                  link.classList.add("active");
              } else {
                  link.classList.remove("active");
              }
          }
      } else {
          link.classList.remove("active");
      }
  });

  // ===== Scroll-to-top Button =====
  scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  // ===== Skill Bar Animation =====
  const bars = document.querySelectorAll('.bar');
  function animateSkills() {
      const triggerPoint = window.innerHeight * 0.85;
      bars.forEach(bar => {
          const barTop = bar.getBoundingClientRect().top;
          if(barTop < triggerPoint){
              const width = bar.getAttribute('data-width');
              if (width) bar.style.width = width;
          }
      });
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills(); // trigger on load

  // ===== Certificate Popups Lightbox =====
  function closeAllPopups() {
      document.querySelectorAll('.certificate-popup').forEach(popup => {
          popup.style.display = 'none';
          popup.classList.remove('active', 'show');
      });
      document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
      // 1. Open Modal Button Click
      const btn = e.target.closest('.btn-view, [data-cert-target], [id^="openCert"]');
      if (btn) {
          e.preventDefault();
          let targetId = btn.getAttribute('data-cert-target');
          if (!targetId && btn.id) {
              targetId = btn.id.replace('openCert', 'certPopup');
          }
          if (targetId) {
              const popup = document.getElementById(targetId);
              if (popup) {
                  closeAllPopups();
                  popup.style.display = 'flex';
                  popup.classList.add('active', 'show');
                  document.body.style.overflow = 'hidden';
              }
          }
      }

      // 2. Close Modal Cross Button Click
      if (e.target.closest('.close-popup')) {
          closeAllPopups();
      }

      // 3. Click Outside Modal Box (Background Overlay Click)
      if (e.target.classList.contains('certificate-popup')) {
          closeAllPopups();
      }
  });

  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          closeAllPopups();
      }
  });

  // ===== Contact Form =====
  const contactForm = document.querySelector('[data-local-contact-form]');
  if(contactForm){
      contactForm.addEventListener('submit', function(e){
          e.preventDefault();
          alert('✅ Thank you! Your message has been sent.');
          contactForm.reset();
      });
  }

  // ===== Greeting on Load =====
  console.log("✅ Portfolio loaded successfully!");

  // ===== 3D Tilt Effect Initialization =====
  const tiltScript = document.createElement("script");
  tiltScript.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js";
  tiltScript.onload = () => {
      // Apply tilt to Hero Avatar
      const heroAvatar = document.querySelector(".hero-avatar-box, .about-image img");
      if (heroAvatar) {
          window.VanillaTilt.init(heroAvatar, {
              max: 12,
              speed: 400,
              glare: true,
              "max-glare": 0.25,
              scale: 1.02
          });
      }

      // Apply tilt to Project Cards
      const projectCards = document.querySelectorAll(".project-card");
      if (projectCards.length > 0) {
          window.VanillaTilt.init(projectCards, {
              max: 8,
              speed: 400,
              glare: true,
              "max-glare": 0.12,
              scale: 1.01
          });
      }

      // Apply tilt to Skill Cards
      const skillCards = document.querySelectorAll(".skill-card");
      if (skillCards.length > 0) {
          window.VanillaTilt.init(skillCards, {
              max: 15,
              speed: 400,
              glare: true,
              "max-glare": 0.15,
              scale: 1.03
          });
      }
      console.log("✅ 3D Tilt Effects Loaded!");
  };
  document.body.appendChild(tiltScript);

  // ===== ScrollReveal Animations =====
  const srScript = document.createElement("script");
  srScript.src = "https://unpkg.com/scrollreveal";
  srScript.onload = () => {
      const sr = window.ScrollReveal({
          distance: '60px',
          duration: 2200,
          delay: 300,
          reset: false
      });
      sr.reveal('.hero-text-content h1', { delay: 200, origin: 'left' });
      sr.reveal('.hero-text-content .hero-subtitle', { delay: 300, origin: 'left' });
      sr.reveal('.hero-text-content p', { delay: 400, origin: 'left' });
      sr.reveal('.hero-buttons', { delay: 500, origin: 'left' });
      sr.reveal('.hero-socials', { delay: 600, origin: 'bottom' });
      sr.reveal('.hero-avatar-box', { delay: 300, origin: 'right' });
      sr.reveal('.scroll-indicator', { delay: 700, origin: 'bottom' });
      sr.reveal('.section-title, .section-sub', { delay: 200, origin: 'top' });
      sr.reveal('.project-card, .skill-card, .timeline-item, .certificate-card, .other-project-card', { delay: 300, origin: 'bottom', interval: 150 });
      console.log("✅ ScrollReveal Loaded!");
  };
  document.body.appendChild(srScript);

  // ===== Typed.js Initialization =====
  const typedScript = document.createElement("script");
  typedScript.src = "https://cdn.jsdelivr.net/npm/typed.js@2.0.12";
  typedScript.onload = () => {
      const typedElement = document.querySelector("#typed");
      if (typedElement) {
          new window.Typed("#typed", {
              strings: ["Full-Stack Developer", "AI Tools Builder", "2nd Year CSE @ JIET"],
              typeSpeed: 60,
              backSpeed: 40,
              backDelay: 2000,
              startDelay: 200,
              loop: true,
              showCursor: true,
              cursorChar: '|'
          });
          console.log("✅ Typed.js Loaded & Cycling!");
      }
  };
  document.body.appendChild(typedScript);

  // ===== Particles.js Initialization =====
  const particlesDiv = document.getElementById("particles-js");
  if (particlesDiv) {
      const particlesScript = document.createElement("script");
      particlesScript.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      particlesScript.onload = () => {
          const isMobile = window.innerWidth < 768;
          const particleCount = isMobile ? 18 : 35;
          window.particlesJS("particles-js", {
              "particles": {
                  "number": { "value": particleCount, "density": { "enable": true, "value_area": 800 } },
                  "color": { "value": "#00E5FF" },
                  "shape": { "type": "circle" },
                  "opacity": { "value": 0.25, "random": false },
                  "size": { "value": 3, "random": true },
                  "line_linked": {
                      "enable": true,
                      "distance": 140,
                      "color": "#00E5FF",
                      "opacity": 0.16,
                      "width": 1
                  },
                  "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
              },
              "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                      "onhover": { "enable": true, "mode": "grab" },
                      "onclick": { "enable": true, "mode": "push" },
                      "resize": true
                  },
                  "modes": {
                      "grab": { "distance": 160, "line_linked": { "opacity": 0.45 } },
                      "push": { "particles_nb": 3 }
                  }
              },
              "retina_detect": true
          });
          console.log("✅ Particles.js Loaded with Grab Mode!");
      };
      document.body.appendChild(particlesScript);
  }

  // ===== Magnetic Button Effect =====
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!isReducedMotion && window.innerWidth >= 768) {
      const magneticBtns = document.querySelectorAll('.magnetic-btn');
      magneticBtns.forEach(btn => {
          btn.addEventListener('mousemove', (e) => {
              const rect = btn.getBoundingClientRect();
              const btnCenterX = rect.left + rect.width / 2;
              const btnCenterY = rect.top + rect.height / 2;
              const deltaX = (e.clientX - btnCenterX) * 0.28;
              const deltaY = (e.clientY - btnCenterY) * 0.28;
              btn.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.04)`;
          });

          btn.addEventListener('mouseleave', () => {
              btn.style.transform = 'translate(0px, 0px) scale(1)';
          });
      });
  }

  // ===== Hero Cursor Glow & Layered Parallax =====
  if (!isReducedMotion && window.innerWidth >= 768) {
      const heroSection = document.getElementById('hero');
      const heroCursorGlow = document.querySelector('.hero-cursor-glow');
      const heroAvatarBox = document.querySelector('.hero-avatar-box');
      const particlesCanvas = document.getElementById('particles-js');

      if (heroSection) {
          heroSection.addEventListener('mousemove', (e) => {
              const rect = heroSection.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              // 1. Move Custom Glow
              if (heroCursorGlow) {
                  heroCursorGlow.style.left = `${x}px`;
                  heroCursorGlow.style.top = `${y}px`;
              }

              // 2. Avatar Parallax
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const moveX = (x - centerX) / 30;
              const moveY = (y - centerY) / 30;

              if (heroAvatarBox) {
                  heroAvatarBox.style.transform = `translate(${moveX}px, ${moveY}px)`;
              }

              // 3. Particles Background Parallax (Opposite Direction)
              if (particlesCanvas) {
                  particlesCanvas.style.transform = `translate(${-moveX * 0.3}px, ${-moveY * 0.3}px)`;
              }
          });

          heroSection.addEventListener('mouseleave', () => {
              if (heroAvatarBox) heroAvatarBox.style.transform = 'translate(0px, 0px)';
              if (particlesCanvas) particlesCanvas.style.transform = 'translate(0px, 0px)';
          });
      }
  }

  // ===== Animated Stats Counter (requestAnimationFrame) =====
  function animateStatsCounter() {
      const statNumbers = document.querySelectorAll('.stat-number');
      if (statNumbers.length === 0) return;

      statNumbers.forEach(stat => {
          if (stat.dataset.counted === "true") return;
          stat.dataset.counted = "true";

          const target = parseInt(stat.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          const duration = 1600; // 1.6 seconds count-up
          const startTime = performance.now();

          function updateCount(currentTime) {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              // Ease-out cubic calculation
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeProgress * target);
              stat.textContent = currentVal;

              if (progress < 1) {
                  requestAnimationFrame(updateCount);
              } else {
                  stat.textContent = target;
              }
          }

          requestAnimationFrame(updateCount);
      });
  }

  const heroStatsRow = document.querySelector('.hero-stats');
  if (heroStatsRow) {
      if (isReducedMotion) {
          // Instantly set target values for reduced motion
          document.querySelectorAll('.stat-number').forEach(s => {
              s.textContent = s.getAttribute('data-target');
          });
      } else {
          const statsObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      animateStatsCounter();
                      statsObserver.disconnect();
                  }
              });
          }, { threshold: 0.1 });
          statsObserver.observe(heroStatsRow);

          // Immediate/Fallback Trigger for Hero section initial view
          setTimeout(animateStatsCounter, 400);
      }
  }
});
