window.addEventListener("DOMContentLoaded", function () {
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

      const carousel = document.getElementById("banner-carousel");
      carousel.innerHTML = ""; // 清空旧内容

      data.data.forEach((banner) => {
        const slide = document.createElement("div");
        slide.className = "single-slide-item";

        slide.innerHTML = `
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
      `;

        carousel.appendChild(slide);
      });

      // 重新初始化 owlCarousel（确保在 DOM 加载后执行）
      $(".hero-area-slider").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: true,
        dots: true,
      });
    })
    .catch((err) => {
      console.error("请求 banner 出错:", err);
    });
}
