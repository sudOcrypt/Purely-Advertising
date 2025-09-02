document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const openBtns = [document.getElementById("openModal"), document.getElementById("footerCall")];
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("leadForm");

  // Open popup
  openBtns.forEach(btn => btn.addEventListener("click", () => popup.style.display = "flex"));

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

    fetch("https://script.google.com/macros/s/AKfycbz1q5pD80jxsxkfTFNsmnjZ_S0nJ6s--NxJaKjmnahIVnYhwD3djs4qTGLPX7fp21i7Hg/exec", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        alert("✅ Thank you! Your consultation is booked! You will receive a call shortly!");
        popup.style.display = "none";
        form.reset();
      } else {
        alert("❌ Error sending data: " + data.message);
      }
    })
    .catch(err => alert("❌ Error sending data: " + err));
  });
});
