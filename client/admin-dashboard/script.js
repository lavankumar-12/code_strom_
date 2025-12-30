// BUTTON CLICK CONNECTION
document.getElementById("loadBtn").addEventListener("click", loadRegistrations);

// FETCH DATA FROM BACKEND
async function loadRegistrations() {
    try {
        const response = await fetch(
            "https://codestrom-production.up.railway.app/api/admin/dashboard"
        );

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

// DISPLAY DATA ON PAGE
function renderRegistrations(data) {
    const output = document.getElementById("output");
    output.innerHTML = "";

    data.forEach(team => {
        output.innerHTML += `
            <div style="border:1px solid #ccc; padding:15px; margin:10px;">
                <h3>Team: ${team.team_name}</h3>
                <p><b>Leader:</b> ${team.leader_name}</p>
                <p><b>Email:</b> ${team.email}</p>
                <p><b>Phone:</b> ${team.phone}</p>
                <p><b>College:</b> ${team.college}</p>
                <p><b>Track:</b> ${team.track}</p>
                <p><b>Team Size:</b> ${team.team_size}</p>

                <h4>Members:</h4>
                <ul>
                    ${team.members.map(m =>
            `<li>${m.name} | ${m.branch} | ${m.gender}</li>`
        ).join("")
            }
                </ul>
            </div>
        `;
    });
}
