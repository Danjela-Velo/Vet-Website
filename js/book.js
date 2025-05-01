// Popup (lloji alert) kur përdoruesi klikon butonin "book"
document.addEventListener("DOMContentLoaded", function () {
  const bookButton = document.getElementById("bookButton");

  if (bookButton) {
    bookButton.addEventListener("click", function () {
      alert("Book now and get 10% off");
      window.location.href = "book.html"; 
    });
  }
});

// Ky kod shton nje timer kur perdoruesi klikon për të rezervuar takim.
// Fillimisht shfaqet një mesazh "Processing...", dhe pas 3 sekondash përdoruesi ridrejtohet automatikisht te faqja book.html.
document.addEventListener("DOMContentLoaded", function () {
  const startTimer = document.getElementById("start-timer");
  const eventResult = document.getElementById("event-result");

  if (startTimer && eventResult) {
      startTimer.addEventListener("click", function(event) {
          event.preventDefault();
          eventResult.innerHTML = "<p>Processing your request...</p>";

          setTimeout(function() {
              eventResult.innerHTML = "<p>Your appointment is being processed...</p>";
              window.location.href = "book.html";
          },3000);
      });
  } else {
      console.error("Elementi nuk u gjet: Kontrollo ID-të në HTML!");
  }
});

// Konfigurimi per ngarkimin e skedareve (drag and drop)
const dropZone = document.getElementById("profile-picture").parentElement;
const fileInput = document.getElementById("profile-picture");

// Parandalon veprimet automatike te shfletuesit gjate terheqjes se elementeve (drag)
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
  }
});

// Procesi i dergimit te te dhenave te formularit
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Fushat tekstuale dhe numerike
  const fields = ["first-name", "last-name", "email", "phone", "pass1", "pass2", "age"];
  let valid = true;

  for (let id of fields) {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      alert(`Field ${id} cannot be empty.`);
      valid = false;
      return;
    }
  }

  //Gjinia
  const gender = document.querySelector('input[name="account-type"]:checked');
  if (!gender) {
    alert("Please select the pet's gender.");
    return;
  }

  // Password
  const pass1 = document.getElementById("pass1").value;
  const pass2 = document.getElementById("pass2").value;
  if (pass1 !== pass2) {
    alert("Passwords do not match.");
    return;
  }

  // Zgjedhja e species se kafshes
  const species = document.getElementById("species").value;
  if (species === "select") {
    alert("Please select a species.");
    return;
  }

  // Phone
  const phone = document.getElementById("phone").value;
  const phoneRegex = /^[0-9]{3}-[0-9]{7}$/;
  if (!phoneRegex.test(phone)) {
    alert("Phone format must be XXX-XXXXXXX.");
    return;
  }

  // Email
  const email = document.getElementById("email").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Email is not in the correct format.");
    return;
  }

  // Pastron rezultatet e meparshme nese ekzistojne, perpara shfaqjes se rezultateve te reja
  const previousOutputs = document.querySelectorAll(".output-box");
  previousOutputs.forEach(el => el.remove());

  // Shfaq informacionin duke manipuluar DOM-in (Document Object Model)
  const output = document.createElement("div");
  output.className = "output-box";
  output.innerHTML = `
    <h3>Submitted Information:</h3>
    <p><strong>First Name:</strong> ${document.getElementById("first-name").value}</p>
    <p><strong>Last Name:</strong> ${document.getElementById("last-name").value}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Species:</strong> ${species}</p>
    <p><strong>Gender:</strong> ${gender.value}</p>
    <p><strong>Problem:</strong> ${document.getElementById("bio").value}</p>
  `;

  const uploadedFile = fileInput.files[0];
  if (uploadedFile && uploadedFile.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Pet Image";
      img.style.maxWidth = "200px";
      img.style.display = "block";
      img.style.margin = "0 auto";
      output.appendChild(img);
    };
    reader.readAsDataURL(uploadedFile);
  }

  document.body.appendChild(output);

  console.log("Data was successfully submitted!");

  // Rinderto formularin pas dergimit, duke fshire te dhenat e futura
  form.reset();
});

// Klikimi i butonit submit tek Forma
function playAudio() {
  const audio = document.getElementById("audio");
  audio.play();
}