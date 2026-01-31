// script.js - Personal Portfolio Website - JavaScript Implementation

console.log("Portfolio JavaScript loaded successfully!");

// ================ DOM ELEMENTS ================
const elements = {
    // Navigation
    navLinks: document.querySelectorAll('nav a'),
    
    // Contact Form
    contactForm: document.querySelector('#contact form'),
    nameInput: document.querySelector('#name'),
    emailInput: document.querySelector('#email'),
    subjectSelect: document.querySelector('#subject'),
    messageTextarea: document.querySelector('#message'),
    submitBtn: document.querySelector('#contact button[type="submit"]'),
    
    // Theme Toggle
    themeToggleBtn: null,
    
    // Back to Top
    backToTopBtn: document.querySelector('footer a[href="#top"]'),
    
    // Skill Progress
    skillLevels: document.querySelectorAll('#skills table td:nth-child(2)'),
    
    // Project Gallery
    projectArticles: document.querySelectorAll('#projects article'),
    
    // Social Links
    socialLinks: document.querySelectorAll('#contact ul a'),
    
    // Validation Messages Container
    validationMessages: null
};

// ================ FORM VALIDATION ================
function createValidationMessagesContainer() {
    const container = document.createElement('div');
    container.id = 'validation-messages';
    container.style.cssText = 'margin-top: 1rem; padding: 1rem; border-radius: 5px; display: none;';
    elements.contactForm.appendChild(container);
    elements.validationMessages = container;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(event) {
    if (event) event.preventDefault();
    
    let isValid = true;
    const messages = [];
    
    // Name validation
    if (!elements.nameInput.value.trim()) {
        isValid = false;
        messages.push('⚠️ Please enter your full name.');
        elements.nameInput.classList.add('error');
        elements.nameInput.classList.remove('success');
    } else {
        elements.nameInput.classList.remove('error');
        elements.nameInput.classList.add('success');
    }
    
    // Email validation
    if (!elements.emailInput.value.trim()) {
        isValid = false;
        messages.push('⚠️ Please enter your email address.');
        elements.emailInput.classList.add('error');
        elements.emailInput.classList.remove('success');
    } else if (!validateEmail(elements.emailInput.value)) {
        isValid = false;
        messages.push('⚠️ Please enter a valid email address.');
        elements.emailInput.classList.add('error');
        elements.emailInput.classList.remove('success');
    } else {
        elements.emailInput.classList.remove('error');
        elements.emailInput.classList.add('success');
    }
    
    // Subject validation
    if (!elements.subjectSelect.value) {
        isValid = false;
        messages.push('⚠️ Please select a subject.');
        elements.subjectSelect.classList.add('error');
        elements.subjectSelect.classList.remove('success');
    } else {
        elements.subjectSelect.classList.remove('error');
        elements.subjectSelect.classList.add('success');
    }
    
    // Message validation
    if (!elements.messageTextarea.value.trim()) {
        isValid = false;
        messages.push('⚠️ Please enter your message.');
        elements.messageTextarea.classList.add('error');
        elements.messageTextarea.classList.remove('success');
    } else if (elements.messageTextarea.value.trim().length < 10) {
        isValid = false;
        messages.push('⚠️ Message must be at least 10 characters long.');
        elements.messageTextarea.classList.add('error');
        elements.messageTextarea.classList.remove('success');
    } else {
        elements.messageTextarea.classList.remove('error');
        elements.messageTextarea.classList.add('success');
    }
    
    // Show validation messages
    if (messages.length > 0) {
        elements.validationMessages.innerHTML = messages.join('<br>');
        elements.validationMessages.style.display = 'block';
        elements.validationMessages.className = 'error-message';
    } else {
        elements.validationMessages.style.display = 'none';
    }
    
    // If valid, show success message and reset form
    if (isValid) {
        showSuccessMessage();
        return true;
    }
    
    return false;
}

function showSuccessMessage() {
    const originalText = elements.submitBtn.textContent;
    const originalBg = elements.submitBtn.style.backgroundColor;
    
    // Change button to show success
    elements.submitBtn.textContent = '✓ Message Sent!';
    elements.submitBtn.classList.add('success-btn');
    elements.submitBtn.disabled = true;
    
    // Show success message
    elements.validationMessages.innerHTML = '✅ Thank you! Your message has been sent successfully.';
    elements.validationMessages.style.display = 'block';
    elements.validationMessages.className = 'success-message';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        if (elements.contactForm) {
            elements.contactForm.reset();
        }
        elements.submitBtn.textContent = originalText;
        elements.submitBtn.classList.remove('success-btn');
        elements.submitBtn.disabled = false;
        elements.validationMessages.style.display = 'none';
        
        // Reset input classes
        [elements.nameInput, elements.emailInput, elements.subjectSelect, elements.messageTextarea].forEach(el => {
            if (el) {
                el.classList.remove('error', 'success');
            }
        });
    }, 3000);
}

