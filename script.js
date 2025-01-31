// Search Functionality
document.getElementById("searchButton").addEventListener("click", function () {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const shops = [
    { name: "Mohammed's Shop", location: "Jabulani", page: "compliance.html" },
    { name: "Thembi Tuck Shop", location: "Dube", page: "thembi-compliance.html" },
    { name: "Dino Spaza", location: "Orlando", page: "dino-compliance.html" },
  ];

  // Find the shop that matches the search query
  const result = shops.find(
    (shop) =>
      shop.name.toLowerCase().includes(query) ||
      shop.location.toLowerCase().includes(query)
  );

  if (result) {
    // Redirect to the corresponding compliance page
    window.location.href = result.page;
  } else {
    alert(translations[currentLanguage].noResults); // Use the translated 'No results' message
  }
});

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

// Static store data (used in combination with Google Maps search)
const staticShops = [
  { name: "Mohammed's Shop", location: "Jabulani", lat: -26.2041, lng: 28.0473 },
  { name: "Achmed's Shop", location: "Dube", lat: -29.8587, lng: 31.0218 },
  { name: "Mam' Ruby's Shop", location: "Orlando", lat: -33.9249, lng: 18.4241 },
];

// Initialize Google Maps and Get User Location
let map;
let service;
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

        // Search for spaza shops near the user's location
        service = new google.maps.places.PlacesService(map);
        const request = {
          location: userLocation,
          radius: 5000, // 5 km radius
          type: ["store"],
        };

        service.nearbySearch(request, handleSearchResults);
      },
      function () {
        // User denied location access or there's an error
        alert("Unable to retrieve your location.");
      }
    );
  }
}

// Handle search results from both static data and places search
function handleSearchResults(results, status) {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (status === google.maps.places.PlacesServiceStatus.OK) {
    // Add Google Places search results
    results.forEach((place) => {
      const placeName = place.name.toLowerCase();
      if (placeName.includes(searchInput)) {
        const shopButton = document.createElement("button");
        shopButton.textContent = place.name;
        shopButton.classList.add("btn", "btn-info", "mt-2");
        shopButton.onclick = () => loadStoreCompliance(place);
        resultsContainer.appendChild(shopButton);

        new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
        });
      }
    });
  }

  // Add static store data (if they match search input)
  staticShops.forEach((shop) => {
    if (shop.location.toLowerCase().includes(searchInput)) {
      const shopButton = document.createElement("button");
      shopButton.textContent = `${shop.name} - ${shop.location}`;
      shopButton.classList.add("btn", "btn-info", "mt-2");
      shopButton.onclick = () => loadStoreCompliance(shop);
      resultsContainer.appendChild(shopButton);

      new google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
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
