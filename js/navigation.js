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
    });

})();
