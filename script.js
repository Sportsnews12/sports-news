document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("newsContainer");
    const newsTicker = document.getElementById("newsTicker");
    const modalTitle = document.getElementById("modalTitle");
    const modalContent = document.getElementById("modalContent");
    const modalImage = document.getElementById("modalImage");

    // جلب الأخبار من API خارجي
    async function fetchNews() {
        try {
            const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.espn.com/espn/rss/news");
            const data = await response.json();

            let tickerText = "";
            newsContainer.innerHTML = "";

            data.items.slice(0, 6).forEach((news, index) => {
                tickerText += ` 🔥 ${news.title} |`;
                
                const newsCard = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${news.enclosure.link || 'images/default.jpg'}" class="card-img-top" alt="خبر">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${news.description.substring(0, 100)}...</p>
                                <button class="btn btn-primary read-more" data-index="${index}" data-title="${news.title}" data-content="${news.description}" data-image="${news.enclosure.link}">اقرأ المزيد</button>
                            </div>
                        </div>
                    </div>
                `;
                newsContainer.innerHTML += newsCard;
            });

            newsTicker.innerHTML = tickerText;

            // ربط زر "اقرأ المزيد" مع النافذة المنبثقة
            document.querySelectorAll(".read-more").forEach(button => {
                button.addEventListener("click", function () {
                    modalTitle.innerText = this.getAttribute("data-title");
                    modalContent.innerHTML = this.getAttribute("data-content");
                    modalImage.src = this.getAttribute("data-image") || "images/default.jpg";
                    new bootstrap.Modal(document.getElementById("newsModal")).show();
                });
            });

        } catch (error) {
            console.error("فشل تحميل الأخبار:", error);
            newsTicker.innerHTML = "حدث خطأ أثناء تحميل الأخبار.";
        }
    }

    fetchNews();

    // تفعيل الوضع الليلي
    document.getElementById("toggleDarkMode").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
});