let language = "es";

const languageBtn = document.getElementById("languageBtn");
const themeBtn = document.getElementById("themeBtn");
const searchInput = document.getElementById("searchInput");

function updateLanguage() {
    const elements = document.querySelectorAll("[data-es][data-en]");

    elements.forEach(element => {
        element.textContent = element.getAttribute("data-" + language);
    });

    if (language === "es") {
        languageBtn.textContent = "🇺🇸 English";
        searchInput.placeholder = searchInput.getAttribute("data-placeholder-es");
    } else {
        languageBtn.textContent = "🇲🇽 Español";
        searchInput.placeholder = searchInput.getAttribute("data-placeholder-en");
    }

    document.documentElement.lang = language;
}

languageBtn.addEventListener("click", () => {
    language = language === "es" ? "en" : "es";
    updateLanguage();
});


themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});


document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", () => {

        const card = button.closest(".concept-card");

        card.classList.toggle("active");

        if (card.classList.contains("active")) {
            button.textContent =
                language === "es"
                    ? "Ocultar explicación"
                    : "Hide explanation";
        } else {
            button.textContent =
                language === "es"
                    ? "Ver explicación"
                    : "View explanation";
        }
    });
});


searchInput.addEventListener("input", () => {

    const search = searchInput.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const cards = document.querySelectorAll(".concept-card");

    cards.forEach(card => {

        const text = (
            card.textContent +
            " " +
            card.getAttribute("data-concept")
        )
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (text.includes(search)) {
            card.classList.remove("hidden-card");
        } else {
            card.classList.add("hidden-card");
        }
    });
});


const solutions = [
    "X = rojo",
    "X = azul",
    "X = verde"
];

let currentSolution = 0;

const demoResult = document.getElementById("demoResult");
const nextSolution = document.getElementById("nextSolution");
const resetDemo = document.getElementById("resetDemo");

nextSolution.addEventListener("click", () => {

    currentSolution++;

    if (currentSolution >= solutions.length) {
        currentSolution = 0;
    }

    demoResult.textContent = solutions[currentSolution];
});


resetDemo.addEventListener("click", () => {
    currentSolution = 0;
    demoResult.textContent = solutions[0];
});


const cards = document.querySelectorAll(".concept-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.zIndex = "2";
    });

    card.addEventListener("mouseleave", () => {
        card.style.zIndex = "1";
    });

});


const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }

        });

    },
    {
        threshold: 0.08
    }
);


sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(section);

});


updateLanguage();
