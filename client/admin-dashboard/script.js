const API_URL = "https://codestrom-production.up.railway.app";

async function loadRegistrations() {
  try {
    const response = await fetch(`${API_URL}/api/admin/dashboard`);

    if (!response.ok) {
      throw new Error("Failed to load data");
    }

    const data = await response.json();
    console.log("DATA FROM SERVER:", data);

    renderRegistrations(data);
  } catch (err) {
    console.error(err);
    alert("Error loading data");
  }
}