// ================ DARK MODE TOGGLE ================
function createThemeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.innerHTML = '🌙 Dark Mode';
    toggleBtn.setAttribute('aria-label', 'Toggle dark/light mode');
    
    document.body.appendChild(toggleBtn);
    elements.themeToggleBtn = toggleBtn;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    elements.themeToggleBtn.innerHTML = '☀️ Light Mode';
    localStorage.setItem('portfolio-theme', 'dark');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    elements.themeToggleBtn.innerHTML = '🌙 Dark Mode';
    localStorage.setItem('portfolio-theme', 'light');
}

function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// ================ SMOOTH SCROLLING ================
function initSmoothScroll() {
    elements.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const header = document.querySelector('header');
                    if (header && window.innerWidth <= 768) {
                        header.classList.remove('menu-open');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Back to top button
    if (elements.backToTopBtn) {
        elements.backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ================ SKILL LEVEL VISUALIZATION ================
function visualizeSkillLevels() {
    elements.skillLevels.forEach(cell => {
        const level = cell.textContent.toLowerCase();
        let className = '';
        
        switch(level) {
            case 'advanced':
                className = 'skill-advanced';
                break;
            case 'intermediate':
                className = 'skill-intermediate';
                break;
            case 'beginner':
                className = 'skill-beginner';
                break;
            default:
                className = 'skill-default';
        }
        
        cell.classList.add(className);
    });
}

// ================ PROJECT GALLERY ================
function createProjectGallery() {
    elements.projectArticles.forEach((article, index) => {
        // Add view details button
        const viewBtn = document.createElement('button');
        viewBtn.className = 'view-project-btn';
        viewBtn.textContent = 'View Details';
        viewBtn.setAttribute('aria-label', `View details for project ${index + 1}`);
        
        // Add view count
        const viewCount = document.createElement('span');
        viewCount.className = 'view-count';
        viewCount.textContent = ' 👁️ 0 views';
        
        // Check if we already have these elements to avoid duplicates
        if (!article.querySelector('.view-project-btn')) {
            article.appendChild(viewBtn);
            article.appendChild(viewCount);
        }
        
        // Add click event to view button
        viewBtn.addEventListener('click', function() {
            const countSpan = article.querySelector('.view-count');
            if (countSpan) {
                let currentViews = parseInt(countSpan.textContent.match(/\d+/)?.[0] || 0);
                currentViews++;
                countSpan.textContent = ` 👁️ ${currentViews} views`;
            }
            
            // Show project details
            showProjectDetails(index);
            
            // Animate button
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
        });
        
        // Add hover effect to project cards
        article.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        article.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
}

function showProjectDetails(projectIndex) {
    const projects = [
        {
            title: "Portfolio Website",
            description: "This very website! Built using HTML5 with semantic elements, CSS3 for styling, and JavaScript for interactivity. Features responsive design, form validation, dark mode, and smooth animations.",
            features: ["Semantic HTML5", "Responsive CSS3", "Interactive JavaScript", "Form Validation", "Dark Mode", "Smooth Animations"],
            technologies: ["HTML5", "CSS3", "JavaScript"]
        },
        {
            title: "Recipe Website",
            description: "A comprehensive recipe website featuring ingredient lists, cooking instructions, search functionality, and user ratings. Built with a focus on user experience and accessibility.",
            features: ["Recipe Search", "Ingredient Lists", "Cooking Timer", "User Ratings", "Responsive Design", "Accessibility Features"],
            technologies: ["HTML", "CSS", "JavaScript", "Local Storage"]
        }
    ];
    
    const project = projects[projectIndex];
    if (!project) return;
    
    // Remove existing modal if any
    const existingModal = document.querySelector('.project-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', `Project Details: ${project.title}`);
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" aria-label="Close dialog">&times;</button>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            
            <h4>Features:</h4>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <h4>Technologies:</h4>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    // Trap focus inside modal
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    firstFocusable.focus();
    
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// ================ VISITOR COUNTER ================
function updateVisitorCounter() {
    let visitorCount = localStorage.getItem('portfolio-visitors');
    
    if (!visitorCount) {
        visitorCount = 1;
    } else {
        visitorCount = parseInt(visitorCount) + 1;
    }
    
    localStorage.setItem('portfolio-visitors', visitorCount);
    
    // Display visitor count in footer if not already present
    const footer = document.querySelector('footer');
    if (footer && !document.querySelector('#visitor-counter')) {
        const visitorElement = document.createElement('p');
        visitorElement.id = 'visitor-counter';
        visitorElement.innerHTML = `👥 Visitors: <strong>${visitorCount}</strong>`;
        visitorElement.style.cssText = 'margin-top: 10px; font-size: 0.9rem; color: #7f8c8d;';
        
        const smallElement = footer.querySelector('small');
        if (smallElement) {
            smallElement.parentNode.insertBefore(visitorElement, smallElement);
        }
    }
}

// ================ SOCIAL LINK TRACKING ================
function trackSocialLinks() {
    elements.socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.textContent || new URL(this.href).hostname;
            let clicks = localStorage.getItem(`social-${platform}`) || 0;
            clicks = parseInt(clicks) + 1;
            localStorage.setItem(`social-${platform}`, clicks);
            
            console.log(`${platform} link clicked ${clicks} times`);
        });
    });
}

// ================ REAL-TIME FORM VALIDATION ================
function setupRealTimeValidation() {
    const inputs = [elements.nameInput, elements.emailInput, elements.messageTextarea];
    
    inputs.forEach(input => {
        if (!input) return;
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
            }
        });
        
        input.addEventListener('blur', function() {
            if (this === elements.emailInput && this.value.trim()) {
                if (!validateEmail(this.value)) {
                    this.classList.add('error');
                    this.classList.remove('success');
                    showInlineError(this, 'Please enter a valid email address.');
                } else {
                    clearInlineError(this);
                }
            }
        });
    });
    
    if (elements.subjectSelect) {
        elements.subjectSelect.addEventListener('change', function() {
            if (this.value) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
            }
        });
    }
}

