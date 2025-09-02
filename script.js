document.addEventListener("DOMContentLoaded", () => {
  const bookCallBtn = document.getElementById("bookCall");
  const popup = document.getElementById("popupForm");
  const closeBtn = document.getElementById("closePopup");
  const form = document.getElementById("leadForm");

  // Open popup
  bookCallBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Thank you! We'll reach out soon.");
    popup.style.display = "none";
    form.reset();
  });
});
