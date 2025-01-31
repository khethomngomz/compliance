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
  document.getElementById("ownerName").textContent = "Owner:" + shop.owner;
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
    commentSection.appendChild(newComment); // Translation Data
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

    // Static store data (used in combination with Google Maps search)
    const staticShops = [
      { name: "Mohammed's Shop", location: "Jabulani", lat: -26.2041, lng: 28.0473 },
      { name: "Achmed's Shop", location: "Dube", lat: -29.8587, lng: 31.0218 },
      { name: "Mam' Ruby's Shop", location: "Orlando", lat: -33.9249, lng: 18.4241 },
    ];

    // Initialize Google Maps and Get User Location
    let map;
    let userLocation;

    function initMap() {
      // Ask for the user's location when the page loads
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // User allowed location access, get the coordinates
            userLocation = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            // Initialize the map centered around the user's location
            map = new google.maps.Map(document.getElementById("map"), {
              center: userLocation,
              zoom: 12,
            });

            // Display the user's location on the map
            new google.maps.Marker({
              position: userLocation,
              map: map,
              title: "Your Location",
            });

            // Call the function to search nearby shops based on the user's location
            searchNearbyShops(userLocation);
          },
          function () {
            // User denied location access or there's an error
            alert("Unable to retrieve your location.");
          }
        );
      }
    }

    // Function to search nearby shops based on user's location
    function searchNearbyShops(userLocation) {
      const resultsContainer = document.getElementById("searchResults");
      resultsContainer.innerHTML = ""; // Clear previous results

      // Add static store data (for testing purposes)
      staticShops.forEach((shop) => {
        const shopLocation = new google.maps.LatLng(shop.lat, shop.lng);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          userLocation,
          shopLocation
        );

        // Only show shops within 10 km from the user's location
        if (distance <= 10000) {
          const shopButton = document.createElement("button");
          shopButton.textContent = `${shop.name} - ${shop.location}`;
          shopButton.classList.add("btn", "btn-info", "mt-2");
          shopButton.onclick = () => loadStoreCompliance(shop);
          resultsContainer.appendChild(shopButton);

          // Mark shop on the map
          new google.maps.Marker({
            position: shopLocation,
            map: map,
            title: shop.name,
          });
        }
      });
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

document.addEventListener("DOMContentLoaded", () => {
  // Save Shop Details

  document.getElementById("shopForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const shopDetails = {
      name: document.getElementById("shopName").value,

      location: document.getElementById("shopLocation").value,

      contact: document.getElementById("shopContact").value,
    };

    localStorage.setItem("shopDetails", JSON.stringify(shopDetails));

    alert("Shop details saved!");
  });

  // Load Shop Details

  const savedShop = JSON.parse(localStorage.getItem("shopDetails"));

  if (savedShop) {
    document.getElementById("shopName").value = savedShop.name;

    document.getElementById("shopLocation").value = savedShop.location;

    document.getElementById("shopContact").value = savedShop.contact;
  }

  // File Upload Simulation

  document.getElementById("uploadFile").addEventListener("click", () => {
    const fileInput = document.getElementById("complianceFile");

    if (fileInput.files.length === 0) {
      alert("Please select a file first.");

      return;
    }

    // Simulating upload

    setTimeout(() => {
      document.getElementById("uploadStatus").textContent = "Upload successful!";
    }, 1000);
  });

  // Simulating Comments from Customers

  const comments = ["Good service!", "Your shop is clean!", "Stock variety is great."];

  const commentList = document.getElementById("commentList");

  comments.forEach((comment) => {
    const li = document.createElement("li");

    li.className = "list-group-item";

    li.textContent = comment;

    commentList.appendChild(li);
  });

  // Simulated Analytics

  document.getElementById("searchCount").textContent = Math.floor(Math.random() * 100);

  document.getElementById("reviewCount").textContent = comments.length;

  // Logout Functionality

  document.getElementById("logoutBtn").addEventListener("click", () => {
    alert("Logging out...");

    window.location.href = "login.html"; // Redirect to login page
  });
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const errorMessage = document.getElementById("errorMessage");

  // Check credentials and redirect accordingly
  if (username === "client" && password === "cside") {
    window.location.href = "client.html"; // Redirect to client page
  } else if (username === "admin" && password === "aside") {
    window.location.href = "admin.html"; // Redirect to admin page
  } else if (username === "owner" && password === "oside") {
    window.location.href = "spaza.html"; // Redirect to spaza owner page
  } else {
    errorMessage.textContent = "Invalid username or password. Please try again.";
  }
});
