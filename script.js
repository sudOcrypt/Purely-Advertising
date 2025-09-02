document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openBtn = document.getElementById("openModal");
  const footerBtn = document.getElementById("footerCall");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("leadForm");

  // Open popup
  openBtn.addEventListener("click", () => popup.style.display = "flex");
  footerBtn.addEventListener("click", () => popup.style.display = "flex");

  // Close popup
  closeBtn.addEventListener("click", () => popup.style.display = "none");

  // Form submitted callback
  form.addEventListener("submit", () => {
    alert("✅ Thank you! Your call is booked.");
    popup.style.display = "none";
  });

  // Auto popup after 5 seconds
  setTimeout(() => popup.style.display = "flex", 5000);
});
