/**
 * JAIN ENTERPRISES - Landing Page Interactivity
 * Features: Sticky Header, Scroll Progress, Testimonials Slider,
 * Interactive Category Modals, Form Validation, and WhatsApp Inquiries.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar & Auto-Hiding Smart Sticky Header
  const header = document.querySelector('.site-header');
  const scrollProgress = document.getElementById('scroll-progress');
  let lastScrollTop = 0;
  const scrollDelta = 8;
  const navThreshold = 70;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Progress calculation
    if (scrollHeight > 0 && scrollProgress) {
      const progressPercent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Header scroll state & auto-hide behavior
    if (header) {
      if (scrollTop <= 30) {
        // At the top of the page
        header.classList.remove('scrolled');
        header.classList.remove('header-hidden');
      } else {
        header.classList.add('scrolled');

        // Check scroll direction with threshold
        if (Math.abs(scrollTop - lastScrollTop) > scrollDelta) {
          if (scrollTop > lastScrollTop && scrollTop > navThreshold) {
            // Scrolling DOWN -> Close / hide the navbar
            header.classList.add('header-hidden');
          } else if (scrollTop < lastScrollTop) {
            // Scrolling UP -> Open / reveal the navbar
            header.classList.remove('header-hidden');
          }
        }
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Drawer
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Category Data & Modal
  const categoryData = {
    lights: {
      tag: "Architectural & Interior Lighting",
      title: "Lighting Solutions",
      desc: "Illuminate your interiors and exteriors with energy-efficient, glare-free architectural and designer lights. We offer full turnkey lighting selections for luxury residences, commercial offices, and retail showrooms.",
      variants: ["LED Bulbs & Battens", "COB Spotlights", "Concealed Downlights", "Ultra-slim Panel Lights", "Magnetic Profile Lights", "Surface Cylinder Lights", "Strip & Rope Lights", "Outdoor Flood Lights"],
      brands: "Havells, Jaquar Lighting, Crompton, Orient Electric, Girish"
    },
    geysers: {
      tag: "Water Heating Solutions",
      title: "Instant & Storage Geysers",
      desc: "Engineered for rapid heating, heavy-duty durability, and 5-star energy savings. Available with glass-lined tanks, corrosion-resistant heating elements, and smart digital temperature presets.",
      variants: ["Instant Water Heaters (3L)", "Storage Geysers (10L, 15L, 25L)", "Vertical & Horizontal Mount", "Digital Temperature Display", "Copper / Glassline Element"],
      brands: "Bajaj, Crompton, Havells, Orient"
    },
    fans: {
      tag: "Ventilation & Air Movement",
      title: "Fans & BLDC Solutions",
      desc: "Experience whisper-quiet comfort with India's best BLDC energy-saving ceiling fans, decorative designer fans, heavy-duty wall fans, and high-suction exhaust systems.",
      variants: ["BLDC Energy Saving (65% less power)", "Decorative Wooden / Metallic Finish", "Underlight Remote Ceiling Fans", "High-speed Wall Fans", "Cabin & Table Fans", "Heavy Duty Exhaust Fans"],
      brands: "Atomberg, Crompton, Bajaj, Havells, Orient Electric"
    },
    hardware: {
      tag: "Concealed Infrastructure",
      title: "Electrical Hardware & Pipes",
      desc: "Heavy-duty, fire-retardant electrical plumbing and structural hardware designed for lasting safety. Trusted by contractors, builders, and electricians for new residential and industrial construction.",
      variants: ["Heavy PVC Conduits (20mm, 25mm, 32mm)", "Flexible Conduits & Bends", "MS Metal Concealed Boxes", "PVC Modular Gang Boxes", "Casing Capping Channels", "Full Saddle & Fitting Accessories"],
      brands: "JPPL, Girish, Finolex, Goldmedal"
    },
    accessories: {
      tag: "Designer Modular Finishes",
      title: "Modular Switches & Accessories",
      desc: "Elevate your walls with aesthetic modular switch plates, glass finishes, smart touch automation, and heavy-duty socket connections built for flawless longevity.",
      variants: ["Modular Switch Plates (1M to 18M)", "Glass & Matte Finish Plates", "Smart Touch & Wi-Fi Switches", "Power Sockets (6A, 16A, 25A)", "USB Charging Ports & Dimmers", "Multi-plug Adaptors & Holders"],
      brands: "Goldmedal, Havells, REO, Honeywell, Lauritz Knudsen"
    },
    wires: {
      tag: "Safety & Transmission",
      title: "Wires & Industrial Cables",
      desc: "100% pure electrolytic high-conductivity copper wires with flame retardant (FR / FRLS-H / Halogen Free) PVC insulation for total electrical fire protection.",
      variants: ["FR / FRLS House Wiring (0.75 to 6.0 sq mm)", "Submersible Flat Cables", "Multi-core Flexible Cables", "Telephone & Cat6 LAN Cables", "CCTV & Coaxial Cables", "Industrial Armoured Cables"],
      brands: "Finolex, KEI Wires & Cables, Havells, Polycab"
    }
  };

  const modalOverlay = document.getElementById('category-modal');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalVariants = document.getElementById('modal-variants');
  const modalBrands = document.getElementById('modal-brands');
  const modalClose = document.getElementById('modal-close');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');

  const openCategoryModal = (catKey) => {
    const data = categoryData[catKey];
    if (!data || !modalOverlay) return;

    if (modalTag) modalTag.textContent = data.tag;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalBrands) modalBrands.textContent = `Available Brands: ${data.brands}`;

    if (modalVariants) {
      modalVariants.innerHTML = '';
      data.variants.forEach(variant => {
        const badge = document.createElement('span');
        badge.className = 'modal-variant-badge';
        badge.textContent = `✓ ${variant}`;
        modalVariants.appendChild(badge);
      });
    }

    if (modalWhatsappBtn) {
      const message = encodeURIComponent(`Hello Jain Enterprises, I am interested in knowing more about your ${data.title} products.`);
      modalWhatsappBtn.href = `https://wa.me/916378800224?text=${message}`;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCategoryModal = () => {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach click listeners to cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const catKey = card.getAttribute('data-category');
      if (catKey) {
        openCategoryModal(catKey);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeCategoryModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeCategoryModal();
    });
  }

  // 4. Testimonials Slider
  const reviews = [
    {
      name: "Abhijith Reghu",
      role: "3 reviews • Verified Google Review",
      avatar: "images/avatar-abhijith.png",
      text: "Genuine shop with reasonable prices on everything, you don't even have to bargain. Happy with the customer service. 😄"
    },
    {
      name: "Pari Jain",
      role: "5 reviews • Verified Google Review",
      avatar: "images/avatar-pari.png",
      text: "Best services and amazing work."
    },
    {
      name: "Shreya Jain",
      role: "5 reviews • Verified Google Review",
      avatar: "images/avatar-shreya.png",
      text: "Best service and the quality of the products is excellent."
    }
  ];

  let currentReviewIndex = 0;
  const reviewsTrack = document.getElementById('reviews-track');
  const prevBtn = document.getElementById('review-prev');
  const nextBtn = document.getElementById('review-next');

  const renderReviews = () => {
    if (!reviewsTrack) return;
    reviewsTrack.style.opacity = '0';

    setTimeout(() => {
      reviewsTrack.innerHTML = '';
      // Show 3 cards starting from currentReviewIndex
      for (let i = 0; i < 3; i++) {
        const item = reviews[(currentReviewIndex + i) % reviews.length];
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
          <div>
            <div class="review-quote-icon">“</div>
            <div class="review-stars">★★★★★</div>
            <p class="review-text">${item.text}</p>
          </div>
          <div class="reviewer-meta">
            <img src="${item.avatar}" alt="${item.name}" class="reviewer-avatar" loading="lazy" />
            <div>
              <div class="reviewer-name">${item.name}</div>
              <div class="reviewer-role">${item.role}</div>
            </div>
          </div>
        `;
        reviewsTrack.appendChild(card);
      }
      reviewsTrack.style.opacity = '1';
    }, 200);
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
      renderReviews();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
      renderReviews();
    });
  }

  // Auto advance reviews every 6 seconds
  let reviewInterval = setInterval(() => {
    if (nextBtn) nextBtn.click();
  }, 6000);

  if (reviewsTrack) {
    reviewsTrack.addEventListener('mouseenter', () => clearInterval(reviewInterval));
    reviewsTrack.addEventListener('mouseleave', () => {
      reviewInterval = setInterval(() => {
        if (nextBtn) nextBtn.click();
      }, 6000);
    });
  }

  // 5. Contact Form Submission with Google Sheet & WhatsApp integration
  const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycby3ArfWsG-24hHX41bpsIXvTALQ1bOk8Np61pNh6oFnbbdMNvQCeyfVtO7DTJFV1OtO7Q/exec';
  const contactForm = document.getElementById('contact-form');
  const formSuccessBanner = document.getElementById('form-success-banner');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim() || 'Not provided';
      const category = document.getElementById('form-category')?.value || 'General Inquiry';
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !phone || !message) {
        alert('Please fill in your Name, Phone Number, and Message.');
        return;
      }

      const submitBtn = contactForm.querySelector('.btn-form-submit');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span><span>&rarr;</span>';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Saving details...</span>';
      }

      // 1. Post lead data to Google Sheet via Google Apps Script
      if (GOOGLE_SHEET_WEBAPP_URL) {
        try {
          const params = new URLSearchParams({
            name: name,
            phone: phone,
            email: email,
            category: category,
            message: message
          });

          await fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
          });
        } catch (sheetErr) {
          console.warn('Google Sheet log warning:', sheetErr);
        }
      }

      // 2. Compose WhatsApp inquiry for direct messaging
      const fullText = `*New Website Inquiry - Jain Enterprises*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📧 *Email:* ${email}\n` +
        `📦 *Category:* ${category}\n` +
        `💬 *Message:* ${message}`;

      const waUrl = `https://wa.me/916378800224?text=${encodeURIComponent(fullText)}`;

      // 3. Show clean in-page confirmation
      if (formSuccessBanner) {
        const safeName = document.createElement('div');
        safeName.textContent = name;
        formSuccessBanner.innerHTML = `✓ Thank you, <strong>${safeName.innerHTML}</strong>! Your inquiry details have been saved. Opening WhatsApp to connect directly with our sales team...`;
        formSuccessBanner.style.display = 'block';
        formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // 4. Reset form & restore button
      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }

      // 5. Automatically open WhatsApp in new tab for direct resolution
      window.open(waUrl, '_blank');
    });
  }

  // 5b. Log Direct WhatsApp Floating Button Clicks to Google Sheet
  const floatingWaBtn = document.querySelector('.floating-whatsapp-btn');
  if (floatingWaBtn) {
    let lastWaClick = 0;
    floatingWaBtn.addEventListener('click', () => {
      const now = Date.now();
      if (now - lastWaClick < 10000) return; // Prevent duplicate row within 10s
      lastWaClick = now;

      if (GOOGLE_SHEET_WEBAPP_URL) {
        try {
          const params = new URLSearchParams({
            name: 'Direct WhatsApp Visitor',
            phone: 'Incoming on WhatsApp (+91 63788 00224)',
            email: 'Direct WhatsApp Chat',
            category: 'Floating WhatsApp Button',
            message: 'Customer clicked floating WhatsApp button to start direct conversation.'
          });

          fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: 'POST',
            mode: 'no-cors',
            keepalive: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
          }).catch(() => {});
        } catch (e) {
          // ignore tracking failure
        }
      }
    });
  }

  // 6. Light Bulb Day / Night Mode Toggle
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const logoImgs = document.querySelectorAll('.brand-logo-img');

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtns.forEach(btn => {
        const label = btn.querySelector('.bulb-label-text');
        if (label) label.textContent = 'Day';
        btn.setAttribute('title', 'Switch to Day Mode (Turn Lights Off)');
        btn.setAttribute('aria-label', 'Switch to Day Mode');
      });
      logoImgs.forEach(img => {
        img.src = 'brand/logoimage-night.png';
      });
      localStorage.setItem('je_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtns.forEach(btn => {
        const label = btn.querySelector('.bulb-label-text');
        if (label) label.textContent = 'Night';
        btn.setAttribute('title', 'Switch to Night Mode (Turn Lights On)');
        btn.setAttribute('aria-label', 'Switch to Night Mode');
      });
      logoImgs.forEach(img => {
        img.src = 'brand/logoimage.png';
      });
      localStorage.setItem('je_theme', 'light');
    }
  };

  // Check saved theme
  const savedTheme = localStorage.getItem('je_theme') || 'light';
  applyTheme(savedTheme);

  // Bind click handlers to bulb buttons
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  });

  // Keyboard navigation for modals (Escape key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCategoryModal();
      closeDrawer();
    }
  });
});
