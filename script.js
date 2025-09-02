document.addEventListener("DOMContentLoaded", () => {
  const openModal = document.getElementById("openModal");
  const footerCall = document.getElementById("footerCall");
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("closePopup");
  const form = document.getElementById("leadForm");

  // Show popup manually
  openModal.addEventListener("click", () => popup.style.display = "flex");
  footerCall.addEventListener("click", () => popup.style.display = "flex");

  // Close popup
  closePopupBtn.addEventListener("click", () => popup.style.display = "none");

  // Auto popup after 5 seconds
  setTimeout(() => popup.style.display = "flex", 5000);

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      company: form.company.value,
      services: form.services.value,
      phone: form.phone.value,
      email: form.email.value,
      smsConsent: form.smsConsent.checked
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwagoPhf455VsBPdnHxp-Umin6LpglRIMUVhczPKP47bDNaFDOq1_c6MpzeIb9_J1I5/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Network response was not ok");

      alert("✅ Thank you! Your call is booked.");
      form.reset();
      popup.style.display = "none";

    } catch (err) {
      console.error("Error sending data:", err);
      alert("❌ Error sending data. Please try again later.");
    }
  });
});
