window.countingDown = {
  title: "Collection of Formless Stelluna",
  price: "999",
  discount: "666",
  percentage: "-33%",
  rating: "5",
  ddl: "2025/10/30",
  Url: "https://store.infjew.com/INF-00-00000000",
  pictureUrl: "images/users/avatar-1.png",
};

window.bannerList = [
  {
    id: 1,
    title1: "New Collections",
    title2: "Coming up",
    subtitle: "Trending products of Summer 2025",
    Url: "https://store.infjew.com/INF-00-00000001",
    pictureUrl: "images/users/avatar-1.png",
  },
  {
    id: 2,
    title1: "New Collections",
    title2: "Coming up",
    subtitle: "Trending products of Summer 2025",
    Url: "https://store.infjew.com/INF-00-00000002",
    pictureUrl: "images/users/avatar-1.png",
  },
];

renderBannerTable(bannerList);
renderCountingDownTable(countingDown);

document.addEventListener("DOMContentLoaded", function () {
  toggleAddBannerButton(bannerList);
});

document
  .getElementById("countingdown-precious-edit-btn")
  .addEventListener("click", function () {
    fillCountingDownModal(countingDown);
  });

document
  .getElementById("save-countingdown-precious-btn")
  .addEventListener("click", function () {
    getCountingDownPreciousForm();
  });

// 使用事件委托监听 .banner-delete-trash 的点击事件
document.addEventListener("click", function (e) {
  // 判断是否点击的是 .banner-delete-trash 元素
  if (e.target.closest(".banner-delete-trash")) {
    const target = e.target.closest(".banner-delete-trash");
    const bannerId = target.getAttribute("data-banner-id"); // 获取 data-banner-id 的值

    // 设置 #delete-banner-id 元素的内容为 bannerId
    const idContainer = document.getElementById("delete-banner-id");
    if (idContainer) {
      idContainer.innerHTML = bannerId;
    }
  }
});

function getCountingDownPreciousForm() {
  const priceValue = parseFloat(
    document.getElementById("edit-countingdown-price").value.trim()
  );
  const discountValue = parseFloat(
    document.getElementById("edit-countingdown-discount").value.trim()
  );

  let percentageValue = 0;
  if (priceValue && discountValue) {
    percentageValue = -Math.round(
      ((priceValue - discountValue) / priceValue) * 100
    );
  }
  const editCountingDownPreciousData = {
    title: document.getElementById("edit-countingdown-title").value.trim(),
    price: document.getElementById("edit-countingdown-price").value.trim(),
    discount: document
      .getElementById("edit-countingdown-discount")
      .value.trim(),
    percentage: `${percentageValue}%`,
    rating: parseInt(
      document.getElementById("edit-countingdown-rating-select").value
    ),
    ddl: document.getElementById("edit-countingdown-ddl").value.trim(),
    Url: document.getElementById("edit-countingdown-precious-url").value.trim(),
    pictureUrl: document
      .getElementById("edit-countingdown-precious-picture-url")
      .value.trim(),
  };

  console.log("提交的数据：", editCountingDownPreciousData);
}

// function renderCountingDownData(data) {
//   // 确保 result 有足够的字段
//   if (!data || data.length < 8) return;

//   // 填写对应字段
//   document.getElementById("inner-countingdown-precious-image").src =
//     data.pictureUrl;

//   // 填充文本内容
//   document.getElementById("inner-countingdown-precious-title").innerText =
//     data.title;
//   document.getElementById("inner-countingdown-precious-price").innerText =
//     data.price;
//   document.getElementById("inner-countingdown-precious-discount").innerText =
//     data.discount;
//   document.getElementById("inner-countingdown-precious-percentage").innerText =
//     data.percentage;
//   document.getElementById("inner-countingdown-precious-rating").innerText =
//     data.rating;
//   document.getElementById("inner-countingdown-precious-ddl").innerText =
//     data.ddl;

//   // 设置链接
//   const urlElement = document.getElementById("inner-countingdown-precious-url");
//   urlElement.href = data.Url;
//   urlElement.setAttribute("data-bs-title", data.Url);
// }
function renderCountingDownTable(data) {
  const tbody = document.getElementById("index-counting-down-tbody");

  // 清空原始内容
  tbody.innerHTML = "";

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>
      <img
        src="${data.pictureUrl}"
        alt="table-user"
        class="me-2 avatar-xl"
      />
    </td>
    <td>${data.title}</td>
    <td>$${data.price}</td>
    <td>$${data.discount}</td>
    <td>
      <span class="badge bg-infjew fs-12 p-1">${data.percentage}</span>
    </td>
    <td>${data.rating}</td>
    <td>${data.ddl}</td>
    <td class="text-muted">
      <a
        href="javascript:void(0);"
        class="link-reset fs-20 p-1 text-infjew"
        data-bs-toggle="tooltip"
        data-bs-trigger="hover"
        data-bs-title="${data.Url}"
      >
        <i class="ti ti-link"></i>
      </a>
    </td>
    <td class="text-muted">
      <a
        href="javascript:void(0);"
        class="link-reset fs-20 p-1"
        data-bs-toggle="modal"
        data-bs-target="#EditCountingDownModal"
        id="countingdown-precious-edit-btn"
      >
        <i class="ti ti-pencil"></i>
      </a>
    </td>
  `;

  tbody.appendChild(row);

  // 激活 tooltip
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (el) {
    new bootstrap.Tooltip(el);
  });
}

function fillCountingDownModal(data) {
  // 填入 modal 表单中的字段
  document.getElementById("edit-countingdown-title").value = data.title || "";
  document.getElementById("edit-countingdown-price").value = data.price || "";
  document.getElementById("edit-countingdown-discount").value =
    data.discount || "";
  document.getElementById("edit-countingdown-rating-select").value =
    data.rating || "1";
  document.getElementById("edit-countingdown-ddl").value = data.ddl || "";
  document.getElementById("edit-countingdown-precious-url").value =
    data.Url || "";
  document.getElementById("edit-countingdown-precious-picture-url").value =
    data.pictureUrl || "";
}

function renderBannerTable(data) {
  const tableBody = document.getElementById("index-banner-list-tbody");

  // 清空旧内容
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <img
          src="${item.pictureUrl}"
          alt="table-user"
          class="me-2 avatar-xl"
        />
      </td>
      <td>${item.id}</td>
      <td>${item.title1}</td>
      <td>${item.title2}</td>
      <td>${item.subtitle}</td>
      <td class="text-muted">
        <a
          href="javascript:void(0);"
          class="link-reset fs-20 p-1 text-infjew"
          data-bs-toggle="tooltip"
          data-bs-trigger="hover"
          data-bs-title="${item.Url}"
        >
          <i class="ti ti-link"></i>
        </a>
      </td>
      <td class="text-muted">
        <a
          href="javascript:void(0);"
          class="link-reset fs-20 p-1 banner-delete-trash" data-banner-id="${item.id}"
          data-bs-toggle="modal"
        data-bs-target="#banner-delete-warning-modal"
          
        >
          <i class="ti ti-trash"></i>
        </a>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // 重新激活 Bootstrap Tooltip（必须的）
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

function toggleAddBannerButton(data) {
  const addButton = document.getElementById("add-banner-modal-btn");
  const maxBannerCount = 3;

  if (data.length >= maxBannerCount) {
    addButton.classList.add("disabled");
    addButton.setAttribute("disabled", "disabled");
  } else {
    addButton.classList.remove("disabled");
    addButton.removeAttribute("disabled");
  }
}
