document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openModal = document.getElementById("openModal");
  const footerCall = document.getElementById("footerCall");
  const closePopupBtn = document.getElementById("closePopup");
  const form = document.getElementById("leadForm");

  // Open popup
  openModal.onclick = () => popup.style.display = "flex";
  footerCall.onclick = () => popup.style.display = "flex";

  // Close popup
  closePopupBtn.onclick = () => popup.style.display = "none";

  // Auto popup after 5 seconds
  setTimeout(() => { popup.style.display = "flex"; }, 5000);

  // Submit form via fetch
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

    console.log("Sending data to Apps Script:", data);

    fetch("https://script.google.com/macros/s/AKfycbwQxRzzfRq0jYsRZfqEtUL8mgmE3l_bga7k04Jj9vdWpK1XBUF6QwaECXXJz7J1SrWoPQ/exec", {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log("Response received:", result);
      if(result.status === "success") {
        alert("✅ Thank you! Your call is booked.");
        form.reset();
        popup.style.display = "none";
      } else {
        alert("❌ Error sending data: " + result.message);
      }
    })
    .catch(err => {
      console.error("❌ Error sending data:", err);
      alert("❌ Error sending data. Check console for details.");
    });
  });
});
