const people = [
  {
    name: "Avery Patel",
    title: "Roadmap Storyteller",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Noah Ibrahim",
    title: "Blueprint Wizard",
    status: "Remote",
    pill: "status-remote",
  },
  {
    name: "Lina Gomez",
    title: "People Ops Spark Spark",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Kai Müller",
    title: "Security Sentinel",
    status: "On leave",
    pill: "status-leave",
  },
  {
    name: "Zoe Carter",
    title: "Client Happiness Hero",
    status: "Remote",
    pill: "status-remote",
  },
  {
    name: "Ethan Brooks",
    title: "Code Wrangler",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Mia Chen",
    title: "Chief Vibe Architect",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Leo Grant",
    title: "Director of Joy Ops",
    status: "Remote",
    pill: "status-remote",
  },
  {
    name: "Priya Shah",
    title: "Head of Snacks Strategy",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Jordan Blake",
    title: "Meeting Wrangler",
    status: "Remote",
    pill: "status-remote",
  },
  {
    name: "Nia Brooks",
    title: "Culture Catalyst",
    status: "On leave",
    pill: "status-leave",
  },
  {
    name: "Caleb Ortiz",
    title: "Workflow Wizard",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Riley Park",
    title: "Happiness Engineer",
    status: "Remote",
    pill: "status-remote",
  },
  {
    name: "Samir Khan",
    title: "Chief Playlist Curator",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Ella Ruiz",
    title: "Office Zen Master",
    status: "Remote",
    pill: "status-remote",
  },
  {
    name: "Theo Mason",
    title: "Director of Good Times",
    status: "On-site",
    pill: "status-onsite",
  },
];

const list = document.getElementById("peopleList");

if (list) {
  list.innerHTML = people
    .map(
      (person) => `
      <div class="person">
        <div>
          <strong>${person.name}</strong>
          <p class="muted">${person.title}</p>
        </div>
        <span class="status-pill ${person.pill}">${person.status}</span>
      </div>
    `,
    )
    .join("");
}

const officeData = {
  london: {
    name: "London",
    meta: "Regional HQ Â· 2nd floor, Miro Tower",
    active: 110,
    leave: 8,
    remote: 12,
    visitors: 4,
  },
  "new-york": {
    name: "New York",
    meta: "Americas HQ Â· 14th floor, Lexington Plaza",
    active: 96,
    leave: 6,
    remote: 18,
    visitors: 7,
  },
  singapore: {
    name: "Singapore",
    meta: "APAC Hub Â· Level 21, Marina Gateway",
    active: 74,
    leave: 5,
    remote: 22,
    visitors: 3,
  },
  sydney: {
    name: "Sydney",
    meta: "Oceania Studio Â· 9th floor, Harbour House",
    active: 58,
    leave: 4,
    remote: 16,
    visitors: 2,
  },
};

const officeSelect = document.getElementById("officeSelect");
const officeMeta = document.getElementById("officeMeta");
const officeActive = document.getElementById("officeActive");
const officeLeave = document.getElementById("officeLeave");
const officeRemote = document.getElementById("officeRemote");
const officeVisitors = document.getElementById("officeVisitors");

const updateOfficeSummary = (officeKey) => {
  const office = officeData[officeKey] ?? officeData.london;
  if (officeMeta) officeMeta.textContent = office.meta;
  if (officeActive) officeActive.textContent = office.active;
  if (officeLeave) officeLeave.textContent = office.leave;
  if (officeRemote) officeRemote.textContent = office.remote;
  if (officeVisitors) officeVisitors.textContent = office.visitors;
};

if (officeSelect) {
  updateOfficeSummary(officeSelect.value);
  officeSelect.addEventListener("change", (event) => {
    updateOfficeSummary(event.target.value);
  });
}

const orgPeople = [
  {
    id: "oscar-chu",
    name: "Oscar Chu",
    title: "Chief Vibe Officer",
    managerId: null,
  },
  {
    id: "harriet-lewis",
    name: "Harriet Lewis",
    title: "Region Ringmaster",
    managerId: "oscar-chu",
  },
  {
    id: "samantha-rios",
    name: "Samantha Rios",
    title: "Build Captain",
    managerId: "harriet-lewis",
  },
  {
    id: "marc-dubois",
    name: "Marc Dubois",
    title: "Numbers Navigator",
    managerId: "harriet-lewis",
  },
  {
    id: "alana-wyatt",
    name: "Alana Wyatt",
    title: "People Ops Spark Spark Lead",
    managerId: "harriet-lewis",
  },
  {
    id: "jules-schneider",
    name: "Jules Schneider",
    title: "Client Happiness Hero Lead",
    managerId: "harriet-lewis",
  },
  {
    id: "ethan-brooks",
    name: "Ethan Brooks",
    title: "Senior Code Pilot",
    managerId: "samantha-rios",
  },
  {
    id: "zoe-carter",
    name: "Zoe Carter",
    title: "Client Happiness Hero Manager",
    managerId: "jules-schneider",
  },
  {
    id: "lina-gomez",
    name: "Lina Gomez",
    title: "People Ops Spark Spark Specialist",
    managerId: "alana-wyatt",
  },
];

const orgChart = document.getElementById("orgChart");
const orgDetail = document.getElementById("orgDetail");
const orgExpandAll = document.getElementById("orgExpandAll");
const orgCollapseAll = document.getElementById("orgCollapseAll");
const orgLinks = document.getElementById("orgLinks");

