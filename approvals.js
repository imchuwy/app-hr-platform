const myRequests = [
  { request: "WFH · Feb 10", submitted: "Today 9:12 AM", status: "Pending" },
  { request: "Holiday · Jan 22–24", submitted: "Jan 8", status: "Approved" },
  { request: "Conference · Lisbon", submitted: "Dec 18", status: "Approved" },
  { request: "Sick leave · Feb 1", submitted: "Jan 31", status: "Recorded" },
];

const teamRequests = [
  { employee: "Ava Patel", request: "Holiday · Mar 3–7", submitted: "Today 8:41 AM", status: "Pending" },
  { employee: "Mateo Alvarez", request: "Equipment · Standing desk", submitted: "Yesterday", status: "Review" },
  { employee: "Priya Singh", request: "WFH · Feb 12", submitted: "Today 7:55 AM", status: "Pending" },
  { employee: "Yuki Tanaka", request: "Travel · Client visit", submitted: "Feb 3", status: "Review" },
];

const myBody = document.getElementById("myRequests");
const teamBody = document.getElementById("teamRequests");

const renderRows = (rows, target, dateKey, includeEmployee) => {
  if (!target) {
    return;
  }

  target.innerHTML = rows
    .map(
      (row) => `
        <tr>
          ${includeEmployee ? `<td>${row.employee}</td>` : ""}
          <td>${row.request}</td>
          <td>${row[dateKey]}</td>
          <td><span class="status-pill status-${row.status.toLowerCase()}">${row.status}</span></td>
        </tr>
      `,
    )
    .join("");
};

renderRows(myRequests, myBody, "submitted", false);
renderRows(teamRequests, teamBody, "submitted", true);
