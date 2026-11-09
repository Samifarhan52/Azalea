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

    // ===================================================================
    // 9. Comprehensive International Phone Input with Search & Country Selection
    // ===================================================================
    const AZALEA_COUNTRIES = [
      { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
      { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
      { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
      { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
      { code: "BH", name: "Bahrain", dial: "+973", flag: "🇧🇭" },
      { code: "OM", name: "Oman", dial: "+968", flag: "🇴🇲" },
      { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
      { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
      { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
      { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
      { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
      { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
      { code: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
      { code: "LB", name: "Lebanon", dial: "+961", flag: "🇱🇧" },
      { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
      { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
      { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
      { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
      { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
      { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
      { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
      { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
      { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
      { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
      { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
      { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
      { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
      { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
      { code: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
      { code: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
      { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
      { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
      { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷" },
      { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
      { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
      { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
      { code: "MA", name: "Morocco", dial: "+212", flag: "🇲🇦" },
      { code: "TN", name: "Tunisia", dial: "+216", flag: "🇹🇳" },
      { code: "DZ", name: "Algeria", dial: "+213", flag: "🇩🇿" },
      { code: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
      { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
      { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
      { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
      { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
      { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
      { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
      { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴" },
      { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰" },
      { code: "PL", name: "Poland", dial: "+48", flag: "🇵🇱" },
      { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
      { code: "GR", name: "Greece", dial: "+30", flag: "🇬🇷" },
      { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
      { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪" },
      { code: "IQ", name: "Iraq", dial: "+964", flag: "🇮🇶" },
      { code: "YE", name: "Yemen", dial: "+967", flag: "🇾🇪" },
      { code: "SY", name: "Syria", dial: "+963", flag: "🇸🇾" },
      { code: "PS", name: "Palestine", dial: "+970", flag: "🇵🇸" },
      { code: "SD", name: "Sudan", dial: "+249", flag: "🇸🇩" },
      { code: "ET", name: "Ethiopia", dial: "+251", flag: "🇪🇹" },
      { code: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭" },
      { code: "TZ", name: "Tanzania", dial: "+255", flag: "🇹🇿" },
      { code: "UG", name: "Uganda", dial: "+256", flag: "🇺🇬" },
      { code: "UA", name: "Ukraine", dial: "+380", flag: "🇺🇦" },
      { code: "RO", name: "Romania", dial: "+40", flag: "🇷🇴" },
      { code: "CZ", name: "Czech Republic", dial: "+420", flag: "🇨🇿" },
      { code: "HU", name: "Hungary", dial: "+36", flag: "🇭🇺" },
      { code: "HK", name: "Hong Kong", dial: "+852", flag: "🇭🇰" },
      { code: "TW", name: "Taiwan", dial: "+886", flag: "🇹🇼" },
      { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭" },
      { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
      { code: "AF", name: "Afghanistan", dial: "+93", flag: "🇦🇫" },
      { code: "IR", name: "Iran", dial: "+98", flag: "🇮🇷" },
      { code: "KZ", name: "Kazakhstan", dial: "+7", flag: "🇰🇿" },
      { code: "UZ", name: "Uzbekistan", dial: "+998", flag: "🇺🇿" },
      { code: "AZ", name: "Azerbaijan", dial: "+994", flag: "🇦🇿" },
      { code: "GE", name: "Georgia", dial: "+995", flag: "🇬🇪" },
      { code: "CY", name: "Cyprus", dial: "+357", flag: "🇨🇾" },
      { code: "MT", name: "Malta", dial: "+356", flag: "🇲🇹" },
      { code: "LU", name: "Luxembourg", dial: "+352", flag: "🇱🇺" },
      { code: "IS", name: "Iceland", dial: "+354", flag: "🇮🇸" },
      { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮" },
      { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
      { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
      { code: "VE", name: "Venezuela", dial: "+58", flag: "🇻🇪" },
      { code: "EC", name: "Ecuador", dial: "+593", flag: "🇪🇨" },
      { code: "UY", name: "Uruguay", dial: "+598", flag: "🇺🇾" },
      { code: "PA", name: "Panama", dial: "+507", flag: "🇵🇦" },
      { code: "CR", name: "Costa Rica", dial: "+506", flag: "🇨🇷" },
      { code: "MV", name: "Maldives", dial: "+960", flag: "🇲🇻" }
    ];

    function initIntlPhonePickers() {
      $(".intl-phone-wrapper").each(function () {
        const wrapper = $(this);
        const list = wrapper.find(".country-list");
        const searchInput = wrapper.find(".country-search-input");
        const noResults = wrapper.find(".country-no-results");
        const pickerBtn = wrapper.find(".country-picker-btn");
        const dropdown = wrapper.find(".country-select-dropdown");
        const hiddenInput = wrapper.find(".country-dial-code-input");
        const phoneInput = wrapper.find(".phone-input-field");

        // Populate country list if empty
        if (list.children().length === 0) {
          AZALEA_COUNTRIES.forEach(function (c) {
            const isSelected = (c.dial === hiddenInput.val() || (hiddenInput.val() === "+974" && c.code === "QA"));
            const li = $(`
              <li class="country-item ${isSelected ? 'is-selected' : ''}" data-dial="${c.dial}" data-flag="${c.flag}" data-name="${c.name}">
                <span class="item-flag">${c.flag}</span>
                <span class="item-name">${c.name}</span>
                <span class="item-code">${c.dial}</span>
              </li>
            `);
            list.append(li);
          });
        }

        // Toggle dropdown on button click
        pickerBtn.off("click").on("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = dropdown.hasClass("is-open");
          $(".country-select-dropdown").removeClass("is-open");
          if (!isOpen) {
            dropdown.addClass("is-open");
            searchInput.val("").trigger("input");
            setTimeout(function () {
              searchInput.focus();
            }, 100);
          }
        });

        // Search filter
        searchInput.off("input").on("input", function () {
          const query = $(this).val().toLowerCase().trim();
          let matched = 0;
          list.find(".country-item").each(function () {
            const name = $(this).attr("data-name").toLowerCase();
            const dial = $(this).attr("data-dial").toLowerCase();
            if (name.includes(query) || dial.includes(query)) {
              $(this).show();
              matched++;
            } else {
              $(this).hide();
            }
          });
          if (matched === 0) {
            noResults.show();
          } else {
            noResults.hide();
          }
        });

        // Select country
        list.off("click", ".country-item").on("click", ".country-item", function (e) {
          e.stopPropagation();
          const item = $(this);
          const dial = item.attr("data-dial");
          const flag = item.attr("data-flag");

          pickerBtn.find(".selected-flag").text(flag);
          pickerBtn.find(".selected-dial-code").text(dial);
          hiddenInput.val(dial);

          list.find(".country-item").removeClass("is-selected");
          item.addClass("is-selected");

          dropdown.removeClass("is-open");
          phoneInput.focus();
        });

        // Typing detection: if user types + or custom dial code directly in the phone field
        phoneInput.off("input.codeDetect").on("input.codeDetect", function () {
          const val = $(this).val().trim();
          if (val.startsWith("+")) {
            const matched = AZALEA_COUNTRIES.filter(function (c) {
              return val.startsWith(c.dial);
            }).sort(function (a, b) {
              return b.dial.length - a.dial.length;
            })[0];

            if (matched) {
              pickerBtn.find(".selected-flag").text(matched.flag);
              pickerBtn.find(".selected-dial-code").text(matched.dial);
              hiddenInput.val(matched.dial);
              list.find(".country-item").removeClass("is-selected");
              list.find(`.country-item[data-dial='${matched.dial}']`).addClass("is-selected");
            }
          }
        });
      });

      // Close dropdown when clicking outside
      $(document).off("click.countryDropdown").on("click.countryDropdown", function (e) {
        if (!$(e.target).closest(".country-select-dropdown").length) {
          $(".country-select-dropdown").removeClass("is-open");
        }
      });
    }

    initIntlPhonePickers();

    // ===================================================================
    // 10. Form Submission & Direct Automatic WhatsApp Delivery
    // ===================================================================
    $("#bookingForm, #consultationForm, #pageContactForm").on("submit", function (e) {
      e.preventDefault();
      const form = $(this);
      const submitBtn = form.find("button[type='submit']");

      // Extract values cleanly
      const name = form.find("input[placeholder*='Name']").first().val() || "";
      const company = form.find("input[placeholder*='Company'], input[placeholder*='Startup']").val() || "";
      const email = form.find("input[type='email']").val() || "";
      let dialCode = form.find(".country-dial-code-input").val() || "+974";
      let phone = form.find(".phone-input-field, input[type='tel']").val() || "";
      
      // Clean phone if it already contains the dial code
      if (phone.startsWith(dialCode)) {
        phone = phone.substring(dialCode.length).trim();
      } else if (phone.startsWith("+")) {
        dialCode = "";
      }
      const fullPhone = (dialCode ? dialCode + " " : "") + phone;

      const spaceType = form.find("select option:selected").text() || "Executive Office / Workspace";
      const tourDate = form.find("input[type='date']").val() || "";
      const notes = form.find("textarea").val() || "";

      // Construct professional WhatsApp message
      const waMessage = 
        "🌟 *NEW WORKSPACE INQUIRY - NEW AZALEA BUSINESS CENTER* 🌟\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
        "👤 *Full Name:* " + (name.trim() || "Not provided") + "\n" +
        "🏢 *Company:* " + (company.trim() || "N/A") + "\n" +
        "📧 *Email:* " + (email.trim() || "Not provided") + "\n" +
        "📱 *Phone:* " + fullPhone.trim() + "\n" +
        "📍 *Workspace:* " + (spaceType && !spaceType.includes("Select") ? spaceType : "Executive Office") + "\n" +
        "📅 *Preferred Date:* " + (tourDate || "Flexible / Move-in Ready") + "\n" +
        "📝 *Requirements:* " + (notes.trim() || "Standard workspace consultation") + "\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
        "📍 *Location:* Buzwair Building, Doha, Qatar\n" +
        "🌐 *Source:* azaleagroupqa.com";

      const waUrl = "https://wa.me/97451019991?text=" + encodeURIComponent(waMessage);

      // Visual feedback
      submitBtn.prop("disabled", true).html('<i class="fas fa-spinner fa-spin me-2"></i>Connecting to WhatsApp...');

      setTimeout(function () {
        // Show stylish WhatsApp delivery confirmation card
        form.html(`
          <div class="alert alert-success p-4 text-center my-3 rounded-3 shadow-sm border-0" style="background: #F0FDF4; border: 1px solid #BBF7D0 !important;">
            <div class="mb-3"><i class="fab fa-whatsapp text-success" style="font-size: 50px;"></i></div>
            <h4 class="fw-bold mb-2 text-dark">Redirecting to WhatsApp...</h4>
            <p class="mb-3 text-secondary" style="font-size: 14.5px;">Your workspace inquiry details have been formatted and delivered directly to New Azalea Business Center's official WhatsApp line.</p>
            <div class="mb-3">
              <a href="${waUrl}" target="_blank" class="theme-btn theme-btn-luxury d-inline-flex align-items-center justify-content-center gap-2" style="background: #25D366 !important; color: #FFFFFF !important; border: none !important; font-size: 16px !important; padding: 16px 32px !important; box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4) !important;">
                <i class="fab fa-whatsapp fs-5"></i> Open in WhatsApp Now
              </a>
            </div>
            <div>
              <small class="text-muted"><i class="fas fa-shield-alt text-success me-1"></i> Connected to Official New Azalea Support (+974 51019991)</small>
            </div>
          </div>
        `);

        // Automatically trigger WhatsApp redirect
        const opened = window.open(waUrl, "_blank");
        if (!opened || opened.closed || typeof opened.closed === "undefined") {
          setTimeout(function () {
            window.location.href = waUrl;
          }, 800);
        }
      }, 900);
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
