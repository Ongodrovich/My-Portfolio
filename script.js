document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const mobileNav = document.getElementById('mobileNav');
  const navBtns = document.querySelectorAll('.nav-btn, .nav-btn-mobile');
  const pageBg = document.getElementById('pageBg');

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  // Close mobile menu when nav item clicked
  document.querySelectorAll('.nav-btn-mobile').forEach(btn => {
    btn.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });

  // Navigation section scrolling
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.getAttribute('data-section');
      const element = document.getElementById(section);
      
      if (element) {
        // Update active state
        document.querySelectorAll('.nav-btn, .nav-btn-mobile').forEach(b => {
          b.classList.remove('active');
        });
        document.querySelectorAll(`[data-section="${section}"]`).forEach(b => {
          b.classList.add('active');
        });

        // Smooth scroll
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Parallax background on mouse move
  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 15;
    const cy = (e.clientY / window.innerHeight - 0.5) * 15;
    if (pageBg) {
      pageBg.style.transform = `translate(${cx}px, ${cy}px)`;
    }
  });

  // Animate skill bars on scroll
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('[style*="width"]');
        bars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe skill/language sections
  document.querySelectorAll('#skills, #languages').forEach(section => {
    observer.observe(section);
  });

  // Update active nav on scroll
  window.addEventListener('scroll', () => {
    const sections = ['hero', 'skills', 'portfolio', 'education', 'languages'];
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          navBtns.forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(btn => {
            btn.classList.add('active');
          });
        }
      }
    });
  });

  // Keyboard accessibility
  navBtns.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

// Handle contact form submission
async function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const initialBtnText = submitBtn.textContent;

  // Disable submit button during submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Clear previous status messages
  formStatus.classList.remove('success', 'error');
  formStatus.textContent = '';

  try {
    // Prepare form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Validate data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw new Error('Please fill out all fields');
    }

    // Send to backend API (running on port 8000)
    const response = await fetch('http://localhost:8000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Server error: ${response.status}`);
    }

    // Success
    formStatus.classList.add('success');
    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you within 24 hours.';
    
    // Reset form
    form.reset();
    submitBtn.textContent = initialBtnText;
    submitBtn.disabled = false;

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      formStatus.classList.remove('success');
      formStatus.textContent = '';
    }, 5000);

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Show error message
    formStatus.classList.add('error');
    
    // Check if it's a connection error (backend not running)
    if (error.message.includes('Failed to fetch') || error.message.includes('fetch')) {
      formStatus.textContent = '⚠ Unable to connect to the server. Please try again or email me directly at cosmasongodeonlinejobs@gmail.com';
    } else {
      formStatus.textContent = `✗ Error: ${error.message}`;
    }

    submitBtn.textContent = initialBtnText;
    submitBtn.disabled = false;
  }
}

// Download CV function
function downloadCV() {
  // Update this with your actual CV file path
  const cvPath = 'assets/Cosmas_Ongode_CV (1).pdf'; // Matches the file in the assets folder
  const link = document.createElement('a');
  link.href = cvPath;
  link.download = 'Cosmas-Ongode-CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

