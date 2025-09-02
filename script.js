document.addEventListener("DOMContentLoaded", () => {
  const openModalBtns = [document.getElementById("openModal"), document.getElementById("footerCall")];
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");

  // Open popup on click
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      popup.style.display = "flex";
    });
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Auto popup after 5 seconds
  setTimeout(() => {
    popup.style.display = "flex";
  }, 5000);
});
