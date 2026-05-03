let otp_val = null; // global OTP storage

document.getElementById("send-otp-btn").addEventListener("click", sendOTP);

function sendOTP() {
  const email = document.getElementById("email").value.trim();
  const otpverify = document.getElementsByClassName("otpverify")[0];

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Generate a random 4-digit OTP
  otp_val = Math.floor(1000 + Math.random() * 9000);

  // Prepare the email body
  let emailbody = `<h2>Your OTP is </h2><strong>${otp_val}</strong>`;

  // Send the OTP via SMTP.js
  Email.send({
    SecureToken: "23f840e3-69a3-417d-a809-ed7496f77a2d", // replace with your valid token
    To: email,
    From: "madhujune2306@gmail.com",
    Subject: "Email Verification",
    Body: emailbody,
  }).then((message) => {
    if (message === "OK") {
      alert("OTP sent to your email " + email);

      // Show OTP input and verify button
      otpverify.style.display = "block";

      // Ensure only one listener is attached
      document.getElementById("verify-btn").onclick = function () {
        const enteredOtp = document.getElementById("otp_inp").value.trim();

        if (enteredOtp === otp_val.toString()) {
          alert("Email address verified successfully!");

          // Redirect to home page
          window.location.href = "/Home/index.html";

          // Cleanup
          otpverify.style.display = "none";
          document.getElementById("email").value = "";
          document.getElementById("otp_inp").value = "";
          otp_val = null;
        } else {
          alert("Invalid OTP. Please try again.");
        }
      };
    } else {
      alert("Failed to send OTP. Please try again later.");
    }
  });
}

// Utility function to validate email
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
