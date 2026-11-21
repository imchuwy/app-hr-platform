const people = [
  { name: "Alex Morgan", title: "Chief Vibe Officer", location: "London" },
  { name: "Ava Patel", title: "Schedule Wrangler", location: "London" },
  { name: "Mateo Alvarez", title: "Spreadsheet Sorcerer", location: "Austin" },
  { name: "Yuki Tanaka", title: "Talent Magnet", location: "Tokyo" },
  { name: "Lena Fischer", title: "Compensation Alchemist", location: "Berlin" },
  { name: "Noah Brooks", title: "Policy Peacekeeper", location: "Toronto" },
  { name: "Priya Singh", title: "Benefits Bard", location: "Singapore" },
  { name: "Amira Hassan", title: "Learning Launchpad Lead", location: "Dubai" },
  { name: "Ethan Ross", title: "Headcount Pathfinder", location: "Chicago" },
  { name: "Sofia Mendes", title: "Experience Curator", location: "Lisbon" },
];

const tableBody = document.getElementById("peopleTableBody");
const sortButtons = document.querySelectorAll("[data-sort-key]");
const sortState = {
  key: "name",
  direction: "asc",
};

const compareValues = (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" });

const renderTable = () => {
  if (!tableBody) {
    return;
  }

  const sorted = [...people].sort((left, right) => {
    const result = compareValues(left[sortState.key], right[sortState.key]);
    return sortState.direction === "asc" ? result : -result;
  });

  tableBody.innerHTML = sorted
    .map(
      (person) => `
        <tr>
          <td>${person.name}</td>
          <td>${person.title}</td>
          <td>${person.location}</td>
        </tr>
      `,
    )
    .join("");
};

const updateSortUI = () => {
  sortButtons.forEach((button) => {
    const key = button.dataset.sortKey;
    const th = button.closest("th");
    if (!key || !th) {
      return;
    }

    if (key === sortState.key) {
      button.dataset.direction = sortState.direction;
      th.setAttribute("aria-sort", sortState.direction === "asc" ? "ascending" : "descending");
    } else {
      button.dataset.direction = "";
      th.setAttribute("aria-sort", "none");
    }
  });
};

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.sortKey;
    if (!key) {
      return;
    }

    if (sortState.key === key) {
      sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
    } else {
      sortState.key = key;
      sortState.direction = "asc";
    }

    updateSortUI();
    renderTable();
  });
});

updateSortUI();
renderTable();


