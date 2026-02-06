const people = [
  {
    name: "Avery Patel",
    title: "Product Manager",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Noah Ibrahim",
    title: "Solutions Architect",
    status: "Remote",
    pill: "status-remote",
  },
  {
    name: "Lina Gomez",
    title: "People Ops",
    status: "On-site",
    pill: "status-onsite",
  },
  {
    name: "Kai Müller",
    title: "Security Analyst",
    status: "On leave",
    pill: "status-leave",
  },
  {
    name: "Zoe Carter",
    title: "Client Success",
    status: "Remote",
    pill: "status-remote",
  },
  {
    name: "Ethan Brooks",
    title: "Software Engineer",
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
