
/**
* Template Name: Personal - v2.1.0 (Modernized)
* Modern interactions and animations
*/
!(function($) {
  "use strict";

  // Smooth scrolling animation
  function smoothScrollTo(target) {
    $('html, body').animate({
      scrollTop: $(target).offset().top - 70
    }, 800, 'easeInOutQuart');
  }

  // Add scroll animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    document.querySelectorAll('.icon-box, .resume-item, .portfolio-item, .info-box').forEach(el => {
      el.classList.add('scroll-animate');
      observer.observe(el);
    });
  }

  // Enhanced nav menu with modern animations
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
            // Add entrance animation
            $(hash).find('.scroll-animate').addClass('fade-in-up');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
          // Add entrance animation
          setTimeout(() => {
            $(hash).find('.scroll-animate').addClass('fade-in-up');
          }, 100);
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
        $(initial_nav).find('.scroll-animate').addClass('fade-in-up');
      }, 350);
    }
  }

  // Enhanced Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Enhanced counter animation
  function animateCounters() {
    $('[data-toggle="counter-up"]').each(function() {
      const $this = $(this);
      const countTo = parseInt($this.text());
      
      $({ countNum: 0 }).animate({
        countNum: countTo
      }, {
        duration: 2000,
        easing: 'swing',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
        }
      });
    });
  }

  // Trigger counter animation when in view
  $('.counts').waypoint(function() {
    animateCounters();
  }, {
    offset: '80%',
    triggerOnce: true
  });

  // Enhanced skills animation
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      const $this = $(this);
      const width = $this.attr("aria-valuenow") + '%';
      
      $this.animate({
        width: width
      }, {
        duration: 1500,
        easing: 'easeOutQuart'
      });
    });
  }, {
    offset: '80%',
    triggerOnce: true
  });

  // Enhanced testimonials carousel
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    dots: true,
    loop: true,
    nav: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 600,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Enhanced portfolio with smooth filtering
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
      transitionDuration: '0.6s'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });

      // Add stagger animation to filtered items
      setTimeout(() => {
        $('.portfolio-item').each(function(index) {
          $(this).css('animation-delay', (index * 0.1) + 's');
          $(this).addClass('fade-in-up');
        });
      }, 300);
    });
  });

  // Enhanced lightbox
  $(document).ready(function() {
    $('.venobox').venobox({
      bgcolor: 'rgba(15, 23, 42, 0.9)',
      overlayColor: 'rgba(15, 23, 42, 0.8)',
      closeBackground: '#60a5fa',
      closeColor: '#ffffff',
      border: '0px',
      spinner: 'three-bounce',
      spinColor: '#60a5fa'
    });
  });

  // Add parallax effect to header
  $(window).scroll(function() {
    const scrolled = $(this).scrollTop();
    const parallax = $('.header-bg');
    const speed = scrolled * 0.5;
    parallax.css('transform', 'translateY(' + speed + 'px)');
  });

  // Add typing animation enhancement
  // if (typeof Typed !== 'undefined') {
  //   var typed = new Typed('.typing', {
  //     strings: ["Learner", "Player", "Back End Developer", "Data Enthusiast", "AI Explorer"],
  //     loop: true,
  //     typeSpeed: 30,
  //     backSpeed: 30,
  //     backDelay: 9000,
  //     startDelay: 500,
  //     showCursor: true,
  //     cursorChar: '|',
  //     autoInsertCss: true
  //   });
  // }

  // Initialize scroll animations when document is ready
  $(document).ready(function() {
    initScrollAnimations();
    
    // Add loading animation to main elements
    setTimeout(() => {
      $('.scroll-animate').addClass('fade-in-up');
    }, 200);
  });

  // Add smooth hover effects for buttons and links
  $('a, button').hover(
    function() {
      $(this).addClass('hover-effect');
    },
    function() {
      $(this).removeClass('hover-effect');
    }
  );

  // Add custom easing functions
  $.easing.easeOutQuart = function(x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  };

  $.easing.easeInOutQuart = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  };

  // Performance optimization: debounce scroll events
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // Optimized scroll handler
  $(window).scroll(debounce(function() {
    // Add any scroll-based animations here
  }, 16)); // ~60fps

})(jQuery);
