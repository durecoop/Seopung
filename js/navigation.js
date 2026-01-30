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
    // Mobile Menu Toggle
    // ========================================

    function toggleMobileMenu() {
        if (!navToggle || !navList) return;

        navToggle.addEventListener('click', function() {
            navList.classList.toggle('nav__list--open');
            navToggle.classList.toggle('nav__toggle--active');

            // Update ARIA attributes
            const isOpen = navList.classList.contains('nav__list--open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking on a link
        navList.querySelectorAll('.nav__link').forEach(function(link) {
            link.addEventListener('click', function() {
                navList.classList.remove('nav__list--open');
                navToggle.classList.remove('nav__toggle--active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('nav__list--open');
                navToggle.classList.remove('nav__toggle--active');
                navToggle.setAttribute('aria-expanded', 'false');
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
    });

})();