if (orgChart && orgDetail) {
  const peopleById = new Map(orgPeople.map((person) => [person.id, person]));
  const reportsById = new Map();

  orgPeople.forEach((person) => {
    if (!reportsById.has(person.id)) {
      reportsById.set(person.id, []);
    }
    if (person.managerId) {
      if (!reportsById.has(person.managerId)) {
        reportsById.set(person.managerId, []);
      }
      reportsById.get(person.managerId).push(person.id);
    }
  });

  const root = orgPeople.find((person) => !person.managerId) ?? orgPeople[0];
  const collapsedIds = new Set();
  let selectedId = root.id;

  const getManagerIds = () =>
    orgPeople
      .filter((person) => (reportsById.get(person.id) ?? []).length > 0)
      .map((person) => person.id);

  const buildVisibleLevels = (startId) => {
    const levels = [];

    const walk = (personId, depth) => {
      if (!levels[depth]) {
        levels[depth] = [];
      }
      levels[depth].push(personId);

      if (collapsedIds.has(personId)) {
        return;
      }

      const reports = reportsById.get(personId) ?? [];
      reports.forEach((reportId) => walk(reportId, depth + 1));
    };

    walk(startId, 0);
    return levels;
  };

  const renderChart = () => {
    const levels = buildVisibleLevels(root.id);
    const visibleIds = new Set(levels.flat());

    orgChart.innerHTML = levels
      .map((level) => {
        const nodes = level
          .map((personId) => {
            const person = peopleById.get(personId);
            const isSelected = personId === selectedId;
            const reports = reportsById.get(personId) ?? [];
            const hasReports = reports.length > 0;
            const isCollapsed = collapsedIds.has(personId);
            return `
              <div class="org-person ${isSelected ? "is-selected" : ""}" data-org-id="${personId}">
                <button class="org-select" data-person-id="${personId}">
                  <span class="org-name">${person.name}</span>
                  <span class="org-title">${person.title}</span>
                </button>
                ${
                  hasReports
                    ? `<button class="org-toggle" data-toggle-id="${personId}" aria-label="${
                        isCollapsed ? "Expand team" : "Collapse team"
                      }">${isCollapsed ? "+" : "-"}</button>`
                    : ""
                }
              </div>
            `;
          })
          .join("");

        return `<div class="org-level">${nodes}</div>`;
      })
      .join("");

    if (orgLinks) {
      orgChart.prepend(orgLinks);
      requestAnimationFrame(() => drawConnectors(visibleIds));
    }
  };

  const renderDetail = () => {
    const person = peopleById.get(selectedId);
    if (!person) {
      orgDetail.innerHTML = "";
      return;
    }

    const manager = person.managerId ? peopleById.get(person.managerId) : null;
    const reports = (reportsById.get(person.id) ?? []).map(
      (reportId) => peopleById.get(reportId)?.name,
    );

    orgDetail.innerHTML = `
      <div class="org-detail-card">
        <p class="eyebrow">Selected teammate</p>
        <h3>${person.name}</h3>
        <p class="muted">${person.title}</p>
        <div class="org-detail-grid">
          <div>
            <p class="label">Reports to</p>
            <p class="value">${manager ? manager.name : "None"}</p>
          </div>
          <div>
            <p class="label">Direct reports</p>
            <p class="value">${reports.length ? reports.join(", ") : "None"}</p>
          </div>
        </div>
      </div>
    `;
  };

  orgChart.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-toggle-id]");
    if (toggle) {
      const toggleId = toggle.getAttribute("data-toggle-id");
      if (toggleId) {
        if (collapsedIds.has(toggleId)) {
          collapsedIds.delete(toggleId);
        } else {
          collapsedIds.add(toggleId);
        }
        renderChart();
      }
      return;
    }

    const target = event.target.closest("[data-person-id]");
    if (!target) {
      return;
    }
    const personId = target.getAttribute("data-person-id");
    if (personId && peopleById.has(personId)) {
      selectedId = personId;
      renderChart();
      renderDetail();
    }
  });

  renderChart();
  renderDetail();

  if (orgLinks) {
    window.addEventListener("resize", () => drawConnectors());
  }

  if (orgExpandAll) {
    orgExpandAll.addEventListener("click", () => {
      collapsedIds.clear();
      renderChart();
    });
  }

  if (orgCollapseAll) {
    orgCollapseAll.addEventListener("click", () => {
      getManagerIds().forEach((id) => collapsedIds.add(id));
      renderChart();
    });
  }
}

function drawConnectors(passedVisibleIds) {
  if (!orgChart || !orgLinks) {
    return;
  }

  const visibleIds = passedVisibleIds;
  const chartRect = orgChart.getBoundingClientRect();
  const nodes = Array.from(orgChart.querySelectorAll("[data-org-id]"));
  const nodeMap = new Map(
    nodes.map((node) => [node.getAttribute("data-org-id"), node]),
  );

  orgLinks.setAttribute("width", `${chartRect.width}`);
  orgLinks.setAttribute("height", `${chartRect.height}`);
  orgLinks.setAttribute("viewBox", `0 0 ${chartRect.width} ${chartRect.height}`);
  orgLinks.innerHTML = "";

  orgPeople.forEach((person) => {
    if (!person.managerId) {
      return;
    }
    if (visibleIds && (!visibleIds.has(person.id) || !visibleIds.has(person.managerId))) {
      return;
    }

    const managerNode = nodeMap.get(person.managerId);
    const reportNode = nodeMap.get(person.id);
    if (!managerNode || !reportNode) {
      return;
    }

    const managerRect = managerNode.getBoundingClientRect();
    const reportRect = reportNode.getBoundingClientRect();
    const startX = managerRect.left - chartRect.left + managerRect.width / 2;
    const startY = managerRect.bottom - chartRect.top;
    const endX = reportRect.left - chartRect.left + reportRect.width / 2;
    const endY = reportRect.top - chartRect.top;
    const midY = startY + (endY - startY) * 0.5;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`,
    );
    path.setAttribute("class", "org-link");
    orgLinks.appendChild(path);
  });
}


