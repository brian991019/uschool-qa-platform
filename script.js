
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const message = document.getElementById("message");

//registerForm.classList.add("hidden");
//loginForm.classList.add("hidden");

//身份
const loginRole = document.getElementById("loginRole");

loginRole.addEventListener("change", () => {
    if (loginRole.value === "admin") {
        message.textContent = "管理員身份需另外申請，目前尚未開放。";
    } else {
        message.textContent = "";
    }
});

// 切換到登入
loginTab.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    message.textContent = "";
});

// 切換到註冊
registerTab.addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    message.textContent = "";
});
