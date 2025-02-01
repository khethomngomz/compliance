// Sample Data for Shops
const shops = [
  {
    name: "Mohammed's Shop",
    location: "Jabulani",
    documents: ["Business License", "Health Certificate", "Tax Certificate"],
    status: "Compliant",
    lastInspection: "2023-10-01",
  },
  {
    name: "Thembi Tuck Shop",
    location: "Dube",
    documents: ["Business License"], // Missing Health and Tax Certificates
    status: "Pending",
    lastInspection: "2023-09-15",
  },
  {
    name: "Dino Spaza",
    location: "Orlando",
    documents: [], // No documents uploaded
    status: "Non-Compliant",
    lastInspection: "2023-08-20",
  },
  {
    name: "Mam' Ruby's Shop",
    location: "Soweto",
    documents: ["Business License", "Health Certificate"],
    status: "Pending",
    lastInspection: "2023-10-10",
  },
];

// Check Compliance Status
function checkCompliance(shop) {
  const requiredDocuments = ["Business License", "Health Certificate", "Tax Certificate"];
  const hasAllDocuments = requiredDocuments.every((doc) => shop.documents.includes(doc));

  if (hasAllDocuments) {
    return "Compliant";
  } else if (shop.documents.length > 0) {
    return "Pending";
  } else {
    return "Non-Compliant";
  }
}

// Update Shop Status
function updateShopStatus(shopName, newStatus) {
  const shop = shops.find((shop) => shop.name === shopName);
  if (shop) {
    shop.status = newStatus;
    console.log(`${shopName} status updated to ${newStatus}`);
    populateShopTable(); // Refresh the table
  } else {
    console.log("Shop not found");
  }
}

// Get Badge Class Based on Status
function getStatusBadgeClass(status) {
  switch (status) {
    case "Compliant":
      return "bg-success";
    case "Non-Compliant":
      return "bg-danger";
    case "Pending":
      return "bg-warning";
    default:
      return "bg-secondary";
  }
}

// Populate Shop Table
function populateShopTable(filteredShops = shops) {
  const shopTable = document.getElementById("shopTable");
  shopTable.innerHTML = ""; // Clear existing rows

  filteredShops.forEach((shop) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${shop.name}</td>
      <td>${shop.location}</td>
      <td><span class="badge ${getStatusBadgeClass(shop.status)}">${
      shop.status
    }</span></td>
      <td>${shop.lastInspection}</td>
      <td>
        <button class="btn btn-sm btn-success" onclick="updateShopStatus('${
          shop.name
        }', 'Compliant')">Approve</button>
        <button class="btn btn-sm btn-danger" onclick="updateShopStatus('${
          shop.name
        }', 'Non-Compliant')">Reject</button>
        <button class="btn btn-sm btn-info" onclick="viewShopDetails('${
          shop.name
        }')">View Details</button>
      </td>
    `;

    shopTable.appendChild(row);
  });
}

// View Shop Details
function viewShopDetails(shopName) {
  const shop = shops.find((shop) => shop.name === shopName);
  if (shop) {
    alert(
      `Shop Details:\nName: ${shop.name}\nLocation: ${shop.location}\nStatus: ${
        shop.status
      }\nDocuments: ${shop.documents.join(", ")}`
    );
  } else {
    alert("Shop not found");
  }
}

// Search and Filter Functionality
document.getElementById("searchButton").addEventListener("click", function () {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();
  const filterStatus = document.getElementById("filterStatus").value;

  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery) ||
      shop.location.toLowerCase().includes(searchQuery);
    const matchesStatus = filterStatus ? shop.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  populateShopTable(filteredShops);
});

// Initialize Charts
function initializeCharts() {
  const complianceCtx = document.getElementById("complianceChart").getContext("2d");
  const performanceCtx = document.getElementById("performanceChart").getContext("2d");

  new Chart(complianceCtx, {
    type: "bar",
    data: {
      labels: ["Compliant", "Non-Compliant", "Pending"],
      datasets: [
        {
          label: "Number of Shops",
          data: [
            shops.filter((shop) => shop.status === "Compliant").length,
            shops.filter((shop) => shop.status === "Non-Compliant").length,
            shops.filter((shop) => shop.status === "Pending").length,
          ],
          backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  new Chart(performanceCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Compliance Rate",
          data: [65, 70, 80, 75, 85, 90], // Sample data
          borderColor: "#007bff",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

// Logout Functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
  alert("Logging out...");
  window.location.href = "index.html";
});

// Initialize Page
document.addEventListener("DOMContentLoaded", function () {
  populateShopTable();
  initializeCharts();
});
