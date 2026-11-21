const officeData = {
  london: {
    name: "London",
    time: "Tue 14:32",
    personnel: "120",
    availability: "110 active",
    holiday: "Bank Holiday - 5 May",
  },
  bulgaria: {
    name: "Bulgaria",
    time: "Tue 16:32",
    personnel: "48",
    availability: "41 active",
    holiday: "Unification Day - 6 Sep",
  },
  cyprus: {
    name: "Cyprus",
    time: "Tue 16:32",
    personnel: "36",
    availability: "30 active",
    holiday: "Green Monday - 11 Mar",
  },
  dubai: {
    name: "Dubai",
    time: "Tue 18:32",
    personnel: "54",
    availability: "47 active",
    holiday: "Eid Al Adha - 17 Jun",
  },
  singapore: {
    name: "Singapore",
    time: "Tue 21:32",
    personnel: "74",
    availability: "70 active",
    holiday: "Vesak Day - 22 May",
  },
  sydney: {
    name: "Sydney",
    time: "Wed 00:32",
    personnel: "62",
    availability: "54 active",
    holiday: "King's Birthday - 10 Jun",
  },
};

const globe = document.getElementById("globe");
const canvas = document.getElementById("globeCanvas");
const markers = document.querySelectorAll(".office-marker");
const officePicker = document.getElementById("globeOffice");
const officeName = document.getElementById("officeName");
const officeTime = document.getElementById("officeTime");
const officePersonnel = document.getElementById("officePersonnel");
const officeAvailability = document.getElementById("officeAvailability");
const officeHoliday = document.getElementById("officeHoliday");
const officeLink = document.getElementById("officeLink");
const requestButton = document.getElementById("requestButton");
const requestModal = document.getElementById("requestModal");
const requestForm = document.getElementById("requestForm");

const ctx = canvas.getContext("2d", { willReadFrequently: true });
const texture = new Image();
const textureCanvas = document.createElement("canvas");
const textureCtx = textureCanvas.getContext("2d");

const state = {
  rotationLon: -0.6,
  rotationLat: 0.18,
  velocityLon: 0,
  velocityLat: 0,
  dragging: false,
  lastX: 0,
  lastY: 0,
};

let textureData = null;
let frameData = null;
let needsRender = true;

const updateOffice = (key) => {
  const data = officeData[key];
  if (!data) {
    return;
  }
  officePicker.value = key;
  markers.forEach(marker => {
    const selected = marker.dataset.office === key;
    marker.classList.toggle("is-selected", selected);
    marker.setAttribute("aria-pressed", String(selected));
  });
  officeName.textContent = data.name;
  officeTime.textContent = data.time;
  officePersonnel.textContent = data.personnel;
  officeAvailability.textContent = data.availability;
  officeHoliday.textContent = data.holiday;
  officeLink.textContent = `View ${data.name} office`;
  officeLink.href = `office.html?office=${key}`;
};

markers.forEach((marker) => {
  marker.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });
  marker.addEventListener("click", () => {
    updateOffice(marker.dataset.office);
  });
});

updateOffice("london");
officePicker.addEventListener("change", () => {
  const marker = [...markers].find(item => item.dataset.office === officePicker.value);
  state.rotationLon = -Number(marker.dataset.lon) * Math.PI / 180;
  state.rotationLat = Number(marker.dataset.lat) * Math.PI / 180;
  state.velocityLon = state.velocityLat = 0;
  needsRender = true;
  updateOffice(officePicker.value);
});

requestButton.addEventListener("click", () => requestModal.showModal());
requestModal.querySelectorAll("[data-modal-close]").forEach(button => {
  button.addEventListener("click", () => requestModal.close());
});
const { startDate, endDate } = requestForm.elements;
startDate.addEventListener("input", () => { endDate.min = startDate.value; });
requestForm.addEventListener("submit", event => {
  event.preventDefault();
  requestModal.close();
  requestForm.reset();
  endDate.removeAttribute("min");
  document.getElementById("requestFeedback").textContent = "Sample request completed.";
});

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const toRad = (deg) => (deg * Math.PI) / 180;

const setCanvasSize = () => {
  if (!globe) {
    return;
  }
  const size = globe.clientWidth || 360;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  frameData = null;
  needsRender = true;
};

if (globe) {
  const resizeObserver = new ResizeObserver(setCanvasSize);
  resizeObserver.observe(globe);
  setCanvasSize();
}

const updateMarkers = (centerX, centerY, radius) => {
  if (!markers.length) {
    return;
  }
  const scale = (globe?.clientWidth || radius * 2) / (radius * 2);
  const cosLon = Math.cos(state.rotationLon);
  const sinLon = Math.sin(state.rotationLon);
  const cosLat = Math.cos(state.rotationLat);
  const sinLat = Math.sin(state.rotationLat);

  markers.forEach((marker) => {
    const lat = toRad(parseFloat(marker.dataset.lat));
    const lon = toRad(parseFloat(marker.dataset.lon));
    const x = Math.cos(lat) * Math.sin(lon);
    const y = Math.sin(lat);
    const z = Math.cos(lat) * Math.cos(lon);

    const x1 = x * cosLon + z * sinLon;
    const z1 = -x * sinLon + z * cosLon;
    const y1 = y * cosLat - z1 * sinLat;
    const z2 = y * sinLat + z1 * cosLat;

    if (z2 <= 0.02) {
      marker.classList.add("is-hidden");
      return;
    }

    marker.classList.remove("is-hidden");
    const screenX = (centerX + x1 * radius) * scale;
    const screenY = (centerY - y1 * radius) * scale;
    const scaleFactor = 0.85 + z2 * 0.15;
    marker.style.left = `${screenX}px`;
    marker.style.top = `${screenY}px`;
    marker.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
  });
};

