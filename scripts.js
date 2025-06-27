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

//Sky effect

const canvas = document.getElementById("starry-sky");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create star data
const stars = Array.from({ length: 150 }, () => {
  const isGolden = Math.random() < 0.3; // ~30% stars are golden
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    delta: Math.random() * 0.005 + 0.002,
    color: isGolden
      ? { r: 255, g: 215, b: 0 } // Golden
      : { r: 255, g: 255, b: 255 }, // White
  };
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.delta = -star.delta;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// Hi I'm disable
// const greeting = document.querySelector(".greeting");
// const typing = document.querySelector(".typing");

// typing.addEventListener("animationend", (e) => {
//   if (e.animationName === "typing") {
//     greeting.style.visibility = "hidden"; // Hide "Hi I'm"
//     typing.style.borderRight = "none"; // Remove blinking caret
//     typing.style.overflow = "visible";
//     typing.style.whiteSpace = "normal";
//     typing.style.width = "auto";
//   }
// });

//rocket
const rocket = document.getElementById("rocket");

// Random Rocket Movement
function launchRocket() {
  // Pick random starting side
  const sides = ["top", "bottom", "left", "right"];
  const side = sides[Math.floor(Math.random() * sides.length)];

  let startX, startY, endX, endY;

  if (side === "top") {
    startX = Math.random() * window.innerWidth;
    startY = 0;
    endX = Math.random() * window.innerWidth;
    endY = window.innerHeight;
  } else if (side === "bottom") {
    startX = Math.random() * window.innerWidth;
    startY = window.innerHeight;
    endX = Math.random() * window.innerWidth;
    endY = 0;
  } else if (side === "left") {
    startX = 0;
    startY = Math.random() * window.innerHeight;
    endX = window.innerWidth;
    endY = Math.random() * window.innerHeight;
  } else if (side === "right") {
    startX = window.innerWidth;
    startY = Math.random() * window.innerHeight;
    endX = 0;
    endY = Math.random() * window.innerHeight;
  }

  let t = 0;

  function animateRocket() {
    const x = startX + (endX - startX) * t;
    const y = startY + (endY - startY) * t;

    rocket.style.left = `${x}px`;
    rocket.style.top = `${y}px`;

    createSmoke(x + 15, y + 55);

    t += 0.0015;

    if (t <= 1) {
      requestAnimationFrame(animateRocket);
    } else {
      // After reaching the end, restart after a short delay
      setTimeout(launchRocket, 1000);
    }
  }

  animateRocket();
}

// Smoke Particles
function createSmoke(x, y) {
  const smoke = document.createElement("div");
  smoke.className = "smoke";
  smoke.style.left = `${x}px`;
  smoke.style.top = `${y}px`;
  document.body.appendChild(smoke);
  setTimeout(() => {
    smoke.remove();
  }, 1500);
}

// Start
launchRocket();

// Resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//satellite
const satellite = document.getElementById("satellite");

// Random movement bounds
const padding = 50;
const minX = padding;
const maxX = window.innerWidth - padding - satellite.offsetWidth;
const minY = padding;
const maxY = window.innerHeight - padding - satellite.offsetHeight;

// Helper: get random position inside bounds
function getRandomPosition() {
  return {
    x: Math.random() * (maxX - minX) + minX,
    y: Math.random() * (maxY - minY) + minY,
  };
}

let satTarget = getRandomPosition();
let satCurrent = { x: satTarget.x, y: satTarget.y };

function moveSatellite() {
  const speed = 0.005; // speed factor

  // Calculate vector toward target
  const dx = satTarget.x - satCurrent.x;
  const dy = satTarget.y - satCurrent.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 1) {
    // Reached target, pick new one
    satTarget = getRandomPosition();
  } else {
    // Move toward target
    satCurrent.x += (dx / dist) * speed * 100;
    satCurrent.y += (dy / dist) * speed * 100;
  }

  // Apply position
  satellite.style.left = `${satCurrent.x}px`;
  satellite.style.top = `${satCurrent.y}px`;

  requestAnimationFrame(moveSatellite);
}

// Start satellite movement
moveSatellite();

// Update bounds on resize
window.addEventListener("resize", () => {
  maxX = window.innerWidth - padding - satellite.offsetWidth;
  maxY = window.innerHeight - padding - satellite.offsetHeight;
});

