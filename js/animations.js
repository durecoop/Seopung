/**
 * SEOPUNG Additional Animations
 * Page-specific animations and interactions
 */

(function() {
    'use strict';

    // ========================================
    // Product Tab Filtering
    // ========================================

    function initProductTabs() {
        const tabs = document.querySelectorAll('[data-tab]');
        const products = document.querySelectorAll('[data-category]');

        if (!tabs.length || !products.length) return;

        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                // Update active tab
                tabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');

                // Filter products
                const category = this.getAttribute('data-tab');

                products.forEach(function(product) {
                    if (category === 'all' || product.getAttribute('data-category') === category) {
                        product.style.display = 'block';
                        product.classList.add('animate-on-scroll--visible');
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========================================
    // Gallery Filter
    // ========================================

    function initGalleryFilter() {
        const tabs = document.querySelectorAll('[data-filter-tab]');
        const items = document.querySelectorAll('[data-filter]');

        if (!tabs.length || !items.length) return;

        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                // Update active tab
                tabs.forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');

                // Filter items
                const filter = this.getAttribute('data-filter-tab');

                items.forEach(function(item) {
                    if (filter === 'all' || item.getAttribute('data-filter') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========================================
    // Lightbox
    // ========================================

    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox__close');

        if (!lightbox) return;

        // Open lightbox
        document.querySelectorAll('[data-lightbox]').forEach(function(item) {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img && lightboxImg) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.classList.add('lightbox--active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('lightbox--active');
            document.body.style.overflow = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('lightbox--active')) {
                closeLightbox();
            }
        });
    }

    // ========================================
    // FAQ Accordion
    // ========================================

    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq__item');

        if (!faqItems.length) return;

        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq__question');

            if (question) {
                question.addEventListener('click', function() {
                    // Close other items
                    faqItems.forEach(function(otherItem) {
                        if (otherItem !== item) {
                            otherItem.classList.remove('faq__item--active');
                        }
                    });

                    // Toggle current item
                    item.classList.toggle('faq__item--active');
                });
            }
        });
    }

    // ========================================
    // Form Handling
    // ========================================

    function initContactForm() {
        const form = document.getElementById('contactForm');

        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const name = form.querySelector('[name="name"]');
            const phone = form.querySelector('[name="phone"]');
            const message = form.querySelector('[name="message"]');

            if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            // Show success message
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            form.reset();
        });
    }

    // ========================================
    // Initialize All
    // ========================================

    document.addEventListener('DOMContentLoaded', function() {
        initProductTabs();
        initGalleryFilter();
        initLightbox();
        initFAQ();
        initContactForm();
    });

})();
