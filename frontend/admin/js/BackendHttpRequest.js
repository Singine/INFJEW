document
  .getElementById("login-submit-btn")
  .addEventListener("click", function () {
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
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "登录失败");
        }
        return response.json();
      })
      .then((data) => {
        alert("登录成功");
        // 之后加 JWT 的话可以存 token: localStorage.setItem("token", data.token)
        window.location.href = "http://dashboard.infjew.com";
      })
      .catch((error) => {
        console.log("登录失败：" + error.message);
      });
  });

document.getElementById("logout-btn").addEventListener("click", function () {
  fetch("http://www.infjew.com/api/AuthLogout", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("登出成功！");
        // localStorage.removeItem("token"); // 如果将来你用 JWT
        window.location.href = "http://www.infjew.com/login";
      } else {
        alert("登出失败：" + data.message);
      }
    })
    .catch((err) => {
      console.error("登出请求失败", err);
      alert("请求失败，请稍后重试");
    });
});
