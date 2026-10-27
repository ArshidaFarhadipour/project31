// =====================================================
// Active Menu Item Based on Current Section
// =====================================================
const menuLinks = document.querySelectorAll(".menu a[href^='#']");
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");

                menuLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.menu a[href="#${currentId}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    },
    {
        threshold: 0.3
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// =====================================================
// Hamburger Menu
// =====================================================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const header = document.querySelector(".header");
const icon = document.querySelector(".hamburger .icon");

if (hamburger && menu && header && icon) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("open");
        hamburger.classList.toggle("open");
        header.classList.toggle("menu-is-open");

        icon.textContent = hamburger.classList.contains("open") ? "✕" : "☰";
    });

    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            hamburger.classList.remove("open");
            header.classList.remove("menu-is-open");
            icon.textContent = "☰";
        });
    });

    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove("open");
            hamburger.classList.remove("open");
            header.classList.remove("menu-is-open");
            icon.textContent = "☰";
        }
    });
}

// =====================================================
// Login Modal
// =====================================================
const loginButton = document.querySelector(".login-button");
const modalOverlay = document.getElementById("modalOverlay");

if (loginButton && modalOverlay) {
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        modalOverlay.classList.add("active");
    });

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modalOverlay.classList.remove("active");
        }
    });
}

// =====================================================
// Charge Tracker Modal
// =====================================================
const chargeButton = document.querySelector(".charge");
const chargeOverlay = document.getElementById("chargeOverlay");
const chargeModal = document.getElementById("chargeModal");

if (chargeButton && chargeOverlay && chargeModal) {
    // باز کردن
    chargeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        chargeOverlay.classList.add("active");
    });

    // بستن با کلیک روی فضای تیره
    chargeOverlay.addEventListener("click", (e) => {
        if (e.target === chargeOverlay) {
            chargeOverlay.classList.remove("active");
        }
    });

    // بستن با Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            chargeOverlay.classList.remove("active");
        }
    });
}



// =====================================================
// Product Slider
// =====================================================
const slides = document.querySelectorAll(".product-slide");
const allDots = document.querySelectorAll(".dot");
let currentSlide = 0;
let autoPlayInterval = null;

function showSlide(index) {
    if (slides.length === 0) return;

    if (index < 0) {
        index = slides.length - 1;
    }
    if (index >= slides.length) {
        index = 0;
    }

    currentSlide = index;

    // حذف active از اسلایدها
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    // فعال کردن اسلاید
    slides[index].classList.add("active");

    // حذف active از تمام dotها
    allDots.forEach(dot => {
        dot.classList.remove("active");
    });

    // پیدا کردن dotهای اسلاید فعلی
    const activeDots = slides[index].querySelectorAll(".dot");
    activeDots.forEach(dot => {
        if (parseInt(dot.getAttribute("data-index")) === index) {
            dot.classList.add("active");
        }
    });
}

// =====================================================
// Slider Dots
// =====================================================
allDots.forEach(dot => {
    dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-index"));
        showSlide(index);
    });
});

// =====================================================
// Auto Play
// =====================================================
function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showSlide(0);
    startAutoPlay();

    const slider = document.getElementById("product-slider");
    if (slider) {
        slider.addEventListener("mouseenter", stopAutoPlay);
        slider.addEventListener("mouseleave", startAutoPlay);
    }
});



      
// =====================================================
// Agency Search
// =====================================================


    


function renderAgents(data, showNoResults = false) {

    const agencyCards = document.getElementById("agencyCards");

    agencyCards.innerHTML = "";

    if (data.length === 0 && showNoResults) {
        agencyCards.innerHTML = `
            <div class="agency-no-results" role="status">
                نتیجه‌ای برای جستجوی شما یافت نشد.
            </div>
        `;
        return;
    }

    data.forEach(function (agency) {

        const card = `
            <div class="card-agency">

                <div class="name">
                    ${agency.Name}
                </div>

                <div class="address">
                    ${agency.Address}
                </div>

                <div class="phoneitems-agency">

                    <img
                        class="icon-agency"
                        src="icon-agency.svg"
                        alt=""
                    >

                    <a
                        href="tel:${agency.TelNo}"
                        class="phone-agency"
                    >
                        ${agency.TelNo}
                    </a>

                </div>

            </div>
        `;

        agencyCards.innerHTML += card;
    });
}


// =====================================================
// Search
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.querySelector(".searchbox input");

    if (!searchInput) return;

    function normalizeText(text) {

        return text
            .toLowerCase()
            .trim()
            .replace(/ي/g, "ی")
            .replace(/ى/g, "ی")
            .replace(/ك/g, "ک")
            .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
            .replace(/\s+/g, " ");
    }

    searchInput.addEventListener("input", function () {

        const searchValue = normalizeText(this.value);

        const filteredAgents = agents.filter(function (agency) {

            const name = normalizeText(agency.Name || "");
            const address = normalizeText(agency.Address || "");
            const phone = normalizeText(agency.TelNo || "");

            return (
                name.includes(searchValue) ||
                address.includes(searchValue) ||
                phone.includes(searchValue)
            );

        });

        renderAgents(filteredAgents, Boolean(searchValue));

    });

});


// =====================================================
// Get Agents From API
// =====================================================

async function getAgents() {

    const agencyCards = document.getElementById("agencyCards");

    try {

        const response = await fetch(
            "https://caryarsystem.com/api/fleet/GetAllAgents"
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        agents = await response.json();

        console.log("تعداد نمایندگی‌ها:", agents.length);

        renderAgents(agents);

    } catch (error) {

        console.error("خطا در دریافت نمایندگی‌ها:", error);

        agencyCards.innerHTML = `
            <div class="agency-error">

                <div class="agency-error-title">
                    دریافت اطلاعات با مشکل مواجه شد
                </div>

                <div class="agency-error-text">
                    لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.
                </div>

                <button
                    class="agency-retry"
                    onclick="getAgents()"
                >
                    تلاش دوباره
                </button>

            </div>
        `;
    }
}


getAgents();





   
