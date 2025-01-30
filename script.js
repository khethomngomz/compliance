// Translation Data
const translations = {
  en: {
    welcome: "Welcome to Spaza Shop Compliance",
    search: "Search for shops",
    complianceBadge: "Compliance Badge",
    comments: "Comments",
    qrTitle: "Scan QR Code",
    home: "Home",
    back: "Back",
  },
  zu: {
    welcome: "Siyakwamukela ku-Spaza Shop Compliance",
    search: "Sesha izitolo",
    complianceBadge: "Ibheji Yokulandela Imithetho",
    comments: "Izimpendulo",
    qrTitle: "Skena ikhodi ye-QR",
    home: "Ikhaya",
    back: "Emuva",
  },
  so: {
    welcome: "Ku soo dhawoow Spaza Shop Compliance",
    search: "Raadso dukaanno",
    complianceBadge: "Calanka Isku-xidhka",
    comments: "Faallooyinka",
    qrTitle: "Scan QR Code",
    home: "Bogga Hore",
    back: "Soo Noqo",
  },
};

let currentLanguage = "en"; // Default language

// Change language function
function changeLanguage(lang) {
  currentLanguage = lang;

  // Update all text based on the selected language
  document.getElementById("qrTitle").textContent = translations[lang].qrTitle;
  document.getElementById("search").textContent = translations[lang].search;
  document.getElementById("complianceBadge").textContent =
    translations[lang].complianceBadge;
  document.getElementById("comments").textContent = translations[lang].comments;
  document.getElementById("homeButton").textContent = translations[lang].home;
  document.getElementById("backButton").textContent = translations[lang].back;
}

// Set event listeners for language change
document.getElementById("lang-en").addEventListener("click", function () {
  changeLanguage("en");
});
document.getElementById("lang-zu").addEventListener("click", function () {
  changeLanguage("zu");
});
document.getElementById("lang-so").addEventListener("click", function () {
  changeLanguage("so");
});

// Initialize Google Maps
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -26.2041, lng: 28.0473 }, // Default location
    zoom: 12,
  });

  // Add marker logic for search results
  const shops = [
    { name: "Mohammeds Shop", location: "Jabulani", lat: -26.2041, lng: 28.0473 },
    { name: "Achmed's", location: "Dube", lat: -29.8587, lng: 31.0218 },
    { name: "Mam' Ruby's", location: "Orlando", lat: -33.9249, lng: 18.4241 },
  ];

  document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const results = shops.filter((shop) => shop.location.toLowerCase().includes(query));
    document.getElementById("searchResults").innerHTML = "";
    results.forEach((shop) => {
      const p = document.createElement("p");
      p.textContent = `${shop.name} - ${shop.location}`;
      p.onclick = () => loadStoreCompliance(shop);
      document.getElementById("searchResults").appendChild(p);
      new google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
        map: map,
        title: shop.name,
      });
    });
  });
}

// QR Code Scanner
const video = document.getElementById("qrScanner");
const canvas = document.getElementById("qrCanvas");
const qrResult = document.getElementById("qrResult");

navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
    requestAnimationFrame(scanQR);
  })
  .catch((err) => {
    qrResult.textContent = "Error accessing camera: " + err.message;
  });

function scanQR() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      qrResult.textContent = "Scanned QR Code: " + code.data;
      loadStoreComplianceByQRCode(code.data);
    }
  }
  requestAnimationFrame(scanQR);
}

// Load Store Compliance
function loadStoreCompliance(shop) {
  document.getElementById("complianceSection").style.display = "block";
  document.getElementById("qrSection").style.display = "none";
  document.getElementById("searchSection").style.display = "none";

  document.getElementById("shopName").textContent = "Shop Name: " + shop.name;
  document.getElementById("ownerName").textContent = "Owner: SpazaOwner";
  document.getElementById("email").textContent = "Email: spaza@gmail.com";
  document.getElementById("phone").textContent = "Phone: 070-456-7890";
  document.getElementById("opened").textContent = "Opened: 2020";
}

// Handle Comment Submission
document.getElementById("submitComment").addEventListener("click", () => {
  const comment = document.getElementById("commentInput").value;
  if (comment) {
    const commentSection = document.getElementById("commentSection");
    const newComment = document.createElement("p");
    newComment.textContent = comment;
    commentSection.appendChild(newComment);
    document.getElementById("commentInput").value = "";
  }
});

// Handle Home and Back buttons
document.getElementById("homeButton").addEventListener("click", function () {
  window.location.href = "index.html"; // Redirects to home page
});
document.getElementById("backButton").addEventListener("click", function () {
  window.history.back(); // Simulates pressing the browser's back button
});
