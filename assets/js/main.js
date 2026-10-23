
import {
  siteConfig,
  createWhatsAppUrl,
  applyTheme
} from "./config.js";

import {
  destinations,
  services,
  reviews,
  faqs
} from "./data.js";

/* =========================================================
   EBENEZER TOUR AND TRAVELS
   Main JavaScript
   ========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

/* =========================================================
   1. INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", init);

function init() {
  applyTheme();

  updateBusinessDetails();
  renderDestinations();
  renderServices();
  renderReviews();
  renderFAQs();

  setupMobileMenu();
  setupWhatsAppLinks();
  setupPhoneLinks();
  setupDestinationLinks();
  setupServiceLinks();
  setupEnquiryForm();
  setupAnimations();
  setupCurrentYear();
}


/* =========================================================
   2. Mobile  Menu
   ========================================================= */


function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuToggle || !mobileMenu) return;

  const icon = menuToggle.querySelector("i");

  function closeMenu() {
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.hidden;

    mobileMenu.hidden = !isOpen;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });
}

function setupPhoneLinks() {
  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    const phone = siteConfig.phoneDisplay.replace(/\D/g, "");

    link.href = `tel:${phone}`;
  });

  document.querySelectorAll("[data-phone-display]").forEach((element) => {
    element.textContent = siteConfig.phoneDisplay;
  });
}
/* =========================================================
   2. BUSINESS DETAILS
   ========================================================= */

function updateBusinessDetails() {
  $$("[data-business-name]").forEach((element) => {
    element.textContent = siteConfig.name;
  });

  $$("[data-phone-display]").forEach((element) => {
    element.textContent = siteConfig.phoneDisplay;
  });

  $$("[data-address]").forEach((element) => {
    element.textContent = siteConfig.address;
  });

  $$("[data-phone-link]").forEach((element) => {
    const digits = siteConfig.phoneDisplay.replace(/\D/g, "");
    const countryCode = String(
      siteConfig.phoneCountryCode || "91"
    ).replace(/\D/g, "");

    const nationalNumber = digits.replace(/^0+/, "");

    element.href = `tel:+${countryCode}${nationalNumber}`;
  });

  $$("[data-maps-link]").forEach((element) => {
    element.href = siteConfig.googleMapsUrl;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });
}

/* =========================================================
   3. WHATSAPP LINKS
   ========================================================= */

function setupWhatsAppLinks() {
  $$("[data-whatsapp-link]").forEach((element) => {
    const message =
      element.dataset.message ||
      siteConfig.whatsappGreeting;

    element.href = createWhatsAppUrl(message);
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });
}

