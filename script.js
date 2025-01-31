// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');

    // Toggle body scroll
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';

    // Apply mobile-specific styles
    if (window.innerWidth <= 768) {
        navMenu.style.backgroundColor = '#65B3CD';
        navMenu.style.marginTop = '18px';

        } else {
        navMenu.style.backgroundColor = ''; // Reset background color for desktop
        navMenu.style.marginTop = ''; // Reset margin for desktop
    }

    // Close menu when clicking outside
    if (navMenu.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
});

// Function to close menu when clicking outside
function closeMenuOnClickOutside(event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Reset menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navMenu.style.backgroundColor = '';
        navMenu.style.marginTop = '';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Smooth Scrolling
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    navMenu.classList.remove('active'); // Close menu on mobile after clicking a link
  });
});

// Get the modal and popup elements
const projectPopup = document.getElementById('project-popup');
const popupImage = document.getElementById('popup-image');
const popupTitle = document.getElementById('popup-title');
const popupDescription = document.getElementById('popup-description');
const closePopup = document.querySelector('.close-popup');

// Function to open the modal with project details
function openProjectPopup(title, description, imageSrc) {
  popupImage.src = imageSrc; // Set the project image
  popupTitle.textContent = title; // Set the project title
  popupDescription.textContent = description; // Set the project description
  projectPopup.style.display = 'flex'; // Show the modal
}

// Function to close the modal
function closeProjectPopup() {
  projectPopup.style.display = 'none'; // Hide the modal
}

// Add click event listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    const title = card.getAttribute('data-project-title');
    const description = card.getAttribute('data-project-description');
    const imageSrc = card.getAttribute('data-project-image');
    openProjectPopup(title, description, imageSrc);
  });
});

// Close modal when clicking the close button
closePopup.addEventListener('click', closeProjectPopup);

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === projectPopup) {
    closeProjectPopup();
  }
});

// Skills Dropdown
const skillHeaders = document.querySelectorAll('.skill-header');

skillHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const skillDetail = header.nextElementSibling;
    const chevron = header.querySelector('.fa-chevron-down');

    skillDetail.classList.toggle('active');
    chevron.classList.toggle('fa-chevron-up');

    // Close other skill details
    document.querySelectorAll('.skill-detail').forEach(detail => {
      if (detail !== skillDetail && detail.classList.contains('active')) {
        detail.classList.remove('active');
        detail.previousElementSibling.querySelector('.fa-chevron-down').classList.remove('fa-chevron-up');
      }
    });
  });
});


// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  const firstName = document.getElementById('firstname').value.trim();
  const lastName = document.getElementById('lastname').value.trim();
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    alert('Please fill out all required fields.');
    return;
  }

  // Simulate form submission
  console.log(`Name: ${firstName} ${lastName}, Email: ${email}, Company: ${company}, Message: ${message}`);
  successMessage.textContent = 'Thank you! Your message has been sent successfully!';
  successMessage.style.display = 'block';
  contactForm.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);
});

// Add a CTA under hobbies section
const hobbiesSection = document.querySelector('.hobbies');
if (hobbiesSection) {
    const cta = document.createElement('div');
    cta.innerHTML = `<p>Do any of these hobbies interest you too? <a href="https://www.instagram.com/lindale_vn/?hl=en" target="_blank" style="text-decoration: underline; color: #007bff;">Follow my Instagram!</a></p>`;
    cta.style.marginBottom= '10px';
    cta.style.textAlign = 'center';
    cta.style.fontWeight = 'bold'
    hobbiesSection.appendChild(cta);
}  

// Back to Top Arrow
const toTop = document.getElementById('to-top');
const homeSection = document.getElementById('home');

toTop.addEventListener('click', () => {
  if (window.scrollY === 0) {
    // Scroll to bottom if at the top
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  } else {
    // Scroll to top if not at the top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

// Update arrow icon based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    toTop.innerHTML = '<i class="fa-solid fa-arrow-down"></i>'; // Show down arrow
  } else {
    toTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>'; // Show up arrow
  }
});
