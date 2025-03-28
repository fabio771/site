const sidebar = document.getElementById("sidebar");
const toggleMenuBtn = document.getElementById("toggleMenu");
const sidebarLinks = document.querySelectorAll("#sidebar ul li a");

// Ao clicar, alterna entre abrir e fechar o sidebar e dispara a animação
toggleMenuBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("active")) {
    sidebar.classList.add("closing");
    toggleMenuBtn.classList.remove("open");
  } else {
    sidebar.classList.remove("closing");
    sidebar.classList.add("active");
    toggleMenuBtn.classList.add("open");
  }
});

// Ao clicar em um link do sidebar, fecha o menu
sidebarLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (sidebar.classList.contains("active")) {
      sidebar.classList.add("closing");
      toggleMenuBtn.classList.remove("open");
    }
  });
});

// Quando a animação de drenagem terminar, reseta o estado do sidebar
sidebar.addEventListener("animationend", (e) => {
  if (e.animationName === "drainWater") {
    sidebar.classList.remove("active", "closing");
  }
});