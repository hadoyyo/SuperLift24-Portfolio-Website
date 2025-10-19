/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Custom scroll spy to handle active nav links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Handle click on nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.forEach(function(nav) {
                nav.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});

function openModal() {
    $('#imageModal').modal('show');
}


document.addEventListener('DOMContentLoaded', function() {
        const mobileTooltip = document.getElementById('mobileTooltip');
        const offerSection = document.getElementById('offer');
        const contactSection = document.getElementById('about');
        let tooltipVisible = false;
        
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight * 0.8) &&
                rect.bottom >= (window.innerHeight * 0.2)
            );
        }
        
        function showTooltip() {
            if (!tooltipVisible && window.innerWidth <= 768) {
                mobileTooltip.style.display = 'flex';
                mobileTooltip.classList.remove('hiding');
                tooltipVisible = true;
            }
        }
        
        function hideTooltip() {
            if (tooltipVisible) {
                mobileTooltip.classList.add('hiding');
                setTimeout(() => {
                    mobileTooltip.style.display = 'none';
                    tooltipVisible = false;
                }, 500);
            }
        }
        
        function handleScroll() {
            if (window.innerWidth > 768) {
                hideTooltip();
                return;
            }
            
            if (isElementInViewport(contactSection)) {
                hideTooltip();
            } else if (isElementInViewport(offerSection)) {
                showTooltip();
            } else {
                hideTooltip();
            }
        }
        
        function handleResize() {

            if (window.innerWidth > 768) {
                hideTooltip();
            } else {
                handleScroll();
            }
        }
        
        // Initial check
        handleScroll();
        
        // Listen for scroll events
        window.addEventListener('scroll', handleScroll);
        
        // Listen for resize events
        window.addEventListener('resize', handleResize);
        
        // Hide when clicking any portfolio item
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('click', hideTooltip);
        });
    });