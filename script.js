document.addEventListener("DOMContentLoaded", function () {
  // عناصر الأقسام
  const mainNews = document.getElementById("mainNews");
  const importantNews = document.getElementById("importantNews");
  const selectedNews = document.getElementById("selectedNews");
  const commentInput = document.getElementById("commentInput");
  const submitComment = document.getElementById("submitComment");
  const commentList = document.getElementById("commentList");
  const urgentToastEl = document.getElementById("urgentToast");
  const urgentToast = new bootstrap.Toast(urgentToastEl);
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const submitLogin = document.getElementById("submitLogin");
  const usernameInput = document.getElementById("username");

  // الحصول على اسم المستخدم من localStorage إن وجد
  let currentUser = localStorage.getItem("currentUser") || null;
  if (currentUser) {
    loginBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");
  }

  // بيانات تجريبية للأخبار (يمكن استبدالها ببيانات من API مثل ESPN أو BBC Sport)
  const newsData = [
    { title: "🚀 فوز برشلونة في الكلاسيكو!", category: "main", image: "https://via.placeholder.com/300x200?text=برشلونة" },
    { title: "🔥 محمد صلاح يسجل هدفًا رائعًا!", category: "important", image: "https://via.placeholder.com/300x200?text=صلاح" },
    { title: "⭐ ميسي يفوز بجائزة أفضل لاعب!", category: "selected", image: "https://via.placeholder.com/300x200?text=ميسي" },
    { title: "⚡ خبر عاجل: إصابة لاعب أساسي!", category: "main", image: "https://via.placeholder.com/300x200?text=عاجل" }
  ];

  // دالة عرض الأخبار في الأقسام المناسبة
  function displayNews() {
    // تفريغ المحتويات القديمة
    mainNews.innerHTML = "";
    importantNews.innerHTML = "";
    selectedNews.innerHTML = "";

    newsData.forEach(news => {
      const newsCard = `
        <div class="col-md-4">
          <div class="card shadow-sm">
            <img src="${news.image}" class="card-img-top" alt="صورة الخبر">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-sm btn-primary">شارك</a>
                <a href="#" class="btn btn-sm btn-secondary">تعليق</a>
              </div>
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

    // عرض إشعار الخبر العاجل إذا وجد خبر يحتوي على كلمة "عاجل"
    if (newsData.some(news => news.title.includes("عاجل"))) {
      urgentToastEl.querySelector(".toast-body").innerText = "خبر عاجل: تم تحديث الأخبار!";
      urgentToast.show();
    }
  }

  displayNews();

  // إضافة التعليقات
  submitComment.addEventListener("click", function () {
    if (!currentUser) {
      alert("يرجى تسجيل الدخول لإضافة تعليق.");
      return;
    }
    const text = commentInput.value.trim();
    if (text !== "") {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerText = `${currentUser}: ${text}`;
      commentList.appendChild(li);
      commentInput.value = "";
    }
  });

  // التعامل مع تسجيل الدخول
  loginBtn.addEventListener("click", function () {
    const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
  });

  submitLogin.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    if (username !== "") {
      currentUser = username;
      localStorage.setItem("currentUser", currentUser);
      loginBtn.classList.add("d-none");
      logoutBtn.classList.remove("d-none");
      const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      loginModal.hide();
    }
  });

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    currentUser = null;
    loginBtn.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
  });
});
