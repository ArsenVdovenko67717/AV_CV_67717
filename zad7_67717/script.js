const themeBtn = document.getElementById("themeBtn");
const themeLink = document.getElementById("themeStylesheet");

let isRed = true;

themeBtn.addEventListener("click", () => {
    themeLink.href = isRed ? "green.css" : "red.css";
    isRed = !isRed;
});

const toggleBtn = document.getElementById("toggleExp");
const experience = document.getElementById("experience");

toggleBtn.addEventListener("click", () => {
    experience.style.display = experience.style.display === "none" ? "block" : "none";
});

const form = document.getElementById("contactForm");

const fields = {
    name: document.getElementById("name"),
    surname: document.getElementById("surname"),
    email: document.getElementById("email"),
    message: document.getElementById("message")
};

function setError(input, message) {
    const group = input.parentElement;
    const error = group.querySelector(".error");
    error.textContent = message;
    input.classList.add("error-input");
    input.classList.remove("success-input");
}

function setSuccess(input) {
    const group = input.parentElement;
    const error = group.querySelector(".error");
    error.textContent = "";
    input.classList.add("success-input");
    input.classList.remove("error-input");
}

function validateName(input) {
    const value = input.value.trim();
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;

    if (!value) return (setError(input, "Pole wymagane"), false);
    if (!regex.test(value)) return (setError(input, "Bez cyfr!"), false);

    setSuccess(input);
    return true;
}

function validateEmail(input) {
    const value = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) return (setError(input, "Pole wymagane"), false);
    if (!regex.test(value)) return (setError(input, "Zły email"), false);

    setSuccess(input);
    return true;
}

function validateMessage(input) {
    const value = input.value.trim();
    if (!value) return (setError(input, "Pole wymagane"), false);
    setSuccess(input);
    return true;
}

fields.name.addEventListener("input", () => validateName(fields.name));
fields.surname.addEventListener("input", () => validateName(fields.surname));
fields.email.addEventListener("input", () => validateEmail(fields.email));
fields.message.addEventListener("input", () => validateMessage(fields.message));

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valid =
        validateName(fields.name) &
        validateName(fields.surname) &
        validateEmail(fields.email) &
        validateMessage(fields.message);

    if (valid) alert("Formularz poprawny");
});

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const skillsList = document.getElementById("skillsList");
        const projectsList = document.getElementById("projectsList");

        data.skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        let projects = JSON.parse(localStorage.getItem("projects"));

        if (!projects) {
            projects = data.projects;
            localStorage.setItem("projects", JSON.stringify(projects));
        }

        renderProjects(projects);
    });

const projectName = document.getElementById("projectName");
const projectDesc = document.getElementById("projectDesc");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectsList = document.getElementById("projectsList");

function getProjects() {
    return JSON.parse(localStorage.getItem("projects")) || [];
}

function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects(projects) {
    projectsList.innerHTML = "";

    projects.forEach((p, i) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${p.name}</strong>: ${p.description}
            <button onclick="deleteProject(${i})">Usuń</button>
        `;

        projectsList.appendChild(li);
    });
}

addProjectBtn.addEventListener("click", () => {
    const projects = getProjects();

    const name = projectName.value.trim();
    const desc = projectDesc.value.trim();

    if (!name || !desc) return;

    projects.push({ name, description: desc });

    saveProjects(projects);
    renderProjects(projects);

    projectName.value = "";
    projectDesc.value = "";
});

window.deleteProject = function(index) {
    const projects = getProjects();

    projects.splice(index, 1);

    saveProjects(projects);
    renderProjects(projects);
};