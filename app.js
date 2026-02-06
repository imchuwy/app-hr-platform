const officeData = {
  london: {
    name: "London",
    time: "14:32",
    personnel: "120",
    availability: "110 active",
    holiday: "Bank Holiday · 5 May",
  },
  newyork: {
    name: "New York",
    time: "09:32",
    personnel: "96",
    availability: "88 active",
    holiday: "Memorial Day · 27 May",
  },
  singapore: {
    name: "Singapore",
    time: "21:32",
    personnel: "74",
    availability: "70 active",
    holiday: "Vesak Day · 22 May",
  },
  sydney: {
    name: "Sydney",
    time: "23:32",
    personnel: "62",
    availability: "54 active",
    holiday: "King's Birthday · 10 Jun",
  },
};

const markers = document.querySelectorAll(".office-marker");
const popup = document.getElementById("globePopup");
const officeName = document.getElementById("officeName");
const officeTime = document.getElementById("officeTime");
const officePersonnel = document.getElementById("officePersonnel");
const officeAvailability = document.getElementById("officeAvailability");
const officeHoliday = document.getElementById("officeHoliday");
const officeLink = document.getElementById("officeLink");

const updateOffice = (key) => {
  const data = officeData[key];
  if (!data) {
    return;
  }
  officeName.textContent = data.name;
  officeTime.textContent = data.time;
  officePersonnel.textContent = data.personnel;
  officeAvailability.textContent = data.availability;
  officeHoliday.textContent = data.holiday;
  officeLink.textContent = `View ${data.name} office`;
  officeLink.href = `office.html?office=${key}`;
};

markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    markers.forEach((item) => item.classList.remove("is-selected"));
    marker.classList.add("is-selected");
    updateOffice(marker.dataset.office);
    popup.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

updateOffice("london");
