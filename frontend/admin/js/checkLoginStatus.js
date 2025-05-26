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
});