function openWhatsApp(message) {
  const url = createWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

/* =========================================================
   4. DESTINATIONS
   ========================================================= */

function renderDestinations() {
  const container = $("#destinationGrid");

  if (!container || !Array.isArray(destinations)) return;

  container.innerHTML = destinations
    .map((destination) => {
      const name = escapeHTML(destination.name || "Destination");
      const location = escapeHTML(destination.location || "");
      const category = escapeHTML(destination.category || "Explore");
      const description = escapeHTML(
        destination.description || "Explore this destination with us."
      );

      const image = safeImageUrl(destination.image);

      return `
        <article
          class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          data-animate
        >
          <div class="relative h-56 overflow-hidden bg-slate-100">
            ${
              image
                ? `
                  <img
                    src="${image}"
                    alt="${name}"
                    loading="lazy"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                `
                : `
                  <div class="flex h-full items-center justify-center text-slate-400">
                    <i class="fa-solid fa-mountain-sun text-5xl" aria-hidden="true"></i>
                  </div>
                `
            }

            <span class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 shadow">
              ${category}
            </span>
          </div>

          <div class="p-5">
            <p class="mb-2 text-sm text-slate-500">
              <i class="fa-solid fa-location-dot mr-1" aria-hidden="true"></i>
              ${location}
            </p>

            <h3 class="mb-3 text-xl font-bold text-slate-900">
              ${name}
            </h3>

            <p class="mb-5 text-sm leading-6 text-slate-600">
              ${description}
            </p>

            <button
              type="button"
              data-destination="${name}"
              class="inline-flex items-center gap-2 font-semibold text-emerald-800 transition hover:text-emerald-600"
            >
              Enquire Now
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  setupDestinationLinks();
}

/* =========================================================
   5. SERVICES
   ========================================================= */

function renderServices() {
  const container = $("#serviceGrid");

  if (!container || !Array.isArray(services)) return;

  container.innerHTML = services
    .map((service) => {
      const title = escapeHTML(service.title || "Travel Service");
      const description = escapeHTML(service.description || "");
      const icon = safeIconClass(service.icon);

      return `
        <article
          class="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          data-animate
        >
          <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-800">
            <i class="fa-solid ${icon}" aria-hidden="true"></i>
          </div>

          <h3 class="mb-3 text-lg font-bold text-slate-900">
            ${title}
          </h3>

          <p class="mb-5 text-sm leading-6 text-slate-600">
            ${description}
          </p>

          <button
            type="button"
            data-service="${title}"
            class="font-semibold text-emerald-800 transition hover:text-emerald-600"
          >
            Enquire Now
            <i class="fa-solid fa-arrow-right ml-1" aria-hidden="true"></i>
          </button>
        </article>
      `;
    })
    .join("");

  setupServiceLinks();
}

/* =========================================================
   6. CUSTOMER REVIEWS
   ========================================================= */

function renderReviews() {
  const container = $("#reviewGrid");

  if (!container || !Array.isArray(reviews)) return;

  container.innerHTML = reviews
    .map((review) => {
      const name = escapeHTML(review.name || "Customer");
      const text = escapeHTML(review.text || "");

      return `
        <article
          class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          data-animate
        >
          <div class="mb-4 flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
            ${Array.from(
              { length: 5 },
              () => '<i class="fa-solid fa-star" aria-hidden="true"></i>'
            ).join("")}
          </div>

          <p class="mb-6 leading-7 text-slate-600">
            “${text}”
          </p>

          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
              ${escapeHTML(getInitials(name))}
            </div>

            <div>
              <h3 class="font-bold text-slate-900">${name}</h3>
              <p class="text-sm text-slate-500">Customer review</p>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

/* =========================================================
   7. FAQ ACCORDION
   ========================================================= */

function renderFAQs() {
  const container = $("#faqList");

  if (!container || !Array.isArray(faqs)) return;

  container.innerHTML = faqs
    .map((faq, index) => {
      const question = escapeHTML(faq.question || "");
      const answer = escapeHTML(faq.answer || "");
      const answerId = `faq-answer-${index}`;

      return `
        <article
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          data-animate
        >
          <h3>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-slate-900"
              aria-expanded="false"
              aria-controls="${answerId}"
              data-faq-toggle
            >
              <span>${question}</span>

              <i
                class="fa-solid fa-plus shrink-0 text-emerald-800 transition-transform"
                aria-hidden="true"
              ></i>
            </button>
          </h3>

          <div id="${answerId}" hidden>
            <p class="px-5 pb-5 leading-7 text-slate-600">
              ${answer}
            </p>
          </div>
        </article>
      `;
    })
    .join("");

  container.querySelectorAll("[data-faq-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const answerId = button.getAttribute("aria-controls");
      const answer = document.getElementById(answerId);
      const icon = $("i", button);

      if (!answer) return;

      const isExpanded =
        button.getAttribute("aria-expanded") === "true";

      // Close all FAQ items first.
      container.querySelectorAll("[data-faq-toggle]").forEach((otherButton) => {
        otherButton.setAttribute("aria-expanded", "false");

        const otherAnswer = document.getElementById(
          otherButton.getAttribute("aria-controls")
        );

        if (otherAnswer) otherAnswer.hidden = true;

        const otherIcon = $("i", otherButton);

        if (otherIcon) {
          otherIcon.classList.remove("rotate-45");
        }
      });

      // Open the selected item if it was previously closed.
      if (!isExpanded) {
        button.setAttribute("aria-expanded", "true");
        answer.hidden = false;

        if (icon) {
          icon.classList.add("rotate-45");
        }
      }
    });
  });
}



/* =========================================================
   9. DESTINATION ENQUIRY BUTTONS
   ========================================================= */

function setupDestinationLinks() {
  $$("[data-destination]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    button.addEventListener("click", () => {
      const destination = button.dataset.destination || "";

      prefillEnquiry({
        destination,
        message: `Hello ${siteConfig.name}! I would like to enquire about a trip to ${destination}.`
      });
    });
  });
}

