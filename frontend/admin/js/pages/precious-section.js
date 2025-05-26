window.bannerList = [];
window.countingDown = [];

// 登录状态检查模块
window.addEventListener("DOMContentLoaded", function () {
  fetch("https://www.infjew.com/api/session/status", {
    method: "GET",
    credentials: "include", // 关键：带上 Cookie
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.loggedIn) {
        // 未登录，跳转回登录页
        window.location.href = "https://www.infjew.com/login";
      } else {
        console.log("✅ 已登录用户:", data.username);
      }
    })
    .catch((err) => {
      console.error("❌ Session 检查失败:", err);
      // 如果请求失败也跳转（比如服务挂了）
      window.location.href = "https://www.infjew.com/login";
    });

  fetch("https://www.infjew.com/api/banners", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 如果需要携带 Cookie
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Banner 数据：", data.data);
        bannerList = data.data; // 假设返回的数据格式是 { success: true, data: [...] }
        renderBannerTable(bannerList);
        toggleAddBannerButton(bannerList);
      } else {
        console.log("获取 Banner 失败:", data.message);
      }
    })
    .catch((error) => {
      console.error("请求失败:", error);
    });

  fetch("https://www.infjew.com/api/countingdown", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 如果需要携带 Cookie
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("CountingDown 数据：", data.data);
        countingDown = data.data[0]; // 假设返回的数据格式是 { success: true, data: {...} }
        renderCountingDownTable(countingDown);
      } else {
        console.log("获取 CountingDown 失败:", data.message);
      }
    })
    .catch((error) => {
      console.error("请求失败:", error);
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

  document
    .getElementById("confirm-delete-banner-btn")
    .addEventListener("click", function () {
      const id = parseInt(
        document.getElementById("delete-banner-id").innerHTML.trim()
      );
      // 目标 URL，根据你的后端接口改成真实地址
      deleteBanner(id);
    });

  document.addEventListener("click", function (e) {
    const target = e.target;
    if (target && target.id === "add-banner-btn") {
      fetch("https://www.infjew.com/api/banner/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getAddBannerForm()),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("✅ Banner 新增成功");
            renderBannerTable(data.data); // 重新渲染 banner 表格
            toggleAddBannerButton(data.data); // 更新添加按钮状态

            // 成功后可自动关闭 Modal
            const modal = bootstrap.Modal.getInstance(
              document.getElementById("AddBannerModal")
            );
            if (modal) modal.hide();
          } else {
            console.error("❌ 新增失败: ", data.message);
          }
        })
        .catch((err) => {
          console.error("❌ 请求错误: ", err);
        });
    }
  });
});

function getAddBannerForm() {
  const newBanner = {
    title1: document.getElementById("add-banner-title-1").value.trim(),
    title2: document.getElementById("add-banner-title-2").value.trim(),
    subtitle: document.getElementById("add-banner-subtitle").value.trim(),
    url: document.getElementById("add-banner-url").value.trim(),
    picurl: document.getElementById("add-banner-picture-url").value.trim(),
  };
  return newBanner;
}

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
    price: parseInt(
      document.getElementById("edit-countingdown-price").value.trim()
    ),
    discount: parseInt(
      document.getElementById("edit-countingdown-discount").value.trim()
    ),
    percentage: `${percentageValue}%`,
    rating: parseInt(
      document.getElementById("edit-countingdown-rating-select").value
    ),
    ddl: document.getElementById("edit-countingdown-ddl").value.trim(),
    url: document.getElementById("edit-countingdown-precious-url").value.trim(),
    picurl: document
      .getElementById("edit-countingdown-precious-picture-url")
      .value.trim(),
  };

  console.log("提交的数据：", editCountingDownPreciousData);
  return editCountingDownPreciousData;
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
        src="${data.picurl}"
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
        data-bs-title="${data.url}"
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

  document
    .getElementById("countingdown-precious-edit-btn")
    .addEventListener("click", function () {
      fillCountingDownModal(countingDown);
    });

  document.addEventListener("click", function (e) {
    const target = e.target;
    if (target && target.id === "save-countingdown-precious-btn") {
      const updatedData = getCountingDownPreciousForm();

      fetch("https://www.infjew.com/api/countingdown/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 带上 Cookie
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            console.log("✅ 更新成功");

            // 重新获取最新 countingDown 数据
            fetch("https://www.infjew.com/api/countingdown", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  countingDown = data.data[0];
                  renderCountingDownTable(countingDown);

                  // 成功后可自动关闭 Modal
                  const modal = bootstrap.Modal.getInstance(
                    document.getElementById("EditCountingDownModal")
                  );
                  if (modal) modal.hide();
                } else {
                  console.error("❌ 更新后拉取最新数据失败:", data.message);
                }
              });
          } else {
            console.error("❌ 更新失败:", res.message);
          }
        })
        .catch((err) => {
          console.error("❌ 请求更新失败:", err);
        });
    }
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
    data.url || "";
  document.getElementById("edit-countingdown-precious-picture-url").value =
    data.picurl || "";
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
          src="${item.picurl}"
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
          data-bs-title="${item.url}"
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

function deleteBanner(bannerId) {
  fetch("https://www.infjew.com/api/banner/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: bannerId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Banner 删除成功");
        // 删除成功后重新渲染 banner 列表
        renderBannerTable(data.data); // 重新渲染
        toggleAddBannerButton(data.data); // 更新添加按钮状态
      } else {
        console.log("Banner 删除失败:", data.message);
      }
    })
    .catch((error) => {
      console.error("请求失败:", error);
    });
}
