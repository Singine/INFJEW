window.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  GetBanner();
  GetCountingDown();
  GetPreciousList();
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
      //   simplyCountdown(".simply-countdown-one", {
      //     year: ddl.getFullYear(),
      //     month: ddl.getMonth() + 1,
      //     day: ddl.getDate(),
      //     hours: ddl.getHours(),
      //     minutes: ddl.getMinutes(),
      //     seconds: ddl.getSeconds(),
      //     enableUtc: false,
      //   });

      simplyCountdown(".simply-countdown-one", {
        year: ddl.getFullYear(),
        month: ddl.getMonth() + 1,
        day: ddl.getDate(),
      });
    })
    .catch((err) => {
      console.error("获取倒计时数据失败:", err);
    });
}

function GetPreciousList() {
  fetch("https://www.infjew.com/api/public/preciouslist")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        renderProducts(data.data);
      } else {
        console.error("数据获取失败");
      }
    })
    .catch((error) => {
      console.error("请求失败:", error);
    });
}

function renderProducts(products) {
  // 获取到展示区域
  const allProductsContainer = document.querySelector("#all-products .row");
  const stellunaProductsContainer =
    document.querySelector("#top-stelluna .row");
  const adornmentProductsContainer = document.querySelector(
    "#top-adornment .row"
  );

  // 清空现有内容
  allProductsContainer.innerHTML = "";
  stellunaProductsContainer.innerHTML = "";
  adornmentProductsContainer.innerHTML = "";

  // 遍历产品数据，渲染到不同的区域
  products.forEach((product) => {
    const productCard = createProductCard(product);

    // 根据标签(tag)决定插入位置
    if (product.tag === "Stelluna") {
      stellunaProductsContainer.appendChild(productCard);
    } else if (product.tag === "Adornment") {
      adornmentProductsContainer.appendChild(productCard);
    }

    // 不管标签如何，都插入到所有产品列表中
    allProductsContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const col = document.createElement("div");
  col.classList.add("col-xl-3", "col-lg-4", "col-md-6", "col-12");

  const card = document.createElement("div");
  card.classList.add("top-product-wrapper", "jump-to-new");
  card.dataset.jump = product.url;

  const inner = document.createElement("div");
  inner.classList.add(
    "top-product-inner",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  // 如果产品已售罄，显示"Sold out"
  if (product.status === 0) {
    const soldOut = document.createElement("div");
    soldOut.classList.add("sold-out-inner");
    soldOut.innerHTML = "<span>Sold out</span>";
    inner.appendChild(soldOut);
  }

  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("top-prod-thumb");
  const image = document.createElement("img");
  image.src = product.picurl;
  image.alt = product.title;
  imageWrapper.appendChild(image);
  inner.appendChild(imageWrapper);

  card.appendChild(inner);

  const content = document.createElement("div");
  content.classList.add("top-prod-content");

  const title = document.createElement("h5");
  title.classList.add("top-product-title");
  title.innerHTML = product.title;
  content.appendChild(title);

  const rating = document.createElement("div");
  rating.classList.add("product-rating");
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("i");
    star.classList.add("las", "la-star");
    if (i >= product.rating) {
      star.classList.add("inactive");
    }
    rating.appendChild(star);
  }
  content.appendChild(rating);

  const price = document.createElement("div");
  price.classList.add("product-price");
  const priceText = document.createElement("p");
  if (product.discount < product.price) {
    const originalPrice = document.createElement("span");
    originalPrice.innerHTML = `$${product.price.toFixed(2)}`;
    originalPrice.classList.add("original-price");
    priceText.innerHTML = `$${product.discount.toFixed(2)} `;
    priceText.appendChild(originalPrice);
  } else {
    priceText.innerHTML = `$${product.discount.toFixed(2)}`;
  }
  price.appendChild(priceText);
  content.appendChild(price);

  card.appendChild(content);
  col.appendChild(card);

  return col;
}
