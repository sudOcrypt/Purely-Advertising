document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openModal = document.getElementById("openModal");
  const footerCall = document.getElementById("footerCall");
  const closeBtn = document.getElementById("closePopup");
  const form = document.getElementById("leadForm");

  // Open popup on button click
  openModal.addEventListener("click", () => popup.style.display = "flex");

  // Open popup on footer link click (prevent page reload)
  footerCall.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });

  // Auto open after 5 seconds
  setTimeout(() => { popup.style.display = "flex"; }, 5000);

  // Close popup
  closeBtn.addEventListener("click", () => popup.style.display = "none");

  // Submit form to Google Sheets
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value,
      company: form.company.value,
      services: form.services.value,
      phone: form.phone.value,
      email: form.email.value,
      smsConsent: form.smsConsent.checked
    };
    fetch("https://script.google.com/macros/s/AKfycbwrsP6QtqqCejSLHBPzsYywEvWx4HtqtQpAavlhsGpW1HKwubgJwS52ATAeieHQYQafGA/exec", {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(() => {
      alert("✅ Thank you! Your call is booked.");
      popup.style.display = "none";
      form.reset();
    })
    .catch(err => alert("❌ Error: " + err));
  });
});
