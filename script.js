document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("openModal");
  const footerCallBtn = document.getElementById("footerCall");
  const popup = document.getElementById("popup");
  const leadForm = document.getElementById("leadForm");
  const formStatus = document.getElementById("formStatus");
  const iframe = document.getElementById("hidden_iframe");

  // Open popup
  openModalBtn.onclick = () => popup.style.display = "flex";
  footerCallBtn.onclick = () => popup.style.display = "flex";

  // Handle form submit with debug
  leadForm.addEventListener("submit", function() {
    formStatus.textContent = "Sending data to Apps Script...";
    console.log("Sending data to Apps Script:", {
      name: this.name.value,
      company: this.company.value,
      services: this.services.value,
      phone: this.phone.value,
      email: this.email.value,
      smsConsent: this.smsConsent.checked
    });
  });

  // Debug message on iframe load
  iframe.onload = () => {
    if (formStatus.textContent.includes("Sending")) {
      console.log("Response received from Apps Script.");
      formStatus.textContent = "✅ Call successfully booked!";
      leadForm.reset();
      setTimeout(() => {
        popup.style.display = "none";
        formStatus.textContent = "";
      }, 2500);
    }
  };

  // Auto popup after 5 seconds
  setTimeout(() => { popup.style.display = "flex"; }, 5000);
});
