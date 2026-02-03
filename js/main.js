/**
 * SEOPUNG Main JavaScript
 * Core functionality and utilities
 */

(function() {
    'use strict';

    // ========================================
    // DOM Ready
    // ========================================

    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
        initCounterAnimations();
        initSmoothScroll();
    });

    // ========================================
    // Scroll Animations (IntersectionObserver)
    // ========================================

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-scale-in');

        if (!animatedElements.length) return;

        // 먼저 모든 요소를 숨김 상태로 설정
        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // 인라인 스타일 제거하고 visible 클래스 추가
                    el.style.opacity = '';
                    el.style.transform = '';

                    // Add visible class based on animation type
                    if (el.classList.contains('animate-on-scroll')) {
                        el.classList.add('animate-on-scroll--visible');
                    }
                    if (el.classList.contains('animate-fade-up')) {
                        el.classList.add('animate-fade-up--visible');
                    }
                    if (el.classList.contains('animate-fade-left')) {
                        el.classList.add('animate-fade-left--visible');
                    }
                    if (el.classList.contains('animate-fade-right')) {
                        el.classList.add('animate-fade-right--visible');
                    }
                    if (el.classList.contains('animate-scale-in')) {
                        el.classList.add('animate-scale-in--visible');
                    }

                    // Trigger counter animation if element contains counters
                    const counters = el.querySelectorAll('[data-count]');
                    counters.forEach(function(counter) {
                        if (!counter.classList.contains('counter--counted')) {
                            animateCounter(counter);
                        }
                    });

                    // Check if element itself is a counter
                    if (el.hasAttribute('data-count') && !el.classList.contains('counter--counted')) {
                        animateCounter(el);
                    }

                    // 관찰 중단 (한번만 애니메이션)
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ========================================
    // Counter Animation
    // ========================================

    function initCounterAnimations() {
        // Initial animation for hero stats (visible on page load)
        setTimeout(function() {
            const heroCounters = document.querySelectorAll('.hero__stat-number[data-count]');
            heroCounters.forEach(function(counter) {
                if (!counter.classList.contains('counter--counted')) {
                    animateCounter(counter);
                }
            });
        }, 500);
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'), 10);
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        element.classList.add('counter--counted');

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ========================================
    // Utility Functions
    // ========================================

    // Debounce function
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Throttle function
    window.throttle = function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    };

})();
