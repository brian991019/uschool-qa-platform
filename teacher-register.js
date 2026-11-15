import {
    createUserWithEmailAndPassword,
    deleteUser
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

const teacherForm = document.getElementById("teacherForm");
const teacherMessage = document.getElementById("teacherMessage");
// 取得兩個畫面
const teacherStep1 = document.getElementById("teacherStep1");
const teacherStep2 = document.getElementById("teacherStep2");

// 下一步
document.getElementById("nextStepBtn")
    .addEventListener("click", () => {

        // 檢查基本資料是否填寫完整
        if (!teacherForm.reportValidity()) {
            return;
        }

        // 切換到第二頁
        teacherStep1.classList.add("hidden");
        teacherStep2.classList.remove("hidden");

        // 清除提示訊息
        teacherMessage.textContent = "";

        // 捲動到頁面頂端
        window.scrollTo(0, 0);
    });

// 上一步
document.getElementById("backStepBtn")
    .addEventListener("click", () => {

        teacherStep2.classList.add("hidden");
        teacherStep1.classList.remove("hidden");

        teacherMessage.textContent = "";

        window.scrollTo(0, 0);
    });

teacherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("teacherName").value.trim();
    const username = document.getElementById("teacherUsername").value.trim().toLowerCase();
    const email = document.getElementById("teacherEmail").value.trim();
    const password = document.getElementById("teacherPassword").value;

    const subjects = [
        ...document.querySelectorAll('input[name="subjects"]:checked')
    ].map(input => input.value);

    const counselor = document.getElementById("counselor").checked;

    if (!/^[a-z0-9_]{4,20}$/.test(username)) {
        teacherMessage.textContent = "帳號格式不正確。";
        return;
    }

    if (subjects.length === 0 && !counselor) {
        teacherMessage.textContent = "請至少選擇一項服務項目。";
        return;
    }

    teacherMessage.textContent = "正在提交申請……";

    let user = null;

    try {
        const authEmail = `${username}@uschool-login.invalid`;

        // 建立 Firebase 帳號
        const credential = await createUserWithEmailAndPassword(
            auth,
            authEmail,
            password
        );

        user = credential.user;

        // 儲存教師申請
        await setDoc(
            doc(db, "teacherApplications", user.uid),
            {
                name,
                username,
                email,
                subjects,
                counselor,
                status: "pending",
                createdAt: serverTimestamp()
            }
        );

        teacherMessage.textContent =
            "申請已送出！請等待管理員審核。";

        teacherForm.reset();

    } catch (error) {
        console.error(error);

        // 如果帳號建立成功但申請資料寫入失敗，
        // 嘗試刪除剛建立的帳號，避免留下不完整帳號。
        if (user) {
            try {
                await deleteUser(user);
            } catch (deleteError) {
                console.error("帳號清理失敗：", deleteError);
            }
        }

        if (error.code === "auth/email-already-in-use") {
            teacherMessage.textContent = "這個帳號已經被使用。";
        } else {
            teacherMessage.textContent =
                "申請失敗：" + error.message;
        }
    }
});