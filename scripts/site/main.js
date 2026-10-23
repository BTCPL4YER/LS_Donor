// Life Stream Donors MVP logic
// Keeps code beginner-friendly and readable.

const donorForm = document.getElementById("donorForm");
const requestForm = document.getElementById("requestForm");
const donorList = document.getElementById("donorList");
const filterBlood = document.getElementById("filterBlood");
const donorCount = document.getElementById("donorCount");
const emergencyButton = document.getElementById("emergencyButton");
const emergencyRequest = document.getElementById("emergencyRequest");
const requestUrgency = document.getElementById("requestUrgency");
const menuToggle = document.getElementById("menuToggle");
const navClose = document.getElementById("navClose");
const primaryNav = document.getElementById("primaryNav");
const navOverlay = document.getElementById("navOverlay");
const siteHeader = document.getElementById("siteHeader");
const dropdowns = document.querySelectorAll("[data-dropdown]");
const accordionButtons = document.querySelectorAll(".mega-accordion");
const donorPageForm = document.getElementById("donorPageForm");
const scheduleForm = document.getElementById("scheduleForm");
const donorSaveMessage = document.getElementById("donorSaveMessage");
const scheduleMessage = document.getElementById("scheduleMessage");
const historyProfile = document.getElementById("historyProfile");
const historyList = document.getElementById("historyList");
const historyEmpty = document.getElementById("historyEmpty");

const DONOR_KEY = "lsd_donors";
const REQUEST_KEY = "lsd_requests";
const DONOR_PROFILE_KEY = "lsd_donor_profile";
const SCHEDULE_KEY = "lsd_schedules";

document.documentElement.classList.add("js-motion");

// Short fade between local pages. Keep hashes, downloads, and modified clicks native.
document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const targetUrl = new URL(link.href, window.location.href);
    if (targetUrl.origin !== window.location.origin || targetUrl.pathname === window.location.pathname || link.target || link.hasAttribute("download") || targetUrl.hash) return;
    event.preventDefault();
    document.body.classList.add("page-leaving");
    window.setTimeout(() => { window.location.href = targetUrl.href; }, 180);
});

// Reveal content as it enters view; leave it visible if observers are unavailable.
const revealSections = document.querySelectorAll("main > section");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealSections.forEach((section, index) => {
        section.classList.add("scroll-reveal");
        section.style.setProperty("--reveal-delay", `${Math.min(index * 50, 150)}ms`);
        revealObserver.observe(section);
    });
} else {
    revealSections.forEach((section) => section.classList.add("is-visible"));
}

// Check if we are in mobile view
function isMobileView() {
    return window.matchMedia("(max-width: 1024px)").matches;
}

// Mobile menu open/close
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("nav-open");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

        if (!isOpen) {
            dropdowns.forEach((dropdown) => dropdown.classList.remove("is-open"));
            accordionButtons.forEach((button) => {
                const section = button.closest(".mega-section");
                if (section) {
                    section.classList.remove("is-open");
                }
            });
        }
    });
}

// Close menu when clicking outside
function closeMobileMenu() {
    document.body.classList.remove("nav-open");
    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
    }
    dropdowns.forEach((dropdown) => dropdown.classList.remove("is-open"));
    accordionButtons.forEach((button) => {
        const section = button.closest(".mega-section");
        if (section) {
            section.classList.remove("is-open");
        }
    });
}

if (navOverlay) {
    navOverlay.addEventListener("click", closeMobileMenu);
}

if (navClose) {
    navClose.addEventListener("click", closeMobileMenu);
}

// Close mobile menu after clicking a link
if (primaryNav) {
    primaryNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (isMobileView()) {
                closeMobileMenu();
            }
        });
    });
}

