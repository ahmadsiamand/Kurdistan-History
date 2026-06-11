document.addEventListener("DOMContentLoaded", () => {
    // 1. دۆخی تاريک و ڕووناکی (Dark/Light Mode)
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        // پشکنینی دۆخی پاشەکەوتکراو
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
        }

        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // 2. هێنانی داتا لە JSON
    fetch('data/places.json')
        .then(response => response.json())
        .then(data => {
            const currentPath = window.location.pathname;

            // بۆ لاپەڕەی سەرەکی
            if (currentPath.includes("index.html") || currentPath === "/") {
                renderCards(data.slice(0, 3), "featured-grid");
            }
            // بۆ لاپەڕەی شوێنەوارەکان
            else if (currentPath.includes("places.html")) {
                renderCards(data, "places-grid");
                setupFilters(data);
            }
            // بۆ لاپەڕەی وردەکاری
            else if (currentPath.includes("place-details.html")) {
                renderDetails(data);
            }
        })
        .catch(error => console.error("Error loading data:", error));
});

// دروستکردنی کاردەکان
function renderCards(places, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    places.forEach(place => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <div class="card-content">
                <h3>${place.name}</h3>
                <p><strong>شار:</strong> ${place.city}</p>
                <p>${place.description.substring(0, 50)}...</p>
                <a href="place-details.html?id=${place.id}" class="btn-outline">بینینی وردەکاری</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// فلتەرکردن و گەڕان
function setupFilters(data) {
    const searchInput = document.getElementById("search-input");
    const cityFilter = document.getElementById("city-filter");

    function filterData() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCity = cityFilter.value;

        const filtered = data.filter(place => {
            const matchesSearch = place.name.toLowerCase().includes(searchText) || place.city.toLowerCase().includes(searchText);
            const matchesCity = selectedCity === "all" || place.city === selectedCity;
            return matchesSearch && matchesCity;
        });

        renderCards(filtered, "places-grid");
    }

    if (searchInput) searchInput.addEventListener("input", filterData);
    if (cityFilter) cityFilter.addEventListener("change", filterData);
}

// لاپەڕەی وردەکاری
function renderDetails(data) {
    const container = document.getElementById("details-container");
    const params = new URLSearchParams(window.location.search);
    const placeId = parseInt(params.get("id"));

    const place = data.find(p => p.id === placeId);

    if (place) {
        container.innerHTML = `
            <img src="${place.image}" alt="${place.name}" class="details-image" onerror="this.src='https://via.placeholder.com/800x400?text=No+Image'">
            <h1 style="color: var(--accent-color); margin-bottom: 20px;">${place.name}</h1>
            <p><strong>شار:</strong> ${place.city}</p>
            <p><strong>هەڵسەنگاندن:</strong> ${place.rating} / 5</p>
            <p style="margin-top: 20px; font-size: 1.1rem;">${place.description}</p>
            
            <h3 style="margin-top: 40px; color: var(--accent-color);">نەخشە (نموونە)</h3>
            <div style="background: var(--card-bg); height: 300px; display:flex; align-items:center; justify-content:center; border: 1px solid var(--primary-color);">
                نەخشەی ${place.name} لێرە دەبێت
            </div>
        `;
    } else {
        container.innerHTML = "<h2>شوێنەوارەکە نەدۆزرایەوە!</h2>";
    }
}

// سیستەمی تاقیکردنەوە (Quiz)
function checkAnswer(isCorrect) {
    const resultMsg = document.getElementById("quiz-result");
    if (isCorrect) {
        resultMsg.textContent = "وەڵامەکەت ڕاستە! ئافەرین.";
        resultMsg.style.color = "#4CAF50"; // سەوز
    } else {
        resultMsg.textContent = "وەڵامەکەت هەڵەیە. هەوڵێکی تر بدە.";
        resultMsg.style.color = "#f44336"; // سوور
    }
}
