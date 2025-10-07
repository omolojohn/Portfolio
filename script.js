document.addEventListener("DOMContentLoaded", function () {
    // Active nav link + aria-current
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Smooth internal anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                const top = Math.max(0, targetElement.offsetTop - 50);
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

    // Dark mode toggle logic (persisted)
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    function setDarkMode(on) {
        document.documentElement.classList.toggle('dark', on);
        try { localStorage.setItem('darkMode', on ? '1' : '0'); } catch (e) {}
        if (darkModeIcon) darkModeIcon.textContent = on ? '☀️' : '🌙';
    }
    setDarkMode((() => { try { return localStorage.getItem('darkMode') === '1'; } catch (e) { return false; } })());
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => setDarkMode(!document.documentElement.classList.contains('dark')));
    }

    // Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
    }

    // Mobile menu toggle
    const menuButton = document.getElementById('menuButton');
    const menuLinks = document.getElementById('menuLinks');
    if (menuButton && menuLinks) {
        menuButton.addEventListener('click', () => {
            const expanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!expanded));
            if (menuLinks.classList.contains('hidden')) {
                menuLinks.classList.remove('hidden');
                menuLinks.classList.add('flex', 'flex-col', 'space-y-4', 'mt-4', 'md:mt-0', 'md:flex', 'md:flex-row', 'md:space-y-0', 'md:space-x-6');
            } else {
                menuLinks.classList.add('hidden');
            }
        });
    }

    // Reveal animations for sections
    function revealOnScroll() {
        document.querySelectorAll('.fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Scroll to top button
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        const toggleScrollTop = () => {
            if (window.scrollY > 200) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };
        window.addEventListener("scroll", toggleScrollTop);
        toggleScrollTop();
        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Profile photo multi-extension support (webp first)
    function setProfilePhoto(imgId) {
        const exts = ["webp", "jpg", "jpeg", "png"];
        const base = "assets/profile.";
        const placeholder = "https://ui-avatars.com/api/?name=John+Oyoo+Omolo&background=0D8ABC&color=fff&size=128";
        const img = document.getElementById(imgId);
        if (!img) return;
        let i = 0;
        function tryNext() {
            if (i >= exts.length) {
                img.src = placeholder;
                return;
            }
            const testSrc = base + exts[i];
            const testImg = new window.Image();
            testImg.onload = function () { img.src = testSrc; };
            testImg.onerror = function () { i++; tryNext(); };
            testImg.src = testSrc;
        }
        tryNext();
    }
    ["profilePhoto", "profilePhotoAbout", "profilePhotoNavbar"].forEach(setProfilePhoto);

    // Contact form demo handling (if present)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const feedback = document.getElementById('formFeedback');
            if (feedback) {
                feedback.textContent = 'Thank you for your message! (This is a demo.)';
                feedback.className = 'block mt-2 text-green-600 dark:text-green-400 text-center';
            }
            contactForm.reset();
        });
    }
});
