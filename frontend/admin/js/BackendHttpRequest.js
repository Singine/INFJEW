// 登录按钮事件监听
const loginSubmitBtn = document.getElementById("login-submit-btn");
if (loginSubmitBtn) {
  loginSubmitBtn.addEventListener("click", function () {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
      console.log("请输入用户名和密码");
      return;
    }

    fetch("https://www.infjew.com/api/AuthLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 👈 允许携带 cookie
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data); // 打印响应数据以便调试
        if (data.success) {
          console.log("Login successful");
          window.location.href = "https://dashboard.infjew.com";
        } else {
          console.log("Error:", data.message); // 处理错误信息
          document.getElementById("login-username").value = ""; // 清空用户名输入框
          document.getElementById("login-password").value = ""; // 清空密码输入框
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  });
}

// 登出按钮事件监听
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    fetch("https://www.infjew.com/api/AuthLogout", {
      method: "POST", // 使用 POST 方法
      headers: {
        "Content-Type": "application/json", // 设置请求头，指定内容格式为 JSON
      },
      credentials: "include", // 👈 允许携带 cookie
    })
      .then((response) => response.json()) // 解析 JSON 响应
      .then((data) => {
        if (data.success) {
          console.log("Logout successful");
          window.location.href = "https://www.infjew.com/login";
          // 这里可以清除前端的用户状态，例如删除存储的 token 或清空用户信息
        } else {
          console.log("Error:", data.message);
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  });
}
