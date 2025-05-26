document
  .getElementById("login-submit-btn")
  .addEventListener("click", function () {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
      alert("请输入用户名和密码");
      return;
    }

    fetch("http://www.infjew.com/api/AuthLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
        alert("登录失败：" + error.message);
      });
  });
