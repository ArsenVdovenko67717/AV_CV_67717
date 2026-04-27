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

    if (!value) {
        setError(input, "Pole wymagane");
        return false;
    } else if (!regex.test(value)) {
        setError(input, "Bez cyfr!");
        return false;
    } else {
        setSuccess(input);
        return true;
    }
}

function validateEmail(input) {
    const value = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
        setError(input, "Pole wymagane");
        return false;
    } else if (!regex.test(value)) {
        setError(input, "Zły email");
        return false;
    } else {
        setSuccess(input);
        return true;
    }
}

function validateMessage(input) {
    const value = input.value.trim();

    if (!value) {
        setError(input, "Pole wymagane");
        return false;
    } else {
        setSuccess(input);
        return true;
    }
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

    if (valid) {
        alert("Formularz poprawny ✅");
    }
});