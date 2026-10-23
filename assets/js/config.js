
export const siteConfig = {
  name: "EBENEZER TOUR AND TRAVELS",

  phoneDisplay: "063705 55619",
  phoneCountryCode: "91",

  // International format, digits only. Verify this is the correct WhatsApp number.
  whatsappNumber: "916370555619",

  address:
    "7Q32+5V8, Kalinga Vihar Rd, Kalinga Vihar LIG, Kalinganagar, Bhubaneswar, Sijuput, Odisha 751028",

  googleMapsUrl:
    "https://www.google.com/maps/place/EBENEZER+TOUR+AND+TRAVELS/",

  whatsappGreeting:
    "Hello Ebenezer Tour and Travels! I would like to enquire about a trip.",

  currency: "INR",

  theme: {
    primary: "#0b2b26",
    primaryHover: "#4e2c16",
    secondary: "#d9f99d",
    accent: "#047857",
    background: "#f7f7f2",
    surface: "#ffffff",
    text: "#1e293b",
    muted: "#64748b",
    border: "#e2e8f0",
    whatsapp: "#25d366"
  },

  animation: {
    enabled: true,
    duration: 300,
    stagger: 10
  }
};

export function createWhatsAppUrl(message = siteConfig.whatsappGreeting) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function applyTheme() {
  const root = document.documentElement;
  const { theme, animation } = siteConfig;

  const variables = {
    "--color-primary": theme.primary,
    "--color-primary-hover": theme.primaryHover,
    "--color-secondary": theme.secondary,
    "--color-accent": theme.accent,
    "--color-background": theme.background,
    "--color-surface": theme.surface,
    "--color-text": theme.text,
    "--color-muted": theme.muted,
    "--color-border": theme.border,
    "--color-whatsapp": theme.whatsapp,
    "--animation-duration": `${animation.duration}ms`,
    "--animation-stagger": `${animation.stagger}ms`
  };

  Object.entries(variables).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme.primary);
}
