/* ==========================================================================
   SREE SAKTHI TAILORING - APP CONTROLLER
   - Ambient Canvas Lighting System
   - 3-Second Delay & Login Screen Transitions
   - Photo / Video Switchers for  Products
   - Direct WhatsApp Ordering & Custom Measurement Dispatcher
   - Developer WhatsApp Floating Widget (Dhiva)
   ========================================================================== */

// --- CONFIGURATION ---
const STORE_CONFIG = {
  // Replace with your real WhatsApp Numbers (format: CountryCode + Number without '+')
  storeWhatsApp: "918428258938",    // Sree Sakthi Tailoring Shop WhatsApp
  developerWhatsApp: "919514905794",// Dhiva (Developer) WhatsApp
  brandName: "SREE SAKTHI TAILORING",
  developerName: "Dhiva"
};

let customerName = "";
let currentSelectedProductForCustom = "";

// ==========================================================================
// 1. AMBIENT LUXURY CANVAS LIGHTING EFFECT
// ==========================================================================
(function initAmbientLighting() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle Mesh & Glowing Beams
  const particles = [];
  const particleCount = Math.min(50, Math.floor((width * height) / 22000));

  class LightParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 0.8;
      this.baseAlpha = Math.random() * 0.45 + 0.15;
      this.alpha = this.baseAlpha;
      this.speedX = (Math.random() - 0.5) * 0.55;
      this.speedY = (Math.random() - 0.5) * 0.55;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseAngle = Math.random() * Math.PI * 2;
      // Gold & Warm Diamond tones
      const colors = ['243, 223, 138', '212, 175, 55', '255, 244, 194', '16, 185, 129'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      this.pulseAngle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.05, this.alpha)})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new LightParticle());
  }

  // Interactive mouse glow light
  let mouse = { x: width / 2, y: height / 2, radius: 180 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function renderScene() {
    ctx.clearRect(0, 0, width, height);

    // Subtle soft radiant lighting from cursor
    const radial = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, mouse.radius);
    radial.addColorStop(0, 'rgba(230, 202, 101, 0.06)');
    radial.addColorStop(1, 'rgba(230, 202, 101, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles with subtle inter-connecting golden threads
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(230, 202, 101, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderScene);
  }

  renderScene();
})();

// ==========================================================================
// 2. 3-SECOND DELAY & LOGIN FLOW
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('login-screen');
  const progressBar = document.getElementById('login-progress');
  const countdownText = document.getElementById('countdown-text');
  const btnLogin = document.getElementById('btn-login');
  const btnSkipLogin = document.getElementById('btn-skip-login');
  const custNameInput = document.getElementById('cust-name-input');

  let duration = 10000; // 10 seconds
  let startTime = Date.now();
  let timerFinished = false;
  let animationFrameId = null;

  function dismissLoginScreen() {
    if (loginScreen.classList.contains('hidden-screen')) return;
    
    // Save customer name if entered
    if (custNameInput && custNameInput.value.trim() !== "") {
      customerName = custNameInput.value.trim();
    }

    loginScreen.classList.add('hidden-screen');
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    // Subtle audio / celebratory vibration if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  // 3-Second Countdown Loop
  function updateProgress() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(100, (elapsed / duration) * 100);
    const remainingSeconds = Math.max(0, Math.ceil((duration - elapsed) / 1000));

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (countdownText) countdownText.textContent = remainingSeconds;

    if (elapsed < duration) {
      animationFrameId = requestAnimationFrame(updateProgress);
    } else {
      timerFinished = true;
      // Auto-enter upon completing 3 seconds
      dismissLoginScreen();
    }
  }

  animationFrameId = requestAnimationFrame(updateProgress);

  // Manual Click triggers
  if (btnLogin) {
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault();
      dismissLoginScreen();
    });
  }

  if (btnSkipLogin) {
    btnSkipLogin.addEventListener('click', (e) => {
      e.preventDefault();
      dismissLoginScreen();
    });
  }

  // Allow pressing Enter in the input
  if (custNameInput) {
    custNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        dismissLoginScreen();
      }
    });
  }
});

// ==========================================================================
// 3. PHOTO / VIDEO SWITCHER (FOR ALL 5 PRODUCTS)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((card) => {
    const toggleButtons = card.querySelectorAll('.media-toggle-btn');
    const photo = card.querySelector('.product-photo');
    const videoWrap = card.querySelector('.product-video-wrap');
    const video = card.querySelector('.product-video');

    toggleButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');

        // Update active class on buttons
        toggleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (type === 'photo') {
          // Show photo, pause & hide video
          photo.style.display = 'block';
          setTimeout(() => { photo.style.opacity = '1'; }, 10);
          
          if (videoWrap) videoWrap.classList.remove('active');
          if (video) video.pause();
        } else if (type === 'video') {
          // Hide photo, show and play video
          photo.style.opacity = '0';
          setTimeout(() => { photo.style.display = 'none'; }, 300);

          if (videoWrap) videoWrap.classList.add('active');
          if (video) {
            video.currentTime = 0;
            video.play().catch(err => {
              console.log("Auto-play video notice:", err);
            });
          }
        }
      });
    });
  });
});

