AOS.init({
  duration: 1200,
  once: true,
});
document.querySelectorAll(".footer-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Select both candle wrappers
const candles = document.querySelectorAll(".candle-wrapper");

// Add click listener to reload page on click
candles.forEach((candle) => {
  candle.addEventListener("click", () => {
    location.reload();
  });
});

// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-slide-up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // optional: stop observing after first reveal
        }
      });
    },
    {
      threshold: 0.1, // element is considered visible when 10% is in viewport
    }
  );

  elements.forEach((el) => observer.observe(el));
});

// Ripple effect on clickable links/buttons
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    el.appendChild(ripple);

    const rect = el.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });
});
