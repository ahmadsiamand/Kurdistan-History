/* =====================================
   Historical Sites of Kurdistan
   script.js
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();
    initializeSearch();
    initializeFilters();
    initializeFavorites();
    initializeQuiz();
    initializeRating();
    initializeLanguages();
    initializeMobileMenu();
    initializeNewsletter();

});

/* =====================================
   DARK / LIGHT MODE
===================================== */

function initializeTheme() {

    const themeBtn = document.getElementById("themeToggle");

    if (!themeBtn) return;

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const currentTheme =
            document.body.classList.contains("light-mode")
                ? "light"
                : "dark";

        localStorage.setItem(
            "theme",
            currentTheme
        );

    });

}

/* =====================================
   SEARCH
===================================== */

function initializeSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const keyword =
            searchInput.value.toLowerCase();

        const cards =
            document.querySelectorAll(".place-card");

        cards.forEach(card => {

            const placeName =
                card.dataset.name.toLowerCase();

            if (
                placeName.includes(keyword)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}

/* =====================================
   FILTER BY CITY
===================================== */

function initializeFilters() {

    const cityFilter =
        document.getElementById("cityFilter");

    if (!cityFilter) return;

    cityFilter.addEventListener("change", () => {

        const city =
            cityFilter.value;

        const cards =
            document.querySelectorAll(".place-card");

        cards.forEach(card => {

            if (
                city === "all" ||
                card.dataset.city === city
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}

/* =====================================
   FAVORITES
===================================== */

function initializeFavorites() {

    const buttons =
        document.querySelectorAll(".favorite-btn");

    const favoriteContainer =
        document.getElementById(
            "favoritesContainer"
        );

    let favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    buttons.forEach(button => {

        const id =
            button.dataset.id;

        if (
            favorites.includes(id)
        ) {
            button.innerHTML =
                '<i class="fa-solid fa-heart"></i>';
        }

        button.addEventListener("click", () => {

            if (
                favorites.includes(id)
            ) {

                favorites =
                    favorites.filter(
                        item => item !== id
                    );

                button.innerHTML =
                    '<i class="fa-regular fa-heart"></i>';

            } else {

                favorites.push(id);

                button.innerHTML =
                    '<i class="fa-solid fa-heart"></i>';

            }

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            renderFavorites();

        });

    });

    function renderFavorites() {

        if (!favoriteContainer) return;

        favoriteContainer.innerHTML = "";

        if (
            favorites.length === 0
        ) {

            favoriteContainer.innerHTML =
                "<p>No favorite places selected yet.</p>";

            return;
        }

        favorites.forEach(id => {

            const item =
                document.createElement("div");

            item.classList.add(
                "favorite-item"
            );

            item.innerHTML =
                `<p>Favorite Place ID: ${id}</p>`;

            favoriteContainer.appendChild(
                item
            );

        });

    }

    renderFavorites();

}

/* =====================================
   DETAILS PAGE FAVORITE BUTTON
===================================== */

const detailsFavoriteButton =
    document.getElementById(
        "favoritePlaceBtn"
    );

if (detailsFavoriteButton) {

    detailsFavoriteButton.addEventListener(
        "click",
        () => {

            const title =
                document.getElementById(
                    "placeTitle"
                ).textContent;

            let favorites =
                JSON.parse(
                    localStorage.getItem(
                        "favoritePlaces"
                    )
                ) || [];

            if (
                !favorites.includes(title)
            ) {

                favorites.push(title);

                localStorage.setItem(
                    "favoritePlaces",
                    JSON.stringify(favorites)
                );

                detailsFavoriteButton.innerHTML =
                    `<i class="fa-solid fa-heart"></i> Added`;

            }

        }
    );

}

/* =====================================
   QUIZ
===================================== */

function initializeQuiz() {

    const options =
        document.querySelectorAll(
            ".quiz-option"
        );

    const result =
        document.getElementById(
            "quizResult"
        );

    if (!options.length) return;

    options.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                if (
                    option.classList.contains(
                        "correct"
                    )
                ) {

                    result.textContent =
                        "✔️ Correct Answer!";

                    result.style.color =
                        "lightgreen";

                } else {

                    result.textContent =
                        "❌ Wrong Answer.";

                    result.style.color =
                        "red";

                }

            }
        );

    });

}

/* =====================================
   STAR RATING
===================================== */

function initializeRating() {

    const stars =
        document.querySelectorAll(
            ".rating-star"
        );

    const result =
        document.getElementById(
            "ratingResult"
        );

    if (!stars.length) return;

    stars.forEach(star => {

        star.addEventListener(
            "click",
            () => {

                const rating =
                    star.dataset.rate;

                stars.forEach(item =>
                    item.classList.remove(
                        "active"
                    )
                );

                stars.forEach(item => {

                    if (
                        item.dataset.rate <=
                        rating
                    ) {

                        item.classList.add(
                            "active"
                        );

                    }

                });

                result.textContent =
                    `You rated this place ${rating}/5`;

                localStorage.setItem(
                    "siteRating",
                    rating
                );

            }
        );

    });

}

/* =====================================
   LANGUAGE SWITCHER
===================================== */

function initializeLanguages() {

    const switcher =
        document.getElementById(
            "languageSwitcher"
        );

    if (!switcher) return;

    switcher.addEventListener(
        "change",
        () => {

            const language =
                switcher.value;

            document
                .querySelectorAll(
                    "[data-en]"
                )
                .forEach(element => {

                    const text =
                        element.getAttribute(
                            `data-${language}`
                        );

                    if (text) {
                        element.textContent =
                            text;
                    }

                });

        }
    );

}

/* =====================================
   MOBILE MENU
===================================== */

function initializeMobileMenu() {

    const menuButton =
        document.querySelector(
            ".menu-toggle"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );

    if (
        !menuButton ||
        !navLinks
    ) return;

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "show"
            );

        }
    );

}

/* =====================================
   NEWSLETTER
===================================== */

function initializeNewsletter() {

    const emailInput =
        document.querySelector(
            ".newsletter-form input"
        );

    const submitButton =
        document.querySelector(
            ".newsletter-form button"
        );

    if (
        !emailInput ||
        !submitButton
    ) return;

    submitButton.addEventListener(
        "click",
        () => {

            const email =
                emailInput.value.trim();

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                regex.test(email)
            ) {

                alert(
                    "Subscription successful!"
                );

                emailInput.value = "";

            } else {

                alert(
                    "Please enter a valid email."
                );

            }

        }
    );

}

/* =====================================
   SMOOTH SCROLL
===================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute(
                        "href"
                    )
                );

            if(target){

                target.scrollIntoView({
                    behavior:"smooth"
                });

            }

        }
    );

});