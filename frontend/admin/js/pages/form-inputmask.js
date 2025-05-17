document.getElementById("onSale").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("preciousDiscounts").removeAttribute("disabled");
  } else {
    document
      .getElementById("preciousDiscounts")
      .setAttribute("disabled", "disabled");
  }
});
