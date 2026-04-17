// Smooth hover animation effect for both the hero card and service cards
document.querySelectorAll(".hero-card, .service").forEach(card => {
  card.addEventListener("mouseenter", () => {
    // Upgraded shadow to match the dark theme better
    card.style.boxShadow = "0 10px 30px rgba(41, 151, 255, 0.15)"; 
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
  });
});

// Button click animation
document.querySelectorAll(".btn, .btn-outline").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);
  });
});

// ==========================================
// MODAL (POPUP) LOGIC
// ==========================================
const serviceCards = document.querySelectorAll('.service[data-modal]');
const closeButtons = document.querySelectorAll('.modal-close');
const overlays = document.querySelectorAll('.modal-overlay');

// Open modal when clicking a service card
serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal');
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevents background scrolling
    }
  });
});

// Close modal when clicking the 'X' button
closeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restores background scrolling
  });
});

// Close modal when clicking on the blurred dark background
overlays.forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

// ==========================================
// MOBILE MENU LOGIC
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('#nav-menu a');

// Toggle menu open/close
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  
  // Animate the icon from a Hamburger (☰) to an X (✕)
  if (navMenu.classList.contains('open')) {
    hamburger.innerHTML = '&#10005;'; 
  } else {
    hamburger.innerHTML = '&#9776;'; 
  }
});

// Automatically close the mobile menu when a user taps a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.innerHTML = '&#9776;';
  });
});

// ==========================================
// VERTICAL MARQUEE AUTO-SCROLL + MANUAL SCROLL
// ==========================================
const marqueeContainer = document.querySelector('.vertical-marquee-container');
const marqueeTrack = document.querySelector('.vertical-marquee-track');

if (marqueeContainer && marqueeTrack) {
  let isPaused = false;
  let scrollPos = 0;
  const speed = 0.5; // Adjust this number to make it scroll faster or slower

  function autoScroll() {
    if (!isPaused) {
      // Move the scroll position down slowly
      scrollPos += speed;
      
      // If we scroll past the halfway point (end of Set 1), seamlessly snap back to the top
      if (scrollPos >= marqueeTrack.scrollHeight / 2) {
        scrollPos = 0;
      }
      
      // Apply the position to the container
      marqueeContainer.scrollTop = scrollPos;
    } else {
      // If paused (user is hovering/scrolling manually), keep our tracker synced with their manual scrolls!
      scrollPos = marqueeContainer.scrollTop;
    }
    
    // Request the next frame for a buttery smooth animation
    requestAnimationFrame(autoScroll);
  }

  // Pause when the user hovers (Desktop) or touches (Mobile)
  marqueeContainer.addEventListener('mouseenter', () => isPaused = true);
  marqueeContainer.addEventListener('mouseleave', () => isPaused = false);
  
  marqueeContainer.addEventListener('touchstart', () => isPaused = true);
  marqueeContainer.addEventListener('touchend', () => {
    // Wait 1 second after they stop touching before resuming auto-scroll
    setTimeout(() => isPaused = false, 1000); 
  });

  // Start the engine!
  autoScroll();
}