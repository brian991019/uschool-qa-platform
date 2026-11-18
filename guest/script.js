
// ===== DOM 元素 =====

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const resizeHandle = document.getElementById("resizeHandle");

const questionList = document.getElementById("questionList");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

const welcomeModal = document.getElementById("welcomeModal");
const welcomeConfirm = document.getElementById("welcomeConfirm");

const loginModal = document.getElementById("loginModal");
const loginModalClose = document.getElementById("loginModalClose");


// ===== 側邊欄收合 =====

// let previousWidth = 255;

// sidebarToggle.addEventListener("click", () => {

//     const isCollapsed = sidebar.classList.contains("collapsed");

//     if (!isCollapsed) {
//         previousWidth = parseInt(
//             getComputedStyle(sidebar).width
//         );

//         sidebar.classList.add("collapsed");

//     } else {
//         sidebar.classList.remove("collapsed");

//         document.documentElement.style.setProperty(
//             "--sidebar-width",
//             previousWidth + "px"
//         );
//     }

// });


// ===== 側邊欄拖曳調整寬度 =====

// let isResizing = false;

// resizeHandle.addEventListener("pointerdown", (e) => {
//     isResizing = true;
//     resizeHandle.setPointerCapture(e.pointerId);
//     document.body.style.userSelect = "none";
// });

// resizeHandle.addEventListener("pointermove", (e) => {
//     if (!isResizing) return;

//     const newWidth = Math.max(76, Math.min(380, e.clientX));

//     if (newWidth < 150) {
//         sidebar.classList.add("collapsed");
//     } else {
//         sidebar.classList.remove("collapsed");
//         previousWidth = newWidth;

//         document.documentElement.style.setProperty(
//             "--sidebar-width",
//             newWidth + "px"
//         );
//     }
// });

// function stopResize() {
//     isResizing = false;
//     document.body.style.userSelect = "";
// }

// resizeHandle.addEventListener("pointerup", stopResize);
// resizeHandle.addEventListener("pointercancel", stopResize);

// ===== 上方導覽列收合／展開 =====

const topbar = document.getElementById("topbar");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
    topbar.classList.toggle("compact");
});


// ===== 訪客示範問題資料 =====

// 目前為測試資料，尚未連接 Firestore。

const questions = [
    {
        title: "數學：如何理解二次函數的頂點？",
        content: "想知道如何從函數式快速判斷頂點座標，以及頂點式和一般式之間的關係。",
        category: "數學",
        date: "示範資料"
    },
    {
        title: "英文：現在完成式和過去式的差別",
        content: "兩種時態有時候感覺很像，有沒有比較容易理解的判斷方式？",
        category: "英文",
        date: "示範資料"
    },
    {
        title: "物理：速度與加速度如何區分？",
        content: "物體速度增加不一定代表加速度增加嗎？想了解兩者的關係。",
        category: "物理",
        date: "示範資料"
    },
    {
        title: "化學：莫耳數的計算方式",
        content: "在不同題型中，應該如何選擇適合的公式？",
        category: "化學",
        date: "示範資料"
    },
    {
        title: "資訊：Python 的 list 和 tuple 差異",
        content: "兩者看起來很相似，實際使用上有什麼不同？",
        category: "資訊",
        date: "示範資料"
    },
    {
        title: "生物：細胞呼吸作用的過程",
        content: "希望能理解細胞呼吸作用各階段的關係。",
        category: "生物",
        date: "示範資料"
    },
    {
        title: "地理：季風形成的原因",
        content: "為什麼不同季節的風向會有明顯變化？",
        category: "地理",
        date: "示範資料"
    },
    {
        title: "歷史：工業革命的影響",
        content: "除了生產方式改變之外，工業革命還帶來哪些社會變化？",
        category: "歷史",
        date: "示範資料"
    },
    {
        title: "國文：文言文閱讀理解",
        content: "閱讀文言文時，如何判斷句子的語意和上下文關係？",
        category: "國文",
        date: "示範資料"
    },
    {
        title: "資訊：什麼是 API？",
        content: "常在開發文件看到 API，想知道它在網站開發中扮演什麼角色。",
        category: "資訊",
        date: "示範資料"
    },
    {
        title: "物理：電流與電壓的關係",
        content: "歐姆定律在實際電路中應該如何理解？",
        category: "物理",
        date: "示範資料"
    },
    {
        title: "數學：不等式的解集表示",
        content: "如何正確將不等式的解表示在數線上？",
        category: "數學",
        date: "示範資料"
    }
];


// ===== 問題分頁 =====

const pageSize = 10;
let currentPage = 1;

function renderQuestions() {

    questionList.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const currentQuestions = questions.slice(
        start,
        start + pageSize
    );

    currentQuestions.forEach(question => {

        const card = document.createElement("article");
        card.className = "question-card";

        const meta = document.createElement("div");
        meta.className = "question-meta";

        const category = document.createElement("span");
        category.className = "question-category";
        category.textContent = question.category;

        const date = document.createElement("span");
        date.textContent = question.date;

        const title = document.createElement("h3");
        title.textContent = question.title;

        const content = document.createElement("p");
        content.textContent = question.content;

        meta.append(category, date);
        card.append(meta, title, content);

        questionList.appendChild(card);
    });

    const totalPages = Math.ceil(questions.length / pageSize);

    pageInfo.textContent =
        `第 ${currentPage} 頁，共 ${totalPages} 頁`;

    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
}

prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderQuestions();
    }
});

nextPage.addEventListener("click", () => {
    const totalPages = Math.ceil(questions.length / pageSize);

    if (currentPage < totalPages) {
        currentPage++;
        renderQuestions();
    }
});

renderQuestions();


// ===== 頁面切換 =====

const questionsSection = document.getElementById("questionsSection");
const musicSection = document.getElementById("musicSection");

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", () => {

        if (item.dataset.locked === "true") {
            loginModal.classList.remove("hidden");
            return;
        }

        document.querySelectorAll(".nav-item").forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const section = item.dataset.section;

        questionsSection.classList.toggle(
            "hidden",
            section !== "questions"
        );

        musicSection.classList.toggle(
            "hidden",
            section !== "music"
        );
    });

});


// ===== 初次進入提示 =====

// 同一個分頁工作階段只顯示一次。

if (!sessionStorage.getItem("welcomeShown")) {
    welcomeModal.classList.remove("hidden");
}

welcomeConfirm.addEventListener("click", () => {
    welcomeModal.classList.add("hidden");
    sessionStorage.setItem("welcomeShown", "true");
});


// ===== 受限功能提示 =====

loginModalClose.addEventListener("click", () => {
    loginModal.classList.add("hidden");
});


// 點擊遮罩外側也可以關閉彈窗。

loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add("hidden");
    }
});

console.log("Uschool QA Platform：訪客頁面載入完成！");
