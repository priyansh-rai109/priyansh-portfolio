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

  // ===== Navbar Active Link =====
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach(link => {
      if(link.getAttribute("href") === currentPage) link.classList.add("active");
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
      const triggerPoint = window.innerHeight * 0.8;
      bars.forEach(bar => {
          const barTop = bar.getBoundingClientRect().top;
          if(barTop < triggerPoint){
              const width = bar.getAttribute('data-width');
              bar.style.width = width;
          }
      });
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills(); // trigger on page load

  // ===== Certificate Popups =====
  function setupCertificate(btnId, popupId, closeId){
      const openBtn = document.getElementById(btnId);
      const popup = document.getElementById(popupId);
      const closeBtn = document.getElementById(closeId);

      if(openBtn && popup && closeBtn){
          openBtn.addEventListener("click", ()=>{ popup.style.display = "flex"; });
          closeBtn.addEventListener("click", ()=>{ popup.style.display = "none"; });
          window.addEventListener("click", (e) => { if(e.target === popup) popup.style.display = "none"; });
      }
  }
  setupCertificate("openCert1","certPopup1","closeCert1");
  setupCertificate("openCert2","certPopup2","closeCert2");
  setupCertificate("openCert3","certPopup3","closeCert3");
  setupCertificate("openCert4","certPopup4","closeCert4");
  setupCertificate("openCert5","certPopup5","closeCert5");
  setupCertificate("openCert6","certPopup6","closeCert6");

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
  // Dynamically load Vanilla Tilt JS
  const tiltScript = document.createElement("script");
  tiltScript.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js";
  tiltScript.onload = () => {
      // Apply tilt to Hero Image
      const heroImage = document.querySelector(".about-image img");
      if (heroImage) {
          window.VanillaTilt.init(heroImage, {
              max: 15,
              speed: 400,
              glare: true,
              "max-glare": 0.3,
          });
      }

      // Apply tilt to Skill Cards
      const skillCards = document.querySelectorAll(".skill-card");
      if (skillCards.length > 0) {
          window.VanillaTilt.init(skillCards, {
              max: 20,
              speed: 400,
              glare: true,
              "max-glare": 0.2,
              scale: 1.05
          });
      }

      // Apply tilt to Project Cards
      const projectCards = document.querySelectorAll(".project-card");
      if (projectCards.length > 0) {
          window.VanillaTilt.init(projectCards, {
              max: 10,
              speed: 400,
              glare: true,
              "max-glare": 0.1,
              scale: 1.02
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
          duration: 2500,
          delay: 400,
          reset: false // don't reset on every scroll up
      });
      sr.reveal('.about-content h1', { delay: 200, origin: 'left' });
      // sr.reveal('.hero-subtitle', { delay: 300, origin: 'left' });
      sr.reveal('.about-content p', { delay: 400, origin: 'left' });
      sr.reveal('.hero-buttons', { delay: 500, origin: 'left' });
      sr.reveal('.hero-socials', { delay: 600, origin: 'bottom' });
      sr.reveal('.about-image', { delay: 300, origin: 'right' });
      sr.reveal('.section-title, .section-sub', { delay: 200, origin: 'top' });
      sr.reveal('.project-card, .skill-card, .timeline-item', { delay: 300, origin: 'bottom', interval: 200 });
      console.log("✅ ScrollReveal Loaded!");
  };
  document.body.appendChild(srScript);

  // ===== Typed.js Initialization =====
  const typedScript = document.createElement("script");
  typedScript.src = "https://cdn.jsdelivr.net/npm/typed.js@2.0.12";
  typedScript.onload = () => {
      const typedElement = document.querySelector(".hero-subtitle");
      if (typedElement) {
          // Disable pure CSS typing animation so Typed.js can take over
          typedElement.style.animation = "none";
          typedElement.style.borderRight = "none";
          typedElement.style.width = "auto";
          typedElement.style.whiteSpace = "normal";
          typedElement.style.display = "inline";
          typedElement.innerHTML = "";

          new window.Typed(".hero-subtitle", {
              strings: ["Frontend Developer", "Web Enthusiast", "UI/UX Learner"],
              typeSpeed: 60,
              backSpeed: 40,
              backDelay: 2000,
              loop: true
          });
          console.log("✅ Typed.js Loaded!");
      }
  };
  document.body.appendChild(typedScript);

  // ===== Particles.js Initialization =====
  const particlesDiv = document.getElementById("particles-js");
  if (particlesDiv) {
      const particlesScript = document.createElement("script");
      particlesScript.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      particlesScript.onload = () => {
          window.particlesJS("particles-js", {
              "particles": {
                  "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                  "color": { "value": "#00E5FF" },
                  "shape": { "type": "circle" },
                  "opacity": { "value": 0.3, "random": false },
                  "size": { "value": 3, "random": true },
                  "line_linked": {
                      "enable": true,
                      "distance": 150,
                      "color": "#00E5FF",
                      "opacity": 0.2,
                      "width": 1
                  },
                  "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
              },
              "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                      "onhover": { "enable": true, "mode": "grab" },
                      "onclick": { "enable": true, "mode": "push" },
                      "resize": true
                  },
                  "modes": {
                      "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                      "push": { "particles_nb": 4 }
                  }
              },
              "retina_detect": true
          });
          console.log("✅ Particles.js Loaded!");
      };
      document.body.appendChild(particlesScript);
  }
});
