document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("openModal");
  const footerCallBtn = document.getElementById("footerCall");
  const popup = document.getElementById("popup");
  const form = document.getElementById("leadForm");

  // Open popup
  openModalBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  footerCallBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  // Close popup
  window.closePopup = function () {
    popup.style.display = "none";
  };

  // Automatically open popup after 5 seconds
  setTimeout(() => {
    popup.style.display = "flex";
  }, 5000);

  // Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      company: form.company.value,
      services: form.services.value,
      phone: form.phone.value,
      email: form.email.value,
      smsConsent: form.smsConsent.checked ? "on" : ""
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxSjcWl4s7us8uq1Dgxs_9nG8sOtloU12ZAg30pdSXeSmSP_SfcnKt-SM-A5ePQBRMTKg/exec",
        {
          method: "POST",
          mode: "no-cors", // required for CORS
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data)
        }
      );

      // Success alert
      alert("✅ Thank you! Your call is booked.");
      form.reset();
      popup.style.display = "none";
    } catch (err) {
      console.error("Error sending data:", err);
      alert("❌ Error sending data. Please try again later.");
    }
  });
});
