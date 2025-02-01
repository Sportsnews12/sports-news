document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const addNewsBtn = document.getElementById("addNewsBtn");
    const submitLogin = document.getElementById("submitLogin");
    const usernameInput = document.getElementById("username");
    const submitNews = document.getElementById("submitNews");
    const newsTitle = document.getElementById("newsTitle");
    const newsContent = document.getElementById("newsContent");
    const newsContainer = document.getElementById("newsContainer");
    const submitComment = document.getElementById("submitComment");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");

    let currentUser = null;
    let comments = [];

    // تسجيل الدخول
    submitLogin.addEventListener("click", function () {
        currentUser = usernameInput.value;
        if (currentUser) {
            localStorage.setItem("currentUser", currentUser);
            loginBtn.classList.add("d-none");
            logoutBtn.classList.remove("d-none");
            addNewsBtn.classList.remove("d-none");
            new bootstrap.Modal(document.getElementById("loginModal")).hide();
        }
    });

    // تسجيل الخروج
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        currentUser = null;
        loginBtn.classList.remove("d-none");
        logoutBtn.classList.add("d-none");
        addNewsBtn.classList.add("d-none");
    });

    // تحميل بيانات المستخدم عند فتح الصفحة
    if (localStorage.getItem("currentUser")) {
        currentUser = localStorage.getItem("currentUser");
        loginBtn.classList.add("d-none");
        logoutBtn.classList.remove("d-none");
        addNewsBtn.classList.remove("d-none");
    }

    // إضافة الأخبار المحلية
    submitNews.addEventListener("click", function () {
        if (!currentUser) return alert("يجب تسجيل الدخول أولًا!");
        const newsHTML = `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${newsTitle.value}</h5>
                        <p class="card-text">${newsContent.value}</p>
                        <p class="text-muted">بقلم: ${currentUser}</p>
                    </div>
                </div>
            </div>`;
        newsContainer.innerHTML += newsHTML;
        new bootstrap.Modal(document.getElementById("addNewsModal")).hide();
    });

    // إضافة التعليقات
    submitComment.addEventListener("click", function () {
        if (!currentUser) return alert("يجب تسجيل الدخول أولًا!");
        const commentHTML = `<li class="list-group-item"><strong>${currentUser}:</strong> ${commentInput.value}</li>`;
        commentList.innerHTML += commentHTML;
        comments.push({ user: currentUser, text: commentInput.value });
        commentInput.value = "";
    });
});
