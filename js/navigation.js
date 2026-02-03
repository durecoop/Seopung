/**
 * SEOPUNG Navigation JavaScript
 * Mobile menu toggle and scroll effects
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================

    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    // ========================================
    // Mobile Back Button
    // ========================================

    function initMobileBackButton() {
        // Only on mobile
        if (window.innerWidth > 768) return;

        // Don't show on home page
        const isHomePage = window.location.pathname === '/' ||
                          window.location.pathname.endsWith('index.html') ||
                          window.location.pathname.endsWith('/Seopung/');

        if (isHomePage) return;

        // Create back button
        const backBtn = document.createElement('button');
        backBtn.className = 'mobile-back-btn';
        backBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        `;
        backBtn.setAttribute('aria-label', '뒤로가기');

        // Insert into header
        const headerContainer = document.querySelector('.header__container');
        if (headerContainer) {
            headerContainer.insertBefore(backBtn, headerContainer.firstChild);
        }

        // Back button click handler
        backBtn.addEventListener('click', function() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback to home
                window.location.href = getHomePath();
            }
        });
    }

    function getHomePath() {
        const path = window.location.pathname;
        if (path.includes('/board/') || path.includes('/admin/')) {
            return '../index.html';
        }
        return 'index.html';
    }

    // ========================================
    // Mobile Menu Toggle
    // ========================================

    function toggleMobileMenu() {
        if (!navToggle || !navList) return;

        function openMenu() {
            navList.classList.add('nav__list--open');
            navToggle.classList.add('nav__toggle--active');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            navList.classList.remove('nav__list--open');
            navToggle.classList.remove('nav__toggle--active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = navList.classList.contains('nav__list--open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on a link
        navList.querySelectorAll('.nav__link').forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }

    // ========================================
    // Scroll Header Effect
    // ========================================

    function initScrollHeader() {
        if (!header) return;

        const scrollThreshold = 50;

        function handleScroll() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }

        // Use throttle for better performance
        window.addEventListener('scroll', window.throttle ? window.throttle(handleScroll, 100) : handleScroll);

        // Initial check
        handleScroll();
    }

    // ========================================
    // Initialize
    // ========================================

    document.addEventListener('DOMContentLoaded', function() {
        toggleMobileMenu();
        initScrollHeader();
        initMobileBackButton();
    });

    // Re-check on resize
    window.addEventListener('resize', function() {
        const existingBtn = document.querySelector('.mobile-back-btn');
        if (window.innerWidth > 768 && existingBtn) {
            existingBtn.remove();
        } else if (window.innerWidth <= 768 && !existingBtn) {
            initMobileBackButton();
        }
    });

})();
