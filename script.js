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
    const newsImage = document.getElementById("newsImage");
    const submitComment = document.getElementById("submitComment");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");

    let currentUser = null;
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
                    image: news.enclosure.link,
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
            newsContainer.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-3 shadow-sm">
                        <img src="${news.image}" class="card-img-top" alt="صورة الخبر">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.description}</p>
                        </div>
                    </div>
                </div>`;
        });
    }

    categoryFilter.addEventListener("change", function () {
        displayNews(this.value);
    });

    fetchNews();
});