/* =========================================================
   10. SERVICE ENQUIRY BUTTONS
   ========================================================= */

function setupServiceLinks() {
  $$("[data-service]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    button.addEventListener("click", () => {
      const service = button.dataset.service || "";

      prefillEnquiry({
        service,
        message: `Hello ${siteConfig.name}! I would like to enquire about your ${service} service.`
      });
    });
  });
}

/* =========================================================
   11. ENQUIRY FORM
   ========================================================= */

function setupEnquiryForm() {
  const form = $("#enquiryForm");
  const status = $("#formStatus");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const destination = String(
      formData.get("destination") || ""
    ).trim();
    const service = String(
      formData.get("serviceType") ||
      formData.get("service") ||
      ""
    ).trim();
    const travelDate = String(
      formData.get("travelDate") || ""
    ).trim();
    const travellers = String(
      formData.get("travellers") || ""
    ).trim();
    const message = String(
      formData.get("message") || ""
    ).trim();

    if (!name || !phone) {
      showFormStatus(
        status,
        "Please enter your name and phone number.",
        true
      );
      return;
    }

    const whatsappMessage = [
      `Hello ${siteConfig.name}!`,
      "",
      "I would like to enquire about a trip.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      destination ? `Destination: ${destination}` : "",
      service ? `Service: ${service}` : "",
      travelDate ? `Travel date: ${travelDate}` : "",
      travellers ? `Travellers: ${travellers}` : "",
      message ? `Additional details: ${message}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    showFormStatus(
      status,
      "Opening WhatsApp so you can send your enquiry.",
      false
    );

    openWhatsApp(whatsappMessage);
  });
}

function prefillEnquiry({ destination = "", service = "", message = "" }) {
  const destinationInput = $("#destination");
  const serviceInput = $("#serviceType");

  if (destinationInput && destination) {
    destinationInput.value = destination;
  }

  if (serviceInput && service) {
    const matchingOption = [...serviceInput.options].find((option) => {
      return (
        option.value.toLowerCase() === service.toLowerCase() ||
        option.textContent.trim().toLowerCase() === service.toLowerCase()
      );
    });

    if (matchingOption) {
      serviceInput.value = matchingOption.value;
    }
  }

  const form = $("#enquiryForm");

  if (form) {
    form.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    const firstInput = $('input[name="name"]', form);

    if (firstInput) {
      window.setTimeout(() => firstInput.focus(), 400);
    }
  }

  // If no enquiry form exists, open WhatsApp directly.
  if (!form && message) {
    openWhatsApp(message);
  }
}

function showFormStatus(element, message, isError) {
  if (!element) return;

  element.textContent = message;
  element.classList.remove("text-red-600", "text-emerald-700");
  element.classList.add(
    isError ? "text-red-600" : "text-emerald-700"
  );
}

/* =========================================================
   12. SCROLL ANIMATIONS
   ========================================================= */

function setupAnimations() {
  const elements = $$("[data-animate]");

  if (!elements.length) return;

  if (
    !siteConfig.animation?.enabled ||
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  elements.forEach((element, index) => {
    element.style.transitionDelay =
      `${index * (siteConfig.animation.stagger || 100)}ms`;

    observer.observe(element);
  });
}

/* =========================================================
   13. FOOTER YEAR
   ========================================================= */

function setupCurrentYear() {
  const yearElement = $("#currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* =========================================================
   14. HELPERS
   ========================================================= */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function safeImageUrl(value) {
  if (!value) return "";

  try {
    const url = new URL(value, window.location.href);

    if (!["http:", "https:"].includes(url.protocol)) {
      return "";
    }

    return escapeHTML(url.href);
  } catch {
    return "";
  }
}

function safeIconClass(value) {
  const allowedIcons = new Set([
    "fa-map-location-dot",
    "fa-car",
    "fa-heart",
    "fa-sun",
    "fa-people-roof",
    "fa-users",
    "fa-ring",
    "fa-hotel",
    "fa-map",
    "fa-plane",
    "fa-bus",
    "fa-compass",
    "fa-umbrella-beach",
    "fa-mountain-sun",
    "fa-route",
    "fa-earth-asia"
  ]);

  return allowedIcons.has(value) ? value : "fa-map";
}

function getInitials(name) {
  return String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
