document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById('popup');
  const openModalBtn = document.getElementById('openModal');
  const footerCallBtn = document.getElementById('footerCall');
  const closeBtn = document.getElementById('closePopup');
  const form = document.getElementById('leadForm');
  const webAppURL = "https://script.google.com/macros/s/AKfycbxc0sBMGYNCTaAYHYIUKdSDyzkxZHCUZ9LiAQ8xfz8k-esNC4MmEBmUbGtd2Ll_SC8GIg/exec"; // <-- replace with your Web App URL

  // Open popup
  openModalBtn.addEventListener("click", () => popup.style.display = 'flex');
  footerCallBtn.addEventListener("click", () => popup.style.display = 'flex');

  // Close popup
  closeBtn.addEventListener("click", () => popup.style.display = 'none');

  // Auto popup after 5 seconds
  setTimeout(() => popup.style.display = 'flex', 5000);

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

    fetch(webAppURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resp => {
      if(resp.result === "success") {
        alert("✅ Thank you! Your call is booked.");
        popup.style.display = 'none';
        form.reset();
      } else {
        alert("❌ Error: " + (resp.error || "Unknown error"));
      }
    })
    .catch(err => alert("❌ Error sending data: " + err));
  });
});
