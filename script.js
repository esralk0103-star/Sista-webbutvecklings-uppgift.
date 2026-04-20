// Animation
window.addEventListener("load", () => {
  const items = document.querySelectorAll(".hero-title li");
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
      item.style.transition = "1s ease";
    }, index * 300);
  });

  const buttons = document.querySelectorAll(".buttons .btn");
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
      btn.style.transition = "1s ease";
    }, 600 + index * 200);
  });

  const savedEmail = localStorage.getItem("savedEmail");
  if (savedEmail) document.getElementById("email").value = savedEmail;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") document.body.classList.add("light");

  updateThemeText();
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");

function updateThemeText() {
  themeToggle.textContent = document.body.classList.contains("light") ? "Dark Mode" : "Light Mode";
}

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  updateThemeText();
};

// Countdown
const countdown = document.getElementById("countdown");
function updateCountdown() {
  const target = new Date("2026-06-01");
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    countdown.textContent = "Now Showing!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.textContent = `${days} dagar kvar`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Modal logic
const bookBtn = document.getElementById("bookBtn");
const ticketsBtn = document.getElementById("ticketsBtn");
const bookModal = document.getElementById("bookModal");
const ticketsModal = document.getElementById("ticketsModal");
const closeButtons = document.querySelectorAll(".close");

bookBtn.onclick = () => bookModal.style.display = "block";
ticketsBtn.onclick = () => ticketsModal.style.display = "block";

closeButtons.forEach(btn => {
  btn.onclick = () => {
    btn.parentElement.parentElement.style.display = "none";
    btn.parentElement.querySelector(".confirmation").textContent = "";
  }
});

window.onclick = (e) => {
  if (e.target === bookModal) bookModal.style.display = "none";
  if (e.target === ticketsModal) ticketsModal.style.display = "none";
}

// ESC close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    bookModal.style.display = "none";
    ticketsModal.style.display = "none";
  }
});

// Fake API
function fakeAPI(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve("Success"), 1500);
  });
}

// Loading
function showLoading(button) {
  const originalText = button.textContent;
  button.textContent = "Loading...";
  button.disabled = true;
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 1500);
}

// Bats
function spawnBats(btn, count = 30) {
  for (let i = 0; i < count; i++) {
    const bat = document.createElement("div");
    bat.classList.add("bat");

    const x = (Math.random() - 0.5) * 400 + "px";
    const y = (Math.random() - 0.5) * 400 + "px";

    bat.style.setProperty("--x", x);
    bat.style.setProperty("--y", y);
    bat.style.animationDuration = (Math.random() * 0.5 + 0.5) + "s";

    const rect = btn.getBoundingClientRect();
    bat.style.left = rect.left + rect.width / 2 + "px";
    bat.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(bat);
    bat.addEventListener("animationend", () => bat.remove());
  }
}

// Book form
const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  if (!email.includes("@") || email.length < 5) {
    alert("Skriv en giltig e-post!");
    return;
  }

  localStorage.setItem("savedEmail", email);

  showLoading(bookForm.querySelector("button"));

  await fakeAPI(email);

  bookForm.querySelector(".confirmation").textContent = `Tack! Vi skickar info till ${email}`;
  spawnBats(bookForm.querySelector("button"), 50);
  bookForm.reset();
});

// Tickets form
const ticketsForm = document.getElementById("ticketsForm");
ticketsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const quantity = document.getElementById("quantity").value;

  showLoading(ticketsForm.querySelector("button"));

  await fakeAPI({ date, quantity });

  ticketsForm.querySelector(".confirmation").textContent = `Du har bokat ${quantity} biljetter den ${date}`;
  spawnBats(ticketsForm.querySelector("button"), 50);
  ticketsForm.reset();
});

// Scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".hero-text, .hero-image").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  observer.observe(el);
});

// Cursor glow effect
const cursor = document.createElement("div");
cursor.style.position = "fixed";
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.borderRadius = "50%";
cursor.style.background = "rgba(229,9,20,0.7)";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = "3000";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Click sound
const clickSound = new Audio("click.mp3");
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
  });
});


// EXTRA DEL (som låg utanför script i din kod)

// Animation igen
window.addEventListener("load", () => {
  const items = document.querySelectorAll(".hero-title li");
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
      item.style.transition = "1s ease";
    }, index * 300);
  });

  const buttons = document.querySelectorAll(".buttons .btn");
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
      btn.style.transition = "1s ease";
    }, 600 + index * 200);
  });
});

// Modal-logik igen
const bookBtn2 = document.getElementById("bookBtn");
const ticketsBtn2 = document.getElementById("ticketsBtn");
const bookModal2 = document.getElementById("bookModal");
const ticketsModal2 = document.getElementById("ticketsModal");
const closeButtons2 = document.querySelectorAll(".close");

bookBtn2.onclick = () => bookModal2.style.display = "block";
ticketsBtn2.onclick = () => ticketsModal2.style.display = "block";

closeButtons2.forEach(btn => {
  btn.onclick = () => {
    btn.parentElement.parentElement.style.display = "none";
    btn.parentElement.querySelector(".confirmation").textContent = "";
  }
});

window.onclick = (e) => {
  if (e.target === bookModal2) bookModal2.style.display = "none";
  if (e.target === ticketsModal2) ticketsModal2.style.display = "none";
};

// spawnBats igen
function spawnBats(btn, count = 30) {
  for (let i = 0; i < count; i++) {
    const bat = document.createElement("div");
    bat.classList.add("bat");

    const x = (Math.random() - 0.5) * 300 + "px";
    const y = (Math.random() - 0.5) * 300 + "px";
    bat.style.setProperty("--x", x);
    bat.style.setProperty("--y", y);

    const rect = btn.getBoundingClientRect();
    bat.style.left = rect.left + rect.width / 2 + "px";
    bat.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(bat);
    bat.addEventListener("animationend", () => bat.remove());
  }
}

// Book igen
const bookForm2 = document.getElementById("bookForm");
bookForm2.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  bookForm2.querySelector(".confirmation").textContent = `Tack! Vi skickar info till ${email}`;
  bookForm2.reset();
  spawnBats(bookForm2.querySelector("button"), 50);
});

// Tickets igen
const ticketsForm2 = document.getElementById("ticketsForm");
ticketsForm2.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const quantity = document.getElementById("quantity").value;
  ticketsForm2.querySelector(".confirmation").textContent = `Du har bokat ${quantity} biljetter den ${date}`;
  ticketsForm2.reset();
  spawnBats(ticketsForm2.querySelector("button"), 50);
});

// spawnBats extra version
function spawnBats(btn, count = 30) {
  for (let i = 0; i < count; i++) {
    const bat = document.createElement("div");
    bat.classList.add("bat");

    const x = (Math.random() - 0.5) * 300 + "px";
    const y = (Math.random() - 0.5) * 300 + "px";
    bat.style.setProperty("--x", x);
    bat.style.setProperty("--y", y);

    const rect = btn.getBoundingClientRect();
    bat.style.left = rect.left + rect.width / 2 + "px";
    bat.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(bat);
    bat.addEventListener("animationend", () => bat.remove());

    bat.style.transition = "transform 0.3s, opacity 0.3s";
  }
}