// ==========================================================================
// 4. DIRECT WHATSAPP ORDERING ("BUY NOW")
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const orderButtons = document.querySelectorAll('.btn-order-wa');

  orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const productName = button.getAttribute('data-name');
      const productPrice = button.getAttribute('data-price');
      const custInfo = customerName ? `\n👤 *Customer:* ${customerName}` : '';

      const messageText = 
`✨ *NEW TAILORING ORDER INQUIRY* ✨
━━━━━━━━━━━━━━━━━━━━━
🏪 *Store:* ${STORE_CONFIG.brandName}
👗 *Product:* ${productName}
💰 *Price:* ${productPrice}${custInfo}
━━━━━━━━━━━━━━━━━━━━━
Vanakkam! I would like to order this tailored item. 
Please share measurement guidance, fabric options, and payment details!`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${STORE_CONFIG.storeWhatsApp}?text=${encodedMessage}`;

      // Open WhatsApp chat in new tab
      window.open(whatsappUrl, '_blank');
    });
  });
});

// ==========================================================================
// 5. CUSTOM MEASUREMENTS MODAL & WHATSAPP DISPATCH
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const customModal = document.getElementById('custom-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalProductTitle = document.getElementById('modal-product-title');
  const measurementForm = document.getElementById('measurement-form');

  // Open Modal buttons
  const openButtons = document.querySelectorAll('.btn-open-custom');
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentSelectedProductForCustom = btn.getAttribute('data-product') || "Tailoring Customization";
      if (modalProductTitle) {
        modalProductTitle.textContent = `For: ${currentSelectedProductForCustom}`;
      }
      customModal.classList.add('active');
    });
  });

  // Close Modal
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      customModal.classList.remove('active');
    });
  }

  // Close on outside click
  if (customModal) {
    customModal.addEventListener('click', (e) => {
      if (e.target === customModal) {
        customModal.classList.remove('active');
      }
    });
  }

  // Handle Form Submit
  if (measurementForm) {
    measurementForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const bust = document.getElementById('meas-bust').value.trim() || 'Standard';
      const waist = document.getElementById('meas-waist').value.trim() || 'Standard';
      const length = document.getElementById('meas-length').value.trim() || 'Standard';
      const sleeves = document.getElementById('meas-sleeves').value.trim() || 'Standard';
      const notes = document.getElementById('meas-notes').value.trim() || 'None';
      const custInfo = customerName ? `\n👤 *Customer:* ${customerName}` : '';

      const measurementMsg = 
`✨ *CUSTOM SIZING & MEASUREMENT FORM* ✨
━━━━━━━━━━━━━━━━━━━━━
🏪 *Store:* ${STORE_CONFIG.brandName}
👗 *Item:* ${currentSelectedProductForCustom}${custInfo}
━━━━━━━━━━━━━━━━━━━━━
📏 *Bust/Chest:* ${bust} inches
📏 *Waist:* ${waist} inches
📏 *Length:* ${length}
✂️ *Sleeve Style:* ${sleeves}
📝 *Custom Notes:* ${notes}
━━━━━━━━━━━━━━━━━━━━━
Please confirm fabric cut and stitch confirmation!`;

      const encoded = encodeURIComponent(measurementMsg);
      const url = `https://wa.me/${STORE_CONFIG.storeWhatsApp}?text=${encoded}`;
      
      window.open(url, '_blank');
      customModal.classList.remove('active');
      measurementForm.reset();
    });
  }
});

// ==========================================================================
// 6. COMPACT FLOATING WHATSAPP DM (BOTTOM RIGHT - DHIVA)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const btnFloatingWA = document.getElementById('btn-floating-whatsapp');
  const waPopup = document.getElementById('whatsapp-popup');
  const btnPopupSend = document.getElementById('btn-popup-send');

  // Update popup link with developer WhatsApp config
  if (btnPopupSend) {
    const devMessage = encodeURIComponent(
      `Hello ${STORE_CONFIG.developerName}! I am visiting the ${STORE_CONFIG.brandName} website and would like to connect!`
    );
    btnPopupSend.href = `https://wa.me/${STORE_CONFIG.developerWhatsApp}?text=${devMessage}`;
  }

  // Update footer "Developed by Dhiva" WhatsApp link
  const devFooterLink = document.getElementById('dev-whatsapp-link');
  if (devFooterLink) {
    const devFooterMessage = encodeURIComponent(
      `Hello ${STORE_CONFIG.developerName}! I saw your work on ${STORE_CONFIG.brandName} website and would like to connect with you!`
    );
    devFooterLink.href = `https://wa.me/${STORE_CONFIG.developerWhatsApp}?text=${devFooterMessage}`;
  }

  // Toggle Popup on button click
  if (btnFloatingWA && waPopup) {
    btnFloatingWA.addEventListener('click', (e) => {
      e.stopPropagation();
      waPopup.classList.toggle('active');
    });

    // Close popup if clicked anywhere else
    document.addEventListener('click', (e) => {
      if (!waPopup.contains(e.target) && e.target !== btnFloatingWA) {
        waPopup.classList.remove('active');
      }
    });
  }
});