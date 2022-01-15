  const userName = document.getElementById("user-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const closeBtn = document.querySelector(".fa-times");
const form = document.querySelector("form");
const signUpBtn = document.querySelector(".sign-in-btn");
const hamburger = document.querySelector(".hamburger");
const sliderMenu = document.querySelector(".slider-menu"); 
const body = document.querySelector("body");


function validateUserName(userName) {
    const userNameRegex = /^[a-zA-Z\s]{3,15}$/;
    return userNameRegex.test(userName);
}
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.]+@[a-zA-Z]+\.[a-z-A-Z]+$/;
    return emailRegex.test(email);
}
function validatePassword(password) {
    return password.length >= 8;
}
function validateConfirmPassword(confirmPassword) {
    return confirmPassword === password.value;;
}

function updateDom(isValid, message, input) {

if(!isValid) {
if(!input.classList.contains("error")) {
    input.classList.remove('success');
    input.classList.add("error");

    const errorText = document.createTextNode(message);
    const error = document.createElement("span");
    error.style.color = "$red-color";
    error.style.fontSize = "14px";
    error.appendChild(errorText);
    input.insertAdjacentElement("afterend", error);
}
} else {
    if(input.classList.contains("error")) {
        input.classList.remove('error');
        input.classList.add('success');

        input.nextElementSibling.remove();
    }
}
}

userName.addEventListener("keyup", (e) => {
    const isValid = validateUserName(e.target.value);
    if(!isValid) {
        updateDom(isValid, "User name must be between 3 and 15 characters", e.target);
    } else {
        updateDom(isValid, "", e.target);
    }
});

email.addEventListener("keyup", (e) => {
    const isValid = validateEmail(e.target.value);
    if(!isValid) {
        updateDom(isValid, "Please enter a valid Email", e.target);
    } else {
        updateDom(isValid, "", e.target);
    }
});

password.addEventListener("keyup", (e) => {
    const isValid = validatePassword(e.target.value);
    if(!isValid) {
        updateDom(isValid, "Password must contains atleast 8 characters", e.target);
    } else {
        updateDom(isValid, "", e.target);
    }
});

confirmPassword.addEventListener("keyup", (e) => {
    const isValid = validateConfirmPassword(e.target.value);
    if(!isValid) {
        updateDom(isValid, `Password doesn't match...`, e.target);
    } else {
        updateDom(isValid, "", e.target);
    }
});

closeBtn.addEventListener("click", () => {
    form.style.visibility = "hidden";
    form.style.opacity = "0";
});

signUpBtn.addEventListener("click", () => {
    console.log('fd');
    form.style.opacity = "1";
    form.style.visibility = "visible";
}
);

let toggle = true;
hamburger.addEventListener("click", () => {
if(toggle) {
    sliderMenu.style.transform = "translateX(0)";
} else {
    sliderMenu.style.transform = "translateX(-35vw)";
}
toggle = !toggle;
});