document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openModalBtn = document.getElementById("openModal");
  const footerCall = document.getElementById("footerCall");
  const leadForm = document.getElementById("leadForm");

  // Open popup
  openModalBtn.addEventListener("click", () => popup.style.display = "flex");
  footerCall.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "flex";
  });

  // Close popup function (already referenced inline in HTML)
  window.closePopup = function() {
    popup.style.display = "none";
  }

  // Auto-popup after 5 seconds
  setTimeout(() => { popup.style.display = "flex"; }, 5000);

  // Submit form to Google Sheets
  leadForm.addEventListener("submit", function(e){
    e.preventDefault();
    const data = {
      name: this.name.value,
      company: this.company.value,
      services: this.services.value,
      phone: this.phone.value,
      email: this.email.value,
      smsConsent: this.smsConsent.checked
    };
    fetch("https://script.google.com/macros/s/AKfycbwrsP6QtqqCejSLHBPzsYywEvWx4HtqtQpAavlhsGpW1HKwubgJwS52ATAeieHQYQafGA/exec", {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(() => {
      alert("✅ Thank you! Your call is booked.");
      popup.style.display = "none";
      this.reset();
    })
    .catch(err => alert("❌ Error: " + err));
  });
});
