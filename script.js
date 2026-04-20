// ========== ANIMATION ==========
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

// ========== THEME ==========
const themeToggle = document.getElementById("themeToggle");

function updateThemeText() {
  themeToggle.textContent = document.body.classList.contains("light")
    ? "Dark Mode"
    : "Light Mode";
}

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
  updateThemeText();
};

// ========== COUNTDOWN ==========
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

// ========== MODAL ==========
const bookBtn = document.getElementById("bookBtn");
const ticketsBtn = document.getElementById("ticketsBtn");
const bookModal = document.getElementById("bookModal");
const ticketsModal = document.getElementById("ticketsModal");
const closeButtons = document.querySelectorAll(".close");

bookBtn.onclick = () => (bookModal.style.display = "block");
ticketsBtn.onclick = () => (ticketsModal.style.display = "block");

closeButtons.forEach((btn) => {
  btn.onclick = () => {
    btn.closest(".modal").style.display = "none";
    const conf = btn.parentElement.querySelector(".confirmation");
    if (conf) conf.textContent = "";
  };
});

window.onclick = (e) => {
  if (e.target === bookModal) bookModal.style.display = "none";
  if (e.target === ticketsModal) ticketsModal.style.display = "none";
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    bookModal.style.display = "none";
    ticketsModal.style.display = "none";
  }
});

// ========== FAKE API ==========
function fakeAPI(data) {
  return new Promise((resolve) => setTimeout(() => resolve("Success"), 1500));
}

// ========== LOADING ==========
function showLoading(button) {
  const original = button.textContent;
  button.textContent = "Loading...";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 1500);
}

// ========== BATS (EN VERSION ONLY) ==========
function spawnBats(btn, count = 30) {
  for (let i = 0; i < count; i++) {
    const bat = document.createElement("div");
    bat.classList.add("bat");

    const x = (Math.random() - 0.5) * 400 + "px";
    const y = (Math.random() - 0.5) * 400 + "px";

    bat.style.setProperty("--x", x);
    bat.style.setProperty("--y", y);

    const rect = btn.getBoundingClientRect();
    bat.style.left = rect.left + rect.width / 2 + "px";
    bat.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(bat);
    bat.addEventListener("animationend", () => bat.remove());
  }
}

// ========== BOOK FORM ==========
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

  bookForm.querySelector(".confirmation").textContent =
    `Tack! Vi skickar info till ${email}`;

  spawnBats(bookForm.querySelector("button"), 50);
  bookForm.reset();
});

// ========== TICKETS FORM ==========
const ticketsForm = document.getElementById("ticketsForm");

ticketsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const quantity = document.getElementById("quantity").value;

  showLoading(ticketsForm.querySelector("button"));
  await fakeAPI({ date, quantity });

  ticketsForm.querySelector(".confirmation").textContent =
    `Du har bokat ${quantity} biljetter den ${date}`;

  spawnBats(ticketsForm.querySelector("button"), 50);
  ticketsForm.reset();
});
