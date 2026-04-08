const outletDetails = {
  Panjim: {
    copy: "Show this menu at Panjim or call ahead to confirm availability for cakes, rotisserie meals, and soft serve.",
    locationUrl: "#PASTE_PANJIM_LOCATION_LINK_HERE"
  },
  Vasco: {
    copy: "Show this menu at Vasco or call ahead to confirm availability for cakes, rotisserie meals, and soft serve.",
    locationUrl: "#PASTE_VASCO_LOCATION_LINK_HERE"
  },
  Dabolim: {
    copy: "Show this menu at Dabolim or call ahead to confirm availability for cakes, rotisserie meals, and soft serve.",
    locationUrl: "#PASTE_DABOLIM_LOCATION_LINK_HERE"
  },
  Margao: {
    copy: "Show this menu at Margao or call ahead to confirm availability for cakes, rotisserie meals, and soft serve.",
    locationUrl: "#PASTE_MARGAO_LOCATION_LINK_HERE"
  },
  Anjuna: {
    copy: "Show this menu at Anjuna or call ahead to confirm availability for cakes, rotisserie meals, and soft serve.",
    locationUrl: "#PASTE_ANJUNA_LOCATION_LINK_HERE"
  }
};

document.documentElement.classList.add("js");

document.querySelectorAll("[data-outlet]").forEach((button) => {
  button.addEventListener("click", () => {
    const outlet = button.dataset.outlet;
    document.querySelectorAll("[data-outlet]").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    document.querySelector("[data-outlet-name]").textContent = outlet;
    document.querySelector("[data-outlet-copy]").textContent = outletDetails[outlet].copy;
    document.querySelector("[data-outlet-location]").href = outletDetails[outlet].locationUrl;
  });
});

document.querySelectorAll("[data-menu-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.menuTab;
    document.querySelectorAll("[data-menu-tab]").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    document.querySelectorAll("[data-menu-panel]").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.menuPanel === target);
    });
  });
});

const menuPages = {
  fb: [
    "assets/menu-fb-page-01.jpg",
    "assets/menu-fb-page-02.jpg"
  ],
  cakes: [
    "assets/menu-cakes-page-01.jpg",
    "assets/menu-cakes-page-02.jpg",
    "assets/menu-cakes-page-03.jpg",
    "assets/menu-cakes-page-04.jpg",
    "assets/menu-cakes-page-05.jpg",
    "assets/menu-cakes-page-06.jpg",
    "assets/menu-cakes-page-07.jpg",
    "assets/menu-cakes-page-08.jpg"
  ]
};

const menuModal = document.querySelector("[data-menu-modal]");
const menuGallery = document.querySelector("[data-menu-gallery]");
const menuModalTitle = document.querySelector("[data-menu-modal-title]");

function renderMenuGallery(key, title) {
  const pages = menuPages[key] ?? [];
  const stack = document.createElement("div");
  stack.className = "menu-gallery-stack";

  pages.forEach((src, index) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");

    image.src = src;
    image.alt = `${title} page ${index + 1}`;
    image.loading = index === 0 ? "eager" : "lazy";
    caption.textContent = `Page ${index + 1}`;

    figure.append(image, caption);
    stack.append(figure);
  });

  menuGallery.replaceChildren(stack);
}

function openMenuModal(key, title) {
  renderMenuGallery(key, title);
  menuModal.hidden = false;
  menuModalTitle.textContent = title;
  document.body.classList.add("modal-open");
}

function closeMenuModal() {
  menuModal.hidden = true;
  menuGallery.replaceChildren();
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-menu-open]").forEach((button) => {
  button.addEventListener("click", () => {
    openMenuModal(button.dataset.menuOpen, button.dataset.menuTitle || "Menu");
  });
});

document.querySelectorAll("[data-menu-close]").forEach((button) => {
  button.addEventListener("click", closeMenuModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !menuModal.hidden) {
    closeMenuModal();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  if (element.getBoundingClientRect().top < window.innerHeight) {
    element.classList.add("visible");
    return;
  }

  revealObserver.observe(element);
});
