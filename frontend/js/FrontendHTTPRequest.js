window.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  GetBanner();
});

function GetBanner() {
  fetch("https://www.infjew.com/api/public/banners")
    .then((res) => res.json())
    .then((data) => {
      if (!data.success || !Array.isArray(data.data)) {
        console.error("获取 banner 失败:", data.message);
        return;
      }
      console.log("data", data);
      const carousel = $(".hero-area-slider");
      console.log("$carousel", carousel);

      // ✅ 1. 销毁旧的 owlCarousel（如果已经初始化）
      if (carousel.hasClass("owl-loaded")) {
        carousel.trigger("destroy.owl.carousel");
        carousel.html(""); // 清空 DOM
        carousel.removeClass("owl-loaded owl-hidden"); // 干净移除 class
      }

      // ✅ 2. 动态添加每一个 slide
      data.data.forEach((banner) => {
        const slideHtml = `
        <div class="single-slide-item">
          <div class="row d-flex align-items-center">
            <div class="col-xl-5 col-lg-5 col-md-6 col-12">
              <div class="hero-area-inner">
                <div class="section-title">
                  <p class="mb-20">${banner.subtitle}</p>
                  <h1>${banner.title1}</h1>
                  <h1>${banner.title2}</h1>
                </div>
                <a href="${banner.url}" class="main-btn mt-40" target="_blank">Shop Now</a>
              </div>
            </div>
            <div class="col-xl-7 col-lg-7 col-md-6 col-12">
              <div class="hero-area-right">
                <div class="hero-area-img">
                  <img src="${banner.picurl}" alt="Banner Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
        carousel.append(slideHtml);
      });

      // ✅ 3. 重新初始化 Owl Carousel
      carousel.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        dots: false,
        responsiveClass: true,
      });
    })
    .catch((err) => {
      console.error("请求 banner 出错:", err);
    });
}

function GetCountingDown() {
  fetch("https://www.infjew.com/api/public/countingdown")
    .then((res) => res.json())
    .then((data) => {
      if (!data.success || !data.data || data.data.length === 0) {
        console.error("无倒计时数据可展示");
        return;
      }

      const item = data.data[0]; // 取第一个商品

      const container = document.getElementById("countingdownContainer");
      if (!container) return;

      // 更新标题和折扣信息
      container.querySelector(
        "h4"
      ).innerHTML = `Precious Sale <span>${item.percentage} Off</span>`;
      container.querySelector("h2").textContent = item.title;

      // 更新评分
      const ratingEl = container.querySelector(".item-rating");
      ratingEl.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        const star = document.createElement("i");
        star.className = "las la-star" + (i < item.rating ? "" : " inactive");
        ratingEl.appendChild(star);
      }

      // 更新价格
      const priceEl = container.querySelector(".item-price p");
      priceEl.innerHTML = `$${item.discount} <span>$${item.price}</span>`;

      // 更新按钮链接
      const goBtn = document.getElementById("go-for-it-btn");
      if (goBtn) {
        goBtn.href = item.url;
      }

      // 更新图片
      const imgEl = document.querySelector(".countdown-img img");
      if (imgEl) {
        imgEl.src = item.picurl;
      }

      // 初始化倒计时
      const ddl = new Date(item.ddl);
      simplyCountdown(".simply-countdown-one", {
        year: ddl.getFullYear(),
        month: ddl.getMonth() + 1,
        day: ddl.getDate(),
        hours: ddl.getHours(),
        minutes: ddl.getMinutes(),
        seconds: ddl.getSeconds(),
        enableUtc: false,
      });
    })
    .catch((err) => {
      console.error("获取倒计时数据失败:", err);
    });
}
