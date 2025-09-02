document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("openModal");
  const footerCallBtn = document.getElementById("footerCall");
  const popup = document.getElementById("popup");
  const form = document.getElementById("leadForm");

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyWVSCRT8Mgzy5FFPI4FRcs-RiDwa2Uj9z1FY8QlFdTqfx8bE7xdGJVbErDEE8TG9WR3Q/exec"; // <-- replace this with your Web App URL

  // Open popup
  openModalBtn.onclick = () => popup.style.display = "flex";
  footerCallBtn.onclick = () => popup.style.display = "flex";

  // Auto popup after 5 seconds
  setTimeout(() => {
    popup.style.display = "flex";
  }, 5000);

  // Close popup
  window.closePopup = () => popup.style.display = "none";

  // Submit form
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

    console.log("Sending data:", data);

    try {
      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      const result = await res.json();
      console.log("Server response:", result);

      if(result.status === "success") {
        alert("✅ Call booked successfully!");
        form.reset();
        popup.style.display = "none";
      } else {
        alert("❌ Error sending data: " + result.message);
      }
    } catch(err) {
      console.error("❌ Error sending data:", err);
      alert("❌ Error sending data: " + err);
    }
  });
});
