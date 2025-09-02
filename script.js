document.addEventListener("DOMContentLoaded", () => {
  const openModal = document.getElementById("openModal");
  const footerCall = document.getElementById("footerCall");
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("closePopup");
  const form = document.getElementById("leadForm");

  // Open popup
  openModal.addEventListener("click", () => popup.style.display = "flex");
  footerCall.addEventListener("click", () => popup.style.display = "flex");

  // Auto popup after 5 seconds
  setTimeout(() => popup.style.display = "flex", 5000);

  // Close popup
  closePopupBtn.addEventListener("click", () => popup.style.display = "none");

  // Form submission
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

    console.log("Sending data:", data);

    fetch("https://script.google.com/macros/s/AKfycbyDUP4LaYtdP3LTjDXRzY3dVQZyH5cGH8_Wa9cuVCQc5nKP7g0ykKWsi3ZNqWqGzXpVfQ/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
      console.log("Apps Script response:", res);
      alert("✅ Call was booked! Check your Google Sheet.");
      popup.style.display = "none";
      form.reset();
    })
    .catch(err => {
      console.error("❌ Error sending data:", err);
      alert("❌ Error sending data. Check console for details.");
    });
  });
});
