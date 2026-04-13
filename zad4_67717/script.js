const themeBtn = document.getElementById("themeBtn");
const themeLink = document.getElementById("themeStylesheet");

let isRed = true;

themeBtn.addEventListener("click", () => {
    if (isRed) {
        themeLink.href = "green.css";
    } else {
        themeLink.href = "red.css";
    }
    isRed = !isRed;
});


const toggleBtn = document.getElementById("toggleExp");
const experience = document.getElementById("experience");

toggleBtn.addEventListener("click", () => {
    if (experience.style.display === "none") {
        experience.style.display = "block";
    } else {
        experience.style.display = "none";
    }
});