function showInlineError(inputElement, message) {
    let errorElement = inputElement.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('inline-error')) {
        errorElement = document.createElement('div');
        errorElement.className = 'inline-error';
        errorElement.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 5px;';
        inputElement.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearInlineError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('inline-error')) {
        errorElement.remove();
    }
}

// ================ ANIMATIONS ================
function addScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-in');
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ================ YEAR UPDATER ================
function updateFooterYear() {
    const yearElement = document.querySelector('footer small');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
}

// ================ MOBILE MENU ================
function initMobileMenu() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Create mobile menu toggle for small screens
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1001;
        `;
        
        document.querySelector('header').appendChild(menuToggle);
        
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            menuToggle.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('mobile-open');
                menuToggle.innerHTML = '☰';
            }
        });
    }
}

// ================ INITIALIZE EVERYTHING ================
function initializePortfolio() {
    console.log("Initializing portfolio features...");
    
    try {
        // 1. Create validation messages container
        if (elements.contactForm) {
            createValidationMessagesContainer();
        }
        
        // 2. Setup form validation
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', validateForm);
            setupRealTimeValidation();
        }
        
        // 3. Initialize smooth scrolling
        initSmoothScroll();
        
        // 4. Create theme toggle
        createThemeToggle();
        if (elements.themeToggleBtn) {
            elements.themeToggleBtn.addEventListener('click', toggleTheme);
        }
        
        // 5. Visualize skill levels
        if (elements.skillLevels.length > 0) {
            visualizeSkillLevels();
        }
        
        // 6. Create project gallery
        if (elements.projectArticles.length > 0) {
            createProjectGallery();
        }
        
        // 7. Update visitor counter
        updateVisitorCounter();
        
        // 8. Track social links
        if (elements.socialLinks.length > 0) {
            trackSocialLinks();
        }
        
        // 9. Add scroll animations
        addScrollAnimations();
        
        // 10. Add current year to footer
        updateFooterYear();
        
        // 11. Initialize mobile menu
        initMobileMenu();
        
        // 12. Add CSS for additional styles
        addDynamicStyles();
        
        console.log("Portfolio initialized successfully!");
    } catch (error) {
        console.error("Error initializing portfolio:", error);
    }
}

// ================ DYNAMIC STYLES ================
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Form validation styles */
        input.error, select.error, textarea.error {
            border-color: #e74c3c !important;
            background-color: #ffebee;
        }
        
        input.success, select.success, textarea.success {
            border-color: #27ae60 !important;
            background-color: #d5f4e6;
        }
        
        .error-message {
            background-color: #ffebee !important;
            color: #c62828 !important;
            border: 1px solid #ef9a9a !important;
        }
        
        .success-message {
            background-color: #d4edda !important;
            color: #155724 !important;
            border: 1px solid #c3e6cb !important;
        }
        
        .success-btn {
            background-color: #27ae60 !important;
        }
        
        /* Skill level styles */
        .skill-advanced {
            color: #27ae60 !important;
            background-color: #d5f4e6 !important;
            font-weight: bold !important;
            padding: 5px 10px !important;
            border-radius: 15px !important;
            display: inline-block !important;
            margin: 2px !important;
        }
        
        .skill-intermediate {
            color: #f39c12 !important;
            background-color: #fef5e7 !important;
            font-weight: bold !important;
            padding: 5px 10px !important;
            border-radius: 15px !important;
            display: inline-block !important;
            margin: 2px !important;
        }
        
        .skill-beginner {
            color: #e74c3c !important;
            background-color: #fdedec !important;
            font-weight: bold !important;
            padding: 5px 10px !important;
            border-radius: 15px !important;
            display: inline-block !important;
            margin: 2px !important;
        }
        
        .skill-default {
            color: #3498db !important;
            background-color: #ebf5fb !important;
            font-weight: bold !important;
            padding: 5px 10px !important;
            border-radius: 15px !important;
            display: inline-block !important;
            margin: 2px !important;
        }
        
        /* Project card hover */
        article.hovered {
            transform: translateY(-5px) !important;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
            transition: all 0.3s ease !important;
        }
        
        .view-project-btn.clicked {
            transform: scale(0.95) !important;
        }
        
        /* Scroll animations */
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        section.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Theme toggle button */
        #theme-toggle {
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            padding: 10px 15px !important;
            background: #2c3e50 !important;
            color: white !important;
            border: none !important;
            border-radius: 5px !important;
            cursor: pointer !important;
            z-index: 1000 !important;
            font-size: 0.9rem !important;
            transition: all 0.3s ease !important;
        }
        
        .dark-mode #theme-toggle {
            background: #f1c40f !important;
            color: #2c3e50 !important;
        }
        
        /* Project modal */
        .project-modal {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0,0,0,0.8) !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            z-index: 1001 !important;
        }
        
        .project-modal .modal-content {
            background: white !important;
            padding: 30px !important;
            border-radius: 10px !important;
            max-width: 500px !important;
            width: 90% !important;
            max-height: 80vh !important;
            overflow-y: auto !important;
            position: relative !important;
        }
        
        .dark-mode .project-modal .modal-content {
            background: #16213e !important;
            color: #e6e6e6 !important;
        }
        
        .project-modal .close-modal {
            position: absolute !important;
            top: 15px !important;
            right: 15px !important;
            font-size: 24px !important;
            cursor: pointer !important;
            color: #7f8c8d !important;
            background: none !important;
            border: none !important;
        }
        
        .project-modal .tech-tag {
            display: inline-block !important;
            background: #3498db !important;
            color: white !important;
            padding: 4px 10px !important;
            border-radius: 15px !important;
            margin: 5px !important;
            font-size: 0.9rem !important;
        }
        
        /* Mobile menu */
        @media (max-width: 768px) {
            nav ul {
                flex-direction: column !important;
                gap: 0.8rem !important;
                max-height: 0 !important;
                overflow: hidden !important;
                transition: max-height 0.3s ease !important;
            }
            
            nav.mobile-open ul {
                max-height: 500px !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ================ DOCUMENT READY ================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// ================ WINDOW RESIZE HANDLER ================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-initialize mobile menu on resize
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (menuToggle && window.innerWidth > 768) {
            menuToggle.remove();
            document.querySelector('nav').classList.remove('mobile-open');
        } else if (!menuToggle && window.innerWidth <= 768) {
            initMobileMenu();
        }
    }, 250);
});

// ================ ERROR HANDLING ================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});