// Collision Detection
function isColliding(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// Create a big explosion of smoke/sparks
function createExplosion(x, y) {
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const smoke = document.createElement("div");
      smoke.className = "smoke";
      smoke.style.left = `${x + Math.random() * 30 - 15}px`;
      smoke.style.top = `${y + Math.random() * 30 - 15}px`;
      document.body.appendChild(smoke);
      setTimeout(() => {
        smoke.remove();
      }, 1500);
    }, i * 5);
  }
}

// Main animation loop for rocket
function animateRocket() {
  const x = startX + (endX - startX) * t;
  const y = startY + (endY - startY) * t;

  rocket.style.left = `${x}px`;
  rocket.style.top = `${y}px`;

  createSmoke(x + 15, y + 55);

  // Collision detection
  if (isColliding(rocket, satellite)) {
    const rocketRect = rocket.getBoundingClientRect();
    createExplosion(rocketRect.left, rocketRect.top);
    setTimeout(() => {
      location.reload();
    }, 2000);
    return;
  }

  t += 0.0015;

  if (t <= 1) {
    requestAnimationFrame(animateRocket);
  } else {
    // After reaching the end, restart after a short delay
    setTimeout(launchRocket, 1000);
  }
}

// Main animation loop for satellite
function moveSatellite() {
  const dx = satTarget.x - satCurrent.x;
  const dy = satTarget.y - satCurrent.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 1) {
    satTarget = getRandomPosition();
  } else {
    satCurrent.x += (dx / dist) * 0.5;
    satCurrent.y += (dy / dist) * 0.5;
  }

  satellite.style.left = `${satCurrent.x}px`;
  satellite.style.top = `${satCurrent.y}px`;

  // Collision detection
  if (isColliding(rocket, satellite)) {
    const rocketRect = rocket.getBoundingClientRect();
    createExplosion(rocketRect.left, rocketRect.top);
    setTimeout(() => {
      location.reload();
    }, 2000);
    return;
  }

  requestAnimationFrame(moveSatellite);
}

// galxy
const galaxies = [
  { el: document.getElementById("galaxy1"), speed: 0.01, angle: 0 },
  { el: document.getElementById("galaxy2"), speed: -0.006, angle: 0 },
  { el: document.getElementById("galaxy3"), speed: 0.008, angle: 0 },
];

function rotateGalaxies() {
  galaxies.forEach((g) => {
    g.angle = (g.angle + g.speed) % 360;
    g.el.style.transform = `rotate(${g.angle}deg)`;
  });
  requestAnimationFrame(rotateGalaxies);
}

rotateGalaxies();

// missiles
function launchMissile() {
  const missile = document.createElement("div");
  missile.classList.add("missile");

  const nose = document.createElement("div");
  nose.classList.add("missile-nose");
  const body = document.createElement("div");
  body.classList.add("missile-body");

  const fire = document.createElement("div");
  fire.classList.add("fire");
  body.appendChild(fire);

  missile.appendChild(nose);
  missile.appendChild(body);

  // Random horizontal start position
  const startX = Math.random() * window.innerWidth;
  missile.style.left = `${startX}px`;
  missile.style.bottom = "-100px";

  document.body.appendChild(missile);

  // Create smoke trail
  const smokeInterval = setInterval(() => {
    const smoke = document.createElement("div");
    smoke.classList.add("smokemissile");
    missile.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1500);
  }, 80);

  // Cleanup after animation completes
  setTimeout(() => {
    clearInterval(smokeInterval);
    missile.remove();
  }, 3000);
}

// Launch missiles every 1 to 2.5 seconds randomly
setInterval(launchMissile, Math.random() * 1500 + 1000);

function animateAndOpen(event, url) {
  event.preventDefault(); // prevent immediate link open

  const el = event.currentTarget;
  el.classList.add("animate-click");

  // Wait for animation to finish (700ms)
  setTimeout(() => {
    window.open(url, "_blank");
    // Reset animation class for future clicks
    el.classList.remove("animate-click");
  }, 700);

  return false; // prevent default link behavior
}

function handlePublicationClick(element) {
  const pdf = element.getAttribute("data-pdf");
  const type = element.getAttribute("data-type");
  openPdfViewer(pdf, type);
}

function openPdfViewer(pdfUrl, paperType) {
  document.getElementById("pdfFrame").src = pdfUrl;
  document.querySelector(".pdf-title").innerText = paperType || "Viewing PDF";
  document.getElementById("pdfViewer").style.display = "flex";
}

function closePdfViewer() {
  document.getElementById("pdfViewer").style.display = "none";
  document.getElementById("pdfFrame").src = "";
}

// Close with ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closePdfViewer();
});
