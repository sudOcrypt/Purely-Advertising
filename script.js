document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openBtn = document.getElementById("openModal");
  const footerBtn = document.getElementById("footerCall");
  const closeBtn = document.getElementById("closePopup");
  const form = document.getElementById("leadForm");
  const statusMsg = document.getElementById("formStatus");

  // Open popup
  openBtn.onclick = () => popup.style.display = "flex";
  footerBtn.onclick = () => popup.style.display = "flex";

  // Close popup
  closeBtn.onclick = () => popup.style.display = "none";

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
    console.log("Sending data to Apps Script:", data);
    statusMsg.textContent = "Sending...";

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyJaiV5ML0dLqSMThOMVzqC4myZD8zS4RgE0Tvk_Vok-oBNAGWOuIcseL4ybStC92hG7g/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();
      console.log("Response received:", result);
      statusMsg.textContent = "✅ Call booked successfully!";
      form.reset();
      setTimeout(() => popup.style.display = "none", 2000);
    } catch (err) {
      console.error("❌ Error sending data:", err);
      statusMsg.textContent = "❌ Error sending data. Check console.";
    }
  });
});
