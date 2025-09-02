document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openModalBtn = document.getElementById("openModal");
  const footerCallBtn = document.getElementById("footerCall");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("leadForm");

  // Open popup on button clicks
  openModalBtn.addEventListener("click", () => popup.style.display = "flex");
  footerCallBtn.addEventListener("click", () => popup.style.display = "flex");

  // Auto-open popup after 5 seconds
  setTimeout(() => popup.style.display = "flex", 5000);

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

    console.log("Sending data to Apps Script:", data);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzWRFcYwLm8x556kvpJ74DPsHxQjSnvjFl_a_81WD9VmWXdbpYwrcCnvczpPeljcYJe7A/exec",
        {
          method: "POST",
          mode: "no-cors", // avoids CORS errors with Apps Script
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      console.log("Response received:", response);
      alert("✅ Thank you! Your call is booked.");
      popup.style.display = "none";
      form.reset();
    } catch (err) {
      console.error("❌ Error sending data:", err);
      alert("❌ Error sending data. Please check console for details.");
    }
  });
});
