const output = document.getElementById("output");
const loadBtn = document.getElementById("loadBtn");

loadBtn.addEventListener("click", loadData);

async function loadData() {
    output.innerHTML = "Loading...";

    try {
        const res = await ffetch("https://codestrom-production.up.railway.app/api/admin/dashboard");

        const data = await res.json();

        output.innerHTML = "";

        data.forEach(team => {
            const div = document.createElement("div");
            div.className = "team";

            div.innerHTML = `
        <h3>Team: ${team.team_name}</h3>
        <p><b>Leader:</b> ${team.leader_name}</p>
        <p><b>Email:</b> ${team.email}</p>
        <p><b>Phone:</b> ${team.phone}</p>
        <p><b>College:</b> ${team.college}</p>
        <p><b>Track:</b> ${team.track}</p>
        <p><b>Team Size:</b> ${team.team_size}</p>
        <h4>Members:</h4>
      `;

            team.members.forEach(m => {
                const mDiv = document.createElement("div");
                mDiv.className = "member";
                mDiv.innerHTML = `
          - ${m.name} | ${m.branch} | ${m.gender}
        `;
                div.appendChild(mDiv);
            });

            output.appendChild(div);
        });

    } catch (err) {
        output.innerHTML = "Error loading data";
        console.error(err);
    }
}
