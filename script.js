document.addEventListener("DOMContentLoaded", () => {
  const openModal = document.getElementById("openModal");
  const footerCall = document.getElementById("footerCall");
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("leadForm");

  // Auto popup after 5 seconds
  setTimeout(() => {
    popup.style.display = "flex";
  }, 5000);

  // Open popup
  openModal.addEventListener("click", () => popup.style.display = "flex");
  footerCall.addEventListener("click", () => popup.style.display = "flex");

  // Close popup
  closeBtn.addEventListener("click", () => popup.style.display = "none");

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

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxnm_Uweh_51C0TgSdfxYYVkM9iNCD30FMfqk3rWB5uIluX9oLimvy-uoSVqOAZhPC5Zg/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if(result.result === "success"){
        alert("✅ Thank you! Your call is booked.");
        popup.style.display = "none";
        form.reset();
      } else {
        alert("❌ Error sending data: " + (result.error || "Unknown error"));
      }
    } catch(err) {
      alert("❌ Error sending data: " + err);
    }
  });
});
