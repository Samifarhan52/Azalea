/* ===================================================================
   New Azalea Business Center and Services - Core JavaScript
=================================================================== */

(function ($) {
  "use strict";

  $(document).ready(function () {

    // 1. Mobile Offcanvas Menu Toggle
    $(".sidebar__toggle, .header__hamburger").on("click", function (e) {
      e.preventDefault();
      $(".offcanvas__info").addClass("info-open");
      $(".offcanvas__overlay").addClass("overlay-open");
    });

    $(".offcanvas__close, .offcanvas__overlay, .mobile-nav-list a:not(.has-dropdown > a)").on("click", function () {
      $(".offcanvas__info").removeClass("info-open");
      $(".offcanvas__overlay").removeClass("overlay-open");
    });

    // Mobile submenu accordion
    $(".mobile-nav-list .has-dropdown > a").on("click", function (e) {
      e.preventDefault();
      $(this).next(".mobile-sub-menu").slideToggle(300);
      $(this).find("i").toggleClass("fa-chevron-down fa-chevron-up");
    });

    // 2. Sticky Header on Scroll
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 180) {
        $("#header-sticky").addClass("sticky");
      } else {
        $("#header-sticky").removeClass("sticky");
      }
    });

    // 3. Swiper Hero Slider
    if ($(".hero-slider").length > 0) {
      const heroSwiper = new Swiper(".hero-slider", {
        loop: true,
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        speed: 1200,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".hero-slider .swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".hero-nav-next",
          prevEl: ".hero-nav-prev",
        },
      });

      // Animate slide text
      function triggerSlideAnim() {
        $(".hero-slider .swiper-slide-active [data-animation]").each(function () {
          const anim = $(this).data("animation");
          const delay = $(this).data("delay") || "0s";
          $(this).removeClass("animated " + anim);
          $(this).addClass("animated " + anim).css({
            "animation-delay": delay,
            "animation-duration": "1s"
          });
        });
      }

      heroSwiper.on("slideChangeTransitionStart", function () {
        $(".hero-slider [data-animation]").removeClass("animated");
      });
      heroSwiper.on("slideChangeTransitionEnd", triggerSlideAnim);
      triggerSlideAnim();
    }

    // 4. WOW.js Scroll Animations
    if (typeof WOW !== "undefined") {
      new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 80,
        mobile: true,
        live: true
      }).init();
    }

    // 5. CounterUp
    if ($.fn.counterUp) {
      $(".count").counterUp({
        delay: 10,
        time: 1500
      });
    }

    // 6. Magnific Popup for Gallery & Lightbox
    if ($.fn.magnificPopup) {
      $(".img-popup, .gallery-zoom-link").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1]
        },
        zoom: {
          enabled: true,
          duration: 300
        }
      });
    }

    // 7. Circular Back-to-Top Progress Indicator
    const scrollPath = document.querySelector(".scroll-up path");
    if (scrollPath) {
      const pathLength = scrollPath.getTotalLength();
      scrollPath.style.transition = scrollPath.style.WebkitTransition = "none";
      scrollPath.style.strokeDasharray = pathLength + " " + pathLength;
      scrollPath.style.strokeDashoffset = pathLength;
      scrollPath.getBoundingClientRect();
      scrollPath.style.transition = scrollPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";

      const updateScroll = function () {
        const scrollTotal = $(window).scrollTop();
        const height = $(document).height() - $(window).height();
        const scrollTotalHeight = pathLength - (scrollTotal * pathLength) / height;
        scrollPath.style.strokeDashoffset = scrollTotalHeight;
      };

      updateScroll();
      $(window).on("scroll", updateScroll);

      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
          $(".scroll-up").addClass("active-scroll");
        } else {
          $(".scroll-up").removeClass("active-scroll");
        }
      });

      $(".scroll-up").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
      });
    }

    // 8. Gallery Category Filter
    $(".gallery-tab-btn").on("click", function () {
      $(".gallery-tab-btn").removeClass("active");
      $(this).addClass("active");

      const filterValue = $(this).attr("data-filter");
      if (filterValue === "all") {
        $(".gallery-item-wrap").fadeIn(400);
      } else {
        $(".gallery-item-wrap").hide();
        $(".gallery-item-wrap[data-category='" + filterValue + "']").fadeIn(400);
      }
    });

    // 9. Booking Form Submission & Feedback
    $("#bookingForm, #consultationForm, #pageContactForm").on("submit", function (e) {
      e.preventDefault();
      const form = $(this);
      const submitBtn = form.find("button[type='submit']");
      const origText = submitBtn.html();

      submitBtn.prop("disabled", true).html('<i class="fas fa-spinner fa-spin me-2"></i>Processing...');

      setTimeout(function () {
        submitBtn.prop("disabled", false).html(origText);
        // Show success alert
        form.html(`
          <div class="alert alert-success p-4 text-center my-3 rounded-3 shadow-sm">
            <div class="mb-3"><i class="fas fa-check-circle text-success fa-3x"></i></div>
            <h4 class="fw-bold mb-2">Thank You for Your Request!</h4>
            <p class="mb-0 text-muted">Our dedicated workspace advisor at New Azalea Business Center will contact you within 2 hours to confirm your private tour & workspace consultation in Doha.</p>
          </div>
        `);
      }, 1200);
    });

    // 10. Smooth scroll for anchor links
    $('a[href^="#"]:not([href="#"]):not([data-bs-toggle])').on("click", function (e) {
      const target = $($(this).attr("href"));
      if (target.length) {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: target.offset().top - 80
        }, 600);
      }
    });

    // 11. Click-to-Reveal Phone & WhatsApp Handler
    $(document).on("click", ".btn-reveal-phone", function (e) {
      e.preventDefault();
      $(".btn-reveal-phone").hide();
      $(".revealed-phone-box").addClass("is-revealed").fadeIn(300);
      try {
        sessionStorage.setItem("azalea_phone_revealed", "true");
      } catch (err) {}
    });

    // Restore revealed state if user already clicked in this session
    try {
      if (sessionStorage.getItem("azalea_phone_revealed") === "true") {
        $(".btn-reveal-phone").hide();
        $(".revealed-phone-box").addClass("is-revealed").show();
      }
    } catch (err) {}

    // 12. Dynamic Scroll Reveal & Surprise Observer
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("az-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      });

      // Target all key interactive elements for scroll surprise
      const targets = document.querySelectorAll(
        ".az-reveal, .az-reveal-up, .az-reveal-left, .az-reveal-right, .az-reveal-scale, " +
        ".feature-box, .service-card-item, .why-choose-item, .gallery-item, " +
        ".about-modern-composition, .trust-endorsement-box, .faq-accordion .accordion-item, .cta-banner-section"
      );

      targets.forEach(function (el) {
        if (!el.classList.contains("az-reveal-up") && !el.classList.contains("az-reveal-left") && !el.classList.contains("az-reveal-right") && !el.classList.contains("az-reveal-scale")) {
          el.classList.add("az-reveal-up");
        }
        revealObserver.observe(el);
      });

      // Stagger cascade within rows for dynamic surprise pop-in
      document.querySelectorAll(".row").forEach(function (row) {
        const items = row.querySelectorAll(".feature-box, .service-card-item, .why-choose-item, .gallery-item");
        items.forEach(function (item, idx) {
          item.style.transitionDelay = (idx * 0.12) + "s";
        });
      });
    }

    // 13. Luxury Entry Reveal Preloader (2-3 seconds)
    const entryReveal = document.getElementById("azalea-entry-reveal");
    if (entryReveal) {
      const dismissEntryReveal = function () {
        if (!entryReveal.classList.contains("reveal-done")) {
          entryReveal.classList.add("reveal-done");
          setTimeout(function () {
            entryReveal.style.display = "none";
            if (entryReveal.parentNode) {
              entryReveal.remove();
            }
          }, 700);
        }
      };

      // Auto dismiss after 2.3 seconds
      setTimeout(dismissEntryReveal, 2300);

      // Allow instant dismissal on click
      entryReveal.addEventListener("click", dismissEntryReveal);
    }

  });

})(jQuery);
