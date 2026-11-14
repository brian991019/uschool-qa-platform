import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

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

// 學生註冊
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const username = document.getElementById("registerUsername").value.trim().toLowerCase();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    message.textContent = "正在建立帳號……";

    // 帳號格式檢查
    if (!/^[a-z0-9_]{4,20}$/.test(username)) {
        message.textContent = "帳號必須為 4～20 位英文、數字或底線。";
        return;
    }

    try {
        // 建立 Firebase Authentication 帳號
        const authEmail = `${username}@uschool-login.invalid`;

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            authEmail,
            password
        );

        const user = userCredential.user;

        // 將使用者資料儲存到 Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            username: username,
            email: email,
            role: "student",
            status: "active",
            createdAt: new Date()
        });

        message.textContent = "註冊成功！歡迎使用";
        registerForm.reset();

    } catch (error) {
        console.error(error);

        if (error.code === "auth/email-already-in-use") {
            message.textContent = "這個帳號已經被使用了。";
        } else if (error.code === "auth/weak-password") {
            message.textContent = "密碼強度不足。";
        } else {
            message.textContent = "註冊失敗：" + error.message;
        }
    }
});

// 使用者登入
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const selectedRole = document.getElementById("loginRole").value;

    message.textContent = "正在登入……";

    if (!/^[a-z0-9_]{4,20}$/.test(username)) {
        message.textContent = "帳號格式不正確。";
        return;
    }

    try {
        const authEmail = `${username}@uschool-login.invalid`;

        // 驗證帳號密碼
        const userCredential = await signInWithEmailAndPassword(
            auth,
            authEmail,
            password
        );

        const user = userCredential.user;

        // 讀取使用者資料
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (!userDoc.exists()) {
            await signOut(auth);
            message.textContent = "找不到使用者資料，請聯絡管理員。";
            return;
        }

        const userData = userDoc.data();

        // 檢查身份是否符合
        if (userData.role !== selectedRole) {
            await signOut(auth);
            message.textContent = "登入身份與帳號設定不符。";
            return;
        }

        // 檢查老師是否已通過審核
        if (userData.role === "teacher" && userData.status !== "approved") {
            await signOut(auth);
            message.textContent = "老師帳號尚未通過審核。";
            return;
        }

        message.textContent = "登入成功！歡迎回來，" + userData.name;

        console.log("登入使用者：", userData);

    } catch (error) {
        console.error(error);

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/user-not-found" ||
            error.code === "auth/wrong-password"
        ) {
            message.textContent = "帳號或密碼錯誤。";
        } else {
            message.textContent = "登入失敗：" + error.message;
        }
    }
});