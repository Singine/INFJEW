new gridjs.Grid({
  columns: [
    {
      name: "Code",
      width: "200px",
      formatter: function (e) {
        return gridjs.html('<span class="fw-semibold">' + e + "</span>");
      },
    },
    { name: "Title", width: "250px" },
    { name: "Price", width: "50px" },
    { name: "Discount", width: "50px" },
    { name: "Rating", width: "50px" },
    {
      name: "Status",
      width: "100px",
      formatter: function (e) {
        return gridjs.html(
          e === "1"
            ? '<span class="badge bg-success fs-12 p-1">Active</span>'
            : e === "0"
            ? '<span class="badge bg-primary fs-12 p-1">Sold</span>'
            : e === "2"
            ? '<span class="badge bg-warning fs-12 p-1">On Sale</span>'
            : e === "3"
            ? '<span class="badge bg-danger fs-12 p-1">Unavailable</span>'
            : '<span class="badge bg-secondary-subtle text-secondary fs-12 p-1">Unknown</span>'
        );
      },
    },
    {
      name: "Action",
      width: "100px",
      formatter: function (e) {
        return gridjs.html(
          '<div class="hstack gap-2"><a href="' +
            e[0] +
            '" target="_blank" class="btn btn-soft-success btn-icon btn-sm rounded-circle"><i class="ti ti-edit fs-16"></i></a><a href="javascript:void(0);" class="btn btn-soft-danger btn-icon btn-sm rounded-circle sweet-delete-btn" data-id="' +
            e[1] +
            '"><i class="ti ti-trash"></i></a></div>'
        );
      },
    },
  ],
  pagination: { limit: 10 },
  sort: !0,
  search: !0,
  data: [
    [
      "INF0125051701",
      "Premium | Round Cuts – Starless Stelluna Bracelet",
      "300",
      "-",
      "5",
      "0",
      ["https://www.baidu.com", "INF0125051701"],
    ],
    [
      "INF0125051702",
      "Intestine Cuts - Sparse Star Stelluna Bracelet",
      "300",
      "-",
      "5",
      "1",
      ["https://www.baidu.com", "INF0125051702"],
    ],
    [
      "INF0125051703",
      "Classic Cuts - Jade Frost Clarity Deep Green Stelluna Bracelet",
      "299",
      "199",
      "5",
      "2",
      ["https://www.baidu.com", "INF0125051703"],
    ],
    [
      "INF0125051704",
      "Bob",
      "300",
      "-",
      "5",
      "3",
      ["https://www.baidu.com", "INF0125051701"],
    ],
    [
      "INF0125051705",
      "Eve",
      "300",
      "-",
      "5",
      "3",
      ["https://www.baidu.com", "INF0125051701"],
    ],
    [
      "INF0125051706",
      "Charlie",
      "300",
      "-",
      "5",
      "1",
      ["https://www.baidu.com", "INF0125051701"],
    ],
    [
      "INF0125051707",
      "David",
      "300",
      "-",
      "5",
      "1",
      ["https://www.baidu.com", "INF0125051701"],
    ],
    [
      "INF0125051708",
      "Grace",
      "300",
      "-",
      "5",
      "0",
      ["https://www.baidu.com", "INF0125051701"],
    ],
    [
      "INF0125051709",
      "Heather",
      "300",
      "-",
      "5",
      "0",
      ["https://www.baidu.com", "INF0125051701"],
    ],
    [
      "INF0125051710",
      "Isaac",
      "300",
      "-",
      "5",
      "0",
      ["https://www.baidu.com", "INF0125051701"],
    ],
  ],
}).render(document.getElementById("table-gridjs"));
