document.addEventListener("DOMContentLoaded", function () {
    const mainNews = document.getElementById("mainNews");
    const importantNews = document.getElementById("importantNews");
    const selectedNews = document.getElementById("selectedNews");

    const newsData = [
        { title: "🚀 فوز برشلونة في الكلاسيكو!", category: "main", image: "https://via.placeholder.com/300" },
        { title: "🔥 محمد صلاح يسجل هدفًا رائعًا!", category: "important", image: "https://via.placeholder.com/300" },
        { title: "⭐ ميسي يفوز بجائزة أفضل لاعب!", category: "selected", image: "https://via.placeholder.com/300" }
    ];

    function displayNews() {
        newsData.forEach(news => {
            const newsCard = `
                <div class="col-md-4">
                    <div class="card mb-3 shadow-sm">
                        <img src="${news.image}" class="card-img-top" alt="صورة الخبر">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                        </div>
                    </div>
                </div>
            `;

            if (news.category === "main") {
                mainNews.innerHTML += newsCard;
            } else if (news.category === "important") {
                importantNews.innerHTML += newsCard;
            } else if (news.category === "selected") {
                selectedNews.innerHTML += newsCard;
            }
        });
    }

    displayNews();
});
