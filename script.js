document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openModalBtn = document.getElementById("openModal");
  const footerCallBtn = document.getElementById("footerCall");
  const closeBtn = document.getElementById("closePopup");
  const form = document.getElementById("leadForm");
  const debug = document.getElementById("debug");

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDOEHl5tW38yiRXRV1EiwGs6Xm4PPPVmSPIj-SbhLAemVLEMVhCwqf-1nGbGbJeBJHuA/exec";

  // Open popup
  openModalBtn.onclick = () => popup.style.display = "flex";
  footerCallBtn.onclick = () => popup.style.display = "flex";

  // Close popup
  closeBtn.onclick = () => popup.style.display = "none";

  // Auto popup after 5 seconds
  setTimeout(() => { popup.style.display = "flex"; }, 5000);

  // Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    debug.textContent = "Sending data to Apps Script...";

    const data = {
      name: form.name.value,
      company: form.company.value,
      services: form.services.value,
      phone: form.phone.value,
      email: form.email.value,
      smsConsent: form.smsConsent.checked
    };

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // bypass CORS restrictions
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      debug.textContent = "✅ Call booked successfully!";
      alert("✅ Call booked successfully!");
      popup.style.display = "none";
      form.reset();
      console.log("Data sent to Apps Script:", data);
    } catch (err) {
      console.error("❌ Error sending data:", err);
      debug.textContent = `❌ Error sending data: ${err}`;
    }
  });
});
