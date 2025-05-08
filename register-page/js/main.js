"use strict";
const uppercase = document.getElementsByClassName("pass__letter")[0];
const passNumber = document.getElementsByClassName("pass__number")[0];
const symbol = document.getElementsByClassName("pass__symbol")[0];
const passLength = document.getElementsByClassName("pass__length")[0];
const password = document.querySelector('#password');
const password2 = document.querySelector("#password2");
function all(values) {
    for (let val of values) {
        if (!val) {
            return false;
        }
    }
    return true;
}
function containUppercase(str) {
    return /[A-Z]/.test(str);
}
function containNumber(str) {
    return /[0-9]/.test(str);
}
function containSymbol(str) {
    return /[@!/*#]/.test(str);
}
function validatePassword(str) {
    let validateValues = [false, false, false, false];
    if (containUppercase(str)) {
        validateValues[0] = true;
        if (!uppercase.classList.contains("valid")) {
            uppercase.classList.add('valid');
        }
    }
    if (containNumber(str)) {
        validateValues[1] = true;
        if (!passNumber.classList.contains("valid")) {
            passNumber.classList.add('valid');
        }
    }
    if (containSymbol(str)) {
        validateValues[2] = true;
        if (!symbol.classList.contains("valid")) {
            symbol.classList.add('valid');
        }
    }
    if (str.length >= 8) {
        validateValues[3] = true;
        if (!passLength.classList.contains("valid")) {
            passLength.classList.add('valid');
        }
    }
    return all(validateValues);
}
validatePassword(password.value);
password2.addEventListener("input", () => {
    const match = document.getElementsByClassName("pass__match")[0];
    match.textContent = 'Password do not match';
    if (password2.value !== "" && password2.value === password.value) {
        match.classList.add("valid");
        match.textContent = "Password Match";
    }
});
password2.addEventListener("blur", () => {
    const label = password2.nextElementSibling;
    if (!label) {
        return;
    }
    if (validatePassword(password.value)) {
        password2.classList.remove('invalid-outline');
        password2.classList.add('valid-outline');
        label.classList.remove('invalid');
        label.classList.add('valid');
    }
    else {
        password2.classList.add('invalid-outline');
        password2.classList.remove('valid-outline');
        label.classList.remove('valid');
        label.classList.add('invalid');
    }
});
if (password) {
    password.addEventListener("blur", () => {
        const label = password.nextElementSibling;
        if (!label) {
            return;
        }
        if (validatePassword(password.value)) {
            password.classList.remove('invalid-outline');
            password.classList.add('valid-outline');
            label.classList.remove('invalid');
            label.classList.add('valid');
        }
        else {
            password.classList.add('invalid-outline');
            password.classList.remove('valid-outline');
            label.classList.remove('valid');
            label.classList.add('invalid');
        }
    });
    password.addEventListener("input", () => {
        uppercase.classList.remove("valid");
        passNumber.classList.remove("valid");
        symbol.classList.remove("valid");
        let val = password.value;
        validatePassword(val);
    });
}