// Support click, keyboard, and touch on every screen size.
dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (!toggle) return;

    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-expanded", "false");
    const menu = dropdown.querySelector(".mega-menu");
    if (menu) {
        const menuId = menu.id || `donate-menu-${Array.from(dropdowns).indexOf(dropdown) + 1}`;
        menu.id = menuId;
        toggle.setAttribute("aria-controls", menuId);
    }

    // Keep the disclosure state in sync with pointer and keyboard focus.
    dropdown.addEventListener("mouseenter", () => toggle.setAttribute("aria-expanded", "true"));
    dropdown.addEventListener("mouseleave", () => {
        if (!dropdown.classList.contains("is-open")) {
            toggle.setAttribute("aria-expanded", "false");
        }
    });
    dropdown.addEventListener("focusin", () => toggle.setAttribute("aria-expanded", "true"));
    dropdown.addEventListener("focusout", (event) => {
        if (!dropdown.contains(event.relatedTarget) && !dropdown.classList.contains("is-open")) {
            toggle.setAttribute("aria-expanded", "false");
        }
    });

    toggle.addEventListener("click", () => {
        const willOpen = !dropdown.classList.contains("is-open");
        dropdowns.forEach((item) => {
            item.classList.remove("is-open");
            item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
        dropdown.classList.toggle("is-open", willOpen);
        toggle.setAttribute("aria-expanded", String(willOpen));
        if (!willOpen) toggle.blur();
    });
});

// Close the menu on outside click or Escape, including on desktop.
document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-dropdown]")) {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("is-open");
            dropdown.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (document.body.classList.contains("nav-open")) closeMobileMenu();
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("is-open");
            dropdown.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
    }
});

// Accordion behavior for mobile mega menu sections
accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (!isMobileView()) return;

        const section = button.closest(".mega-section");
        if (!section) return;

        const sections = section.parentElement.querySelectorAll(".mega-section");
        sections.forEach((item) => {
            if (item !== section) {
                item.classList.remove("is-open");
            }
        });

        section.classList.toggle("is-open");
    });
});

// Keep scroll work off the main path and avoid repeated DOM writes.
if (siteHeader && "IntersectionObserver" in window) {
    const headerObserver = new IntersectionObserver(([entry]) => {
        siteHeader.classList.toggle("scrolled", !entry.isIntersecting);
    }, { threshold: 0, rootMargin: "-10px 0px 0px 0px" });
    const scrollSentinel = document.createElement("span");
    scrollSentinel.setAttribute("aria-hidden", "true");
    scrollSentinel.className = "scroll-sentinel";
    siteHeader.before(scrollSentinel);
    headerObserver.observe(scrollSentinel);
}

// Reset menu state when resizing to desktop
window.addEventListener("resize", () => {
    if (!isMobileView()) {
        closeMobileMenu();
    }
});

// Helpers
function loadData(key) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Donor profile helpers
function getDonorProfile() {
    const profile = localStorage.getItem(DONOR_PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
}

function saveDonorProfile(profile) {
    localStorage.setItem(DONOR_PROFILE_KEY, JSON.stringify(profile));
}

// Donation schedule helpers
function getSchedules() {
    const schedules = localStorage.getItem(SCHEDULE_KEY);
    return schedules ? JSON.parse(schedules) : [];
}

function saveSchedules(schedules) {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedules));
}

function addToDonorDirectory(profile) {
    const donors = loadData(DONOR_KEY);
    const exists = donors.some((donor) =>
        donor.name === profile.name &&
        donor.bloodType === profile.bloodType &&
        donor.location === profile.location
    );

    if (!exists) {
        donors.unshift({
            name: profile.name,
            bloodType: profile.bloodType,
            location: profile.location,
            phone: profile.phone || "N/A",
            createdAt: new Date().toISOString()
        });
        saveData(DONOR_KEY, donors);
    }
}

function buildDonorCard(donor) {
    const card = document.createElement("div");
    card.className = "donor-card";
    card.innerHTML = `
        <h4>${donor.name} <span>(${donor.bloodType})</span></h4>
        <span><i class="fa-solid fa-location-dot"></i> ${donor.location}</span>
        <span><i class="fa-solid fa-phone"></i> ${donor.phone}</span>
    `;
    return card;
}

function renderDonors() {
    if (!donorList || !filterBlood || !donorCount) {
        return;
    }

    const donors = loadData(DONOR_KEY);
    const filter = filterBlood.value;
    const visibleDonors = filter === "all"
        ? donors
        : donors.filter((donor) => donor.bloodType === filter);

    donorList.innerHTML = "";

    if (visibleDonors.length === 0) {
        donorList.innerHTML = "<p>No donors yet. Be the first to join!</p>";
    } else {
        visibleDonors.forEach((donor) => {
            donorList.appendChild(buildDonorCard(donor));
        });
    }

    donorCount.textContent = `${visibleDonors.length} donor${visibleDonors.length === 1 ? "" : "s"}`;
}

