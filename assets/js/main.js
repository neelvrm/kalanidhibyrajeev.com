const phone = "917302239440";
const visitMessage = "Namaste, I would like to know more about कलाnidhi by Rajeev Verma.";

const wa = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
const rootPath = (path) => {
  if (!path || path.startsWith("/") || path.startsWith("http")) return path;
  return `/${path}`;
};
const el = (tag, className, html = "") => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html) node.innerHTML = html;
  return node;
};

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  link.href = wa(visitMessage);
});

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

const makePlaceholder = (label, className = "placeholder-art") =>
  `<div class="art-image ${className}" data-category="${label}"><span>${label}</span></div>`;

function imageBlock(item, type = "art") {
  const src = item.image || item.cover;
  const label = item.category || item.title || "कलाnidhi";
  const holder = type === "book" ? "book-cover placeholder-cover" : "art-image placeholder-art";
  if (!src) return `<div class="${holder}"><span>${label}</span></div>`;
  const wrapClass = type === "book" ? "book-cover" : "art-image";
  return `<div class="${wrapClass}"><img src="${rootPath(src)}" alt="${item.alt || item.title}" loading="lazy" onerror="this.parentElement.className='${holder}';this.parentElement.innerHTML='<span>${label}</span>';"></div>`;
}

function artworkCard(item) {
  const message = `Namaste, I am interested in ${item.title} at कलाnidhi. Please share details.`;
  return `<article class="art-card" data-category="${item.category}">
    ${imageBlock(item)}
    <div class="card-body">
      <p class="card-kicker">${item.category}</p>
      <h3>${item.title}</h3>
      <p>${item.medium}</p>
      <p class="status">${item.status}</p>
      <a class="text-link" href="${wa(message)}">Enquire on WhatsApp</a>
    </div>
  </article>`;
}

function bookCard(item) {
  const signed = `Namaste, I would like to ask for a signed copy of ${item.title}.`;
  return `<article class="book-card">
    ${imageBlock(item, "book")}
    <div class="card-body">
      <p class="card-kicker">${item.subtitle}</p>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="split-links">
        <a class="text-link" href="${item.link}">${item.link === "#" ? "Ask for details" : "View on Amazon"}</a>
        <a class="text-link" href="${wa(signed)}">Ask for signed copy</a>
      </div>
    </div>
  </article>`;
}

function workshopCard(item) {
  const message = `Namaste, I am interested in ${item.title} at कलाnidhi. Please share details.`;
  return `<article class="workshop-card">
    <p class="card-kicker">${item.duration}</p>
    <h3>${item.title}</h3>
    <p><strong>For:</strong> ${item.for}</p>
    <p><strong>Learn:</strong> ${item.learn}</p>
    <a class="text-link" href="${wa(message)}">Register Interest on WhatsApp</a>
  </article>`;
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(path);
  return response.json();
}

async function hydrate() {
  try {
    const artGrid = document.querySelector("#artwork-grid");
    const bookGrid = document.querySelector("#book-grid");
    const workshopGrid = document.querySelector("#workshop-grid");
    const [artworks, books, workshops] = await Promise.all([
      artGrid ? loadJson("/data/artworks.json") : Promise.resolve([]),
      bookGrid ? loadJson("/data/books.json") : Promise.resolve([]),
      workshopGrid ? loadJson("/data/workshops.json") : Promise.resolve([])
    ]);
    if (artGrid) artGrid.innerHTML = artworks.map(artworkCard).join("");
    if (bookGrid) bookGrid.innerHTML = books.map(bookCard).join("");
    if (workshopGrid) workshopGrid.innerHTML = workshops.map(workshopCard).join("");
  } catch (error) {
    document.documentElement.classList.add("json-failed");
  }
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    document.querySelectorAll("#artwork-grid .art-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
hydrate();
