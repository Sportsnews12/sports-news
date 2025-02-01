document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("newsContainer");
    const newsTicker = document.getElementById("newsTicker");
    const categoryFilter = document.getElementById("categoryFilter");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const addNewsBtn = document.getElementById("addNewsBtn");
    const submitLogin = document.getElementById("submitLogin");
    const usernameInput = document.getElementById("username");
    const submitNews = document.getElementById("submitNews");
    const newsTitle = document.getElementById("newsTitle");
    const newsContent = document.getElementById("newsContent");
    const submitComment = document.getElementById("submitComment");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");

    let currentUser = null;
    let comments = [];
    let allNews = [];

    async function fetchNews() {
        let tickerText = "";
        allNews = [];

        try {
            const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.espn.com/espn/rss/news");
            const data = await response.json();

            data.items.slice(0, 5).forEach(news => {
                allNews.push({
                    title: news.title,
                    description: news.description.substring(0, 100),
                    category: "football"
                });
                tickerText += ` 🔥 ${news.title} |`;
            });

        } catch (error) {
            console.error("فشل تحميل الأخبار:", error);
        }

        newsTicker.innerHTML = tickerText;
        displayNews("all");
    }

    function displayNews(category) {
        newsContainer.innerHTML = "";
        const filteredNews = category === "all" ? allNews : allNews.filter(news => news.category === category);

        filteredNews.forEach(news => {
            newsContainer.innerHTML += `<div class="card p-2 m-2"><h5>${news.title}</h5><p>${news.description}</p></div>`;
        });
    }

    categoryFilter.addEventListener("change", function () {
        displayNews(this.value);
    });

    submitLogin.addEventListener("click", function () {
        currentUser = usernameInput.value;
        localStorage.setItem("currentUser", currentUser);
        loginBtn.classList.add("d-none");
        logoutBtn.classList.remove("d-none");
        addNewsBtn.classList.remove("d-none");
    });

    submitComment.addEventListener("click", function () {
        if (!currentUser) return alert("يجب تسجيل الدخول أولًا!");
        commentList.innerHTML += `<li>${currentUser}: ${commentInput.value}</li>`;
        commentInput.value = "";
    });

    fetchNews();
});
