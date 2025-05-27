Array.from(document.getElementsByClassName("form-check-input-add")).forEach(
  function (radio) {
    radio.addEventListener("click", function () {
      if (document.getElementById("add-statusRadio2").checked) {
        document
          .getElementById("add-precious-discount")
          .removeAttribute("disabled");
      } else {
        document
          .getElementById("add-precious-discount")
          .setAttribute("disabled", "disabled");
      }
    });
  }
);
Array.from(document.getElementsByClassName("form-check-input-edit")).forEach(
  function (radio) {
    radio.addEventListener("click", function () {
      if (document.getElementById("edit-statusRadio2").checked) {
        document
          .getElementById("edit-precious-discount")
          .removeAttribute("disabled");
      } else {
        document
          .getElementById("edit-precious-discount")
          .setAttribute("disabled", "disabled");
      }
    });
  }
);

document
  .getElementById("add-precious-btn")
  .addEventListener("click", function () {
    const addPreciousData = {
      id: document.getElementById("add-precious-id").value.trim(),
      title: document.getElementById("add-precious-title").value.trim(),
      price: document.getElementById("add-precious-price").value.trim(),
      status:
        document
          .querySelector('input[name="add-statusRadio"]:checked')
          ?.nextElementSibling.innerText.trim() || "",
      discount:
        parseFloat(document.getElementById("add-precious-discount").value) || 0,
      tag: document.getElementById("add-precious-tag").value,
      rating: parseInt(document.getElementById("add-rating-select").value),
      Url: document.getElementById("add-precious-url").value.trim(),
      pictureUrl: document
        .getElementById("add-precious-picture-url")
        .value.trim(),
    };

    console.log("提交的数据：", addPreciousData);

    // // 请求 API
    // fetch("/api/precious", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataPrecious),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok.");
    //     }
    //     return response.json(); // 如果后端返回 JSON
    //   })
    //   .then((result) => {
    //     console.log("服务器响应：", result);
    //     alert("添加成功！");
    //   })
    //   .catch((error) => {
    //     console.error("发送请求出错:", error);
    //     alert("提交失败，请检查网络或数据格式。");
    //   });
  });

document
  .getElementById("close-save-precious-btn")
  .addEventListener("click", function () {
    clearPreciousForm();
  });

document.getElementById("table-gridjs").addEventListener("click", function (e) {
  const editBtn = e.target.closest(".table-edit-precious-btn");

  if (editBtn) {
    const result = preciousListData.find((row) =>
      row.includes(editBtn.getAttribute("data-id"))
    );

    fillEditForm(result);
  }
});

document
  .getElementById("save-precious-btn")
  .addEventListener("click", function () {
    getEditPreciousForm();
  });

function fillEditForm(result) {
  // 确保 result 有足够的字段
  if (!result || result.length < 7) return;

  // 填写对应字段
  document.getElementById("edit-precious-id").value = result[0];
  document.getElementById("edit-precious-title").value = result[1];
  document.getElementById("edit-precious-price").value = result[3];

  // 根据 status 设置 radio
  const statusMap = {
    Sold: "edit-statusRadio0",
    Active: "edit-statusRadio1",
    Sale: "edit-statusRadio2",
    Unavailable: "edit-statusRadio3",
  };

  const statusRadioId = statusMap[result[6]];
  if (statusRadioId) {
    const radio = document.getElementById(statusRadioId);

    if (radio) {
      radio.checked = true;
      radio.setAttribute("checked", "checked");
    }
  }

  // 折扣逻辑
  const discountInput = document.getElementById("edit-precious-discount");
  if (result[6] === "Sale") {
    discountInput.disabled = false;
    discountInput.value = result[4] !== "-" ? result[4] : "";
  } else {
    discountInput.disabled = true;
    discountInput.value = "";
  }

  // 设置 Tag（如果有对应项）
  const tagSelect = document.getElementById("edit-precious-tag");
  tagSelect.value = result[2]; // 假设 result[2] 是 "Stelluna" 或 "Adornment"

  // 设置 Ratings（默认为 5）
  const ratingSelect = document.getElementById("edit-rating-select");
  for (let i = 0; i < ratingSelect.options.length; i++) {
    if (ratingSelect.options[i].value === result[5]) {
      ratingSelect.selectedIndex = i;
      break;
    }
  }

  document.getElementById("edit-precious-url").value = result[7];

  // 模拟图片地址为 PreciousId（你可以换成实际字段）
  document.getElementById(
    "edit-precious-picture-url"
  ).value = `https://yourcdn.com/images/${result[0]}.jpg`;
}

function clearPreciousForm() {
  // 文本输入框清空
  document.getElementById("edit-precious-id").value = "";
  document.getElementById("edit-precious-title").value = "";
  document.getElementById("edit-precious-price").value = "";
  document.getElementById("edit-precious-discount").value = "";
  document.getElementById("edit-precious-url").value = "";
  document.getElementById("edit-precious-picture-url").value = "";

  // 折扣栏 disabled 状态恢复（可选）
  document.getElementById("edit-precious-discount").disabled = true;

  // 单选框（statusRadio）全部取消选中
  document.querySelectorAll('input[name="statusRadio"]').forEach((radio) => {
    radio.checked = false;
    radio.removeAttribute("checked");
  });

  // 下拉菜单重置为第一个选项
  document.getElementById("edit-precious-tag").selectedIndex = 0;
  document.getElementById("edit-rating-select").selectedIndex = 0;
}

function getEditPreciousForm() {
  const editPreciousData = {
    id: document.getElementById("edit-precious-id").value.trim(),
    title: document.getElementById("edit-precious-title").value.trim(),
    price: document.getElementById("edit-precious-price").value.trim(),
    status:
      document
        .querySelector('input[name="edit-statusRadio"]:checked')
        ?.nextElementSibling.innerText.trim() || "",
    discount:
      parseFloat(document.getElementById("edit-precious-discount").value) || 0,
    tag: document.getElementById("edit-precious-tag").value,
    rating: parseInt(document.getElementById("edit-rating-select").value),
    Url: document.getElementById("edit-precious-url").value.trim(),
    pictureUrl: document
      .getElementById("edit-precious-picture-url")
      .value.trim(),
  };

  console.log("提交的数据：", editPreciousData);
}
