async function loadRegistrations() {
  try {
    const response = await fetch(
      "https://codestrom-production.up.railway.app/api/admin/dashboard"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log(data);

    renderRegistrations(data); // your existing render function
  } catch (error) {
    console.error(error);
    document.getElementById("output").innerText = "Error loading data";
  }
}
