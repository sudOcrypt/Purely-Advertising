document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openModalBtn = document.getElementById("openModal");
  const footerCall = document.getElementById("footerCall");
  const leadForm = document.getElementById("leadForm");
  const formStatus = document.getElementById("formStatus");

  // Show popup
  openModalBtn.addEventListener("click", () => popup.style.display = "flex");
  footerCall.addEventListener("click", () => popup.style.display = "flex");

  // Close popup
  window.closePopup = function() {
    popup.style.display = "none";
    formStatus.textContent = "";
  }

  // Auto popup after 5 seconds
  setTimeout(() => { popup.style.display = "flex"; }, 5000);

  // Show debug message on submission
  leadForm.addEventListener("submit", () => {
    formStatus.textContent = "Sending data to Apps Script…";
  });

  // Detect success via iframe load
  const iframe = document.querySelector("iframe[name='hidden_iframe']");
  iframe.onload = function() {
    formStatus.textContent = "✅ Call successfully booked!";
    leadForm.reset();
    setTimeout(() => { popup.style.display = "none"; formStatus.textContent = ""; }, 2500);
  };
});