const render = () => {
  if (!ctx || !canvas) {
    return;
  }
  const width = canvas.width;
  const height = canvas.height;
  if (!width || !height) {
    return;
  }

  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  if (!textureData) {
    ctx.clearRect(0, 0, width, height);
    updateMarkers(centerX, centerY, radius);
    return;
  }

  if (!frameData || frameData.width !== width || frameData.height !== height) {
    frameData = ctx.createImageData(width, height);
  }

  const data = frameData.data;
  const texData = textureData.data;
  const texW = textureData.width;
  const texH = textureData.height;
  const invLon = -state.rotationLon;
  const invLat = -state.rotationLat;
  const cosLon = Math.cos(invLon);
  const sinLon = Math.sin(invLon);
  const cosLat = Math.cos(invLat);
  const sinLat = Math.sin(invLat);
  const light = { x: -0.25, y: 0.35, z: 1 };
  const lightLength = Math.hypot(light.x, light.y, light.z) || 1;
  light.x /= lightLength;
  light.y /= lightLength;
  light.z /= lightLength;

  for (let y = 0; y < height; y += 1) {
    const ny = (centerY - y) / radius;
    for (let x = 0; x < width; x += 1) {
      const nx = (x - centerX) / radius;
      const r2 = nx * nx + ny * ny;
      const index = (y * width + x) * 4;

      if (r2 > 1) {
        data[index + 3] = 0;
        continue;
      }

      const z = Math.sqrt(1 - r2);
      const y1 = ny * cosLat - z * sinLat;
      const z1 = ny * sinLat + z * cosLat;
      const x2 = nx * cosLon + z1 * sinLon;
      const z2 = -nx * sinLon + z1 * cosLon;

      const lon = Math.atan2(x2, z2);
      const lat = Math.asin(y1);
      const u = (lon / (2 * Math.PI) + 0.5) * (texW - 1);
      const v = (0.5 - lat / Math.PI) * (texH - 1);
      const texIndex = (Math.floor(v) * texW + Math.floor(u)) * 4;

      const shadeBase = Math.max(0, nx * light.x + ny * light.y + z * light.z);
      const shade = (0.28 + 0.72 * shadeBase) * (0.75 + 0.25 * z);

      data[index] = Math.min(255, texData[texIndex] * shade);
      data[index + 1] = Math.min(255, texData[texIndex + 1] * shade);
      data[index + 2] = Math.min(255, texData[texIndex + 2] * shade);
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(frameData, 0, 0);
  updateMarkers(centerX, centerY, radius);
};

const step = () => {
  if (!state.dragging && (state.velocityLon || state.velocityLat)) {
    needsRender = true;
    state.rotationLon += state.velocityLon;
    state.rotationLat += state.velocityLat;
    state.rotationLat = clamp(state.rotationLat, -1.1, 1.1);
    state.velocityLon *= 0.85;
    state.velocityLat *= 0.85;
    if (Math.abs(state.velocityLon) < 0.0001) {
      state.velocityLon = 0;
    }
    if (Math.abs(state.velocityLat) < 0.0001) {
      state.velocityLat = 0;
    }
  }
  if (needsRender) {
    render();
    needsRender = false;
  }
  requestAnimationFrame(step);
};

if (globe) {
  globe.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }
    state.dragging = true;
    globe.classList.add("is-dragging");
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.velocityLon = 0;
    state.velocityLat = 0;
    globe.setPointerCapture(event.pointerId);
  });

  globe.addEventListener("pointermove", (event) => {
    if (!state.dragging) {
      return;
    }
    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    const speed = 0.003;
    state.rotationLon += dx * speed;
    state.rotationLat += dy * speed;
    state.rotationLat = clamp(state.rotationLat, -1.1, 1.1);
    needsRender = true;
    state.velocityLon = dx * speed;
    state.velocityLat = dy * speed;
  });

  const endDrag = () => {
    state.dragging = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      state.velocityLon = state.velocityLat = 0;
    }
    globe.classList.remove("is-dragging");
  };

  globe.addEventListener("pointerup", endDrag);
  globe.addEventListener("pointercancel", endDrag);
  globe.addEventListener("pointerleave", endDrag);
}

texture.addEventListener("load", () => {
  textureCanvas.width = texture.width;
  textureCanvas.height = texture.height;
  textureCtx.drawImage(texture, 0, 0);
  textureData = textureCtx.getImageData(0, 0, texture.width, texture.height);
  needsRender = true;
});

texture.src = "assets/world-map.jpg";

step();