// Donor form submission
if (donorForm) {
    donorForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newDonor = {
            name: donorForm.donorName.value.trim(),
            bloodType: donorForm.donorBlood.value,
            location: donorForm.donorLocation.value.trim(),
            phone: donorForm.donorPhone.value.trim(),
            createdAt: new Date().toISOString()
        };

        const donors = loadData(DONOR_KEY);
        donors.unshift(newDonor);
        saveData(DONOR_KEY, donors);

        donorForm.reset();
        renderDonors();
    });
}

// Donor page registration form
if (donorPageForm) {
    donorPageForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const profile = {
            name: donorPageForm.donorPageName.value.trim(),
            bloodType: donorPageForm.donorPageBlood.value,
            location: donorPageForm.donorPageLocation.value.trim()
        };

        saveDonorProfile(profile);
        addToDonorDirectory(profile);
        donorPageForm.reset();

        if (donorSaveMessage) {
            donorSaveMessage.textContent = "Donor profile saved successfully.";
        }
    });
}

// Request form submission
if (requestForm) {
    requestForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newRequest = {
            patientName: requestForm.patientName.value.trim(),
            bloodType: requestForm.requestBlood.value,
            urgency: requestForm.requestUrgency.value,
            location: requestForm.requestLocation.value.trim(),
            createdAt: new Date().toISOString()
        };

        const requests = loadData(REQUEST_KEY);
        requests.unshift(newRequest);
        saveData(REQUEST_KEY, requests);

        requestForm.reset();
        alert("Request submitted! We are notifying nearby donors.");
    });
}

// Schedule form submission
if (scheduleForm) {
    scheduleForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const profile = getDonorProfile();
        if (!profile) {
            if (scheduleMessage) {
                scheduleMessage.textContent = "Please create a donor profile first.";
            }
            return;
        }

        const newSchedule = {
            id: Date.now(),
            donorName: profile.name,
            bloodType: profile.bloodType,
            date: scheduleForm.scheduleDate.value,
            time: scheduleForm.scheduleTime.value,
            location: scheduleForm.scheduleLocation.value.trim()
        };

        const schedules = getSchedules();
        schedules.unshift(newSchedule);
        saveSchedules(schedules);

        scheduleForm.reset();
        if (scheduleMessage) {
            scheduleMessage.textContent = "Schedule saved to your history.";
        }
    });
}

// Filter change
if (filterBlood) {
    filterBlood.addEventListener("change", renderDonors);
}

// Emergency buttons
function triggerEmergency() {
    if (requestUrgency) {
        requestUrgency.value = "Critical";
    }
    const requestSection = document.getElementById("request");
    if (requestSection) {
        requestSection.scrollIntoView({ behavior: "smooth" });
    } else {
        window.location.href = "index.html#request";
    }
}

if (emergencyButton) {
    emergencyButton.addEventListener("click", triggerEmergency);
}

if (emergencyRequest) {
    emergencyRequest.addEventListener("click", triggerEmergency);
}

// Initial render on page load
renderDonors();

// History page rendering
function renderHistory() {
    if (!historyProfile || !historyList || !historyEmpty) {
        return;
    }

    const profile = getDonorProfile();
    const schedules = getSchedules();

    if (profile) {
        historyProfile.innerHTML = `
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Blood Type:</strong> ${profile.bloodType}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
        `;
    } else {
        historyProfile.innerHTML = "<p class=\"form-note\">No donor profile saved yet.</p>";
    }

    historyList.innerHTML = "";
    if (schedules.length === 0) {
        historyEmpty.style.display = "block";
        return;
    }

    historyEmpty.style.display = "none";
    schedules.forEach((schedule) => {
        const item = document.createElement("div");
        item.className = "history-item";
        item.innerHTML = `
            <div>
                <strong>${schedule.date} at ${schedule.time}</strong>
                <span>${schedule.location}</span>
            </div>
            <button class=\"btn delete\" data-id=\"${schedule.id}\">Delete</button>
        `;
        historyList.appendChild(item);
    });
}

if (historyList) {
    historyList.addEventListener("click", (event) => {
        const button = event.target.closest(".btn.delete");
        if (!button) return;

        const id = Number(button.dataset.id);
        const schedules = getSchedules().filter((schedule) => schedule.id !== id);
        saveSchedules(schedules);
        renderHistory();
    });
}

renderHistory();
