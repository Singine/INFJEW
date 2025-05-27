window.addEventListener("DOMContentLoaded", function () {
  GetBanner();
});

function GetBanner() {
  fetch("https://www.infjew.com/api/public/banners")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log(data.data); // banner 数据列表
      }
    });
}
