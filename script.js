document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openBtns = [document.getElementById("openModal"), document.getElementById("footerCall")];
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("leadForm");

  // Open popup
  openBtns.forEach(btn => {
    btn.addEventListener("click", () => popup.style.display = "flex");
  });

  // Close popup
  closeBtn.addEventListener("click", () => popup.style.display = "none");

  // Auto popup after 5 seconds
  setTimeout(() => { popup.style.display = "flex"; }, 5000);

  // Submit form
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("name", this.name.value);
    formData.append("company", this.company.value);
    formData.append("services", this.services.value);
    formData.append("phone", this.phone.value);
    formData.append("email", this.email.value);
    formData.append("smsConsent", this.smsConsent.checked);

    fetch("https://script.google.com/macros/s/AKfycbx5hDyuZ1M25FpwYuL52eIO5BpCaneGGuY3XDcG4GmN7v-PCSGHlwOKjp9hvMWYTzhHbA/exec", {
      method: "POST",
      body: formData
    })
    .then(() => {
      alert("✅ Thank you! Your call is booked.");
      popup.style.display = "none";
      form.reset();
    })
    .catch(err => alert("❌ Error sending data. Please try again later."));
  });
});
