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

    fetch("http://www.infjew.com/api/AuthLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data); // 打印响应数据以便调试
        if (data.success) {
          console.log("Login successful");
          window.location.href = "http://dashboard.infjew.com";
        } else {
          console.log("Error:", data.message); // 处理错误信息
        }
      });
  });
}

// 登出按钮事件监听
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    fetch("http://www.infjew.com/api/AuthLogout", {
      method: "POST", // 使用 POST 方法
      headers: {
        "Content-Type": "application/json", // 设置请求头，指定内容格式为 JSON
      },
    })
      .then((response) => response.json()) // 解析 JSON 响应
      .then((data) => {
        if (data.success) {
          console.log("Logout successful");
          // 这里可以清除前端的用户状态，例如删除存储的 token 或清空用户信息
        } else {
          console.log("Error:", data.message);
        }
      });
  });
}
