document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openModalBtn = document.getElementById("openModal");
  const footerCallBtn = document.getElementById("footerCall");
  const closeBtn = document.getElementById("closePopup");
  const form = document.getElementById("leadForm");
  const debug = document.getElementById("debug");

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8X8TReeLMLLVgLzWHOMULsM3YHRLeFRBueZC37Y9TnKoIzo140vFQq4mbSJDnQ0waPw/exec";

  openModalBtn.onclick = () => popup.style.display = "flex";
  footerCallBtn.onclick = () => popup.style.display = "flex";
  closeBtn.onclick = () => popup.style.display = "none";
  setTimeout(() => { popup.style.display = "flex"; }, 5000);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    debug.textContent = "Sending data to Apps Script...";

    const params = new URLSearchParams({
      name: form.name.value,
      company: form.company.value,
      services: form.services.value,
      phone: form.phone.value,
      email: form.email.value,
      smsConsent: form.smsConsent.checked
    });

    const url = `${APPS_SCRIPT_URL}?${params.toString()}`;

    try {
      const res = await fetch(url, { method: "GET" });
      debug.textContent = "✅ Call booked successfully!";
      alert("✅ Call booked successfully!");
      popup.style.display = "none";
      form.reset();
      console.log("Data sent to Apps Script:", Object.fromEntries(params));
    } catch (err) {
      console.error("❌ Error sending data:", err);
      debug.textContent = `❌ Error sending data: ${err}`;
    }
  });
});
