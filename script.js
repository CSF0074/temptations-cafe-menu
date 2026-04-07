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

const pdfModal = document.querySelector("[data-pdf-modal]");
const pdfFrame = document.querySelector("[data-pdf-frame]");
const pdfModalTitle = document.querySelector("[data-pdf-modal-title]");

function openPdfModal(url, title) {
  pdfModal.hidden = false;
  pdfFrame.src = url;
  pdfModalTitle.textContent = title;
  document.body.classList.add("modal-open");
}

function closePdfModal() {
  pdfModal.hidden = true;
  pdfFrame.src = "";
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-pdf-open]").forEach((button) => {
  button.addEventListener("click", () => {
    openPdfModal(button.dataset.pdfOpen, button.dataset.pdfTitle || "Menu PDF");
  });
});

document.querySelectorAll("[data-pdf-close]").forEach((button) => {
  button.addEventListener("click", closePdfModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !pdfModal.hidden) {
    closePdfModal();
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
