window.preciousList = [
  [
    "INF0125051701",
    "Premium | Round Cuts – Starless Stelluna Bracelet",
    "Stelluna",
    "300",
    "-",
    "5",
    "Sold",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051701",
  ],
  [
    "INF0125051702",
    "Intestine Cuts - Sparse Star Stelluna Bracelet",
    "Stelluna",
    "300",
    "-",
    "5",
    "Active",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051702",
  ],
  [
    "INF0125051703",
    "Classic Cuts - Jade Frost Clarity Deep Green Stelluna Bracelet",
    "Stelluna",
    "299",
    "199",
    "5",
    "Sale",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051703",
  ],
  [
    "INF0125051704",
    "Bob",
    "Stelluna",
    "300",
    "-",
    "5",
    "Unavailable",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051704",
  ],
  [
    "INF0125051705",
    "Eve",
    "Stelluna",
    "300",
    "-",
    "5",
    "Unavailable",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051705",
  ],
  [
    "INF0125051706",
    "Charlie",
    "Stelluna",
    "300",
    "-",
    "5",
    "Active",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051706",
  ],
  [
    "INF0125051707",
    "David",
    "Stelluna",
    "300",
    "-",
    "5",
    "Active",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051707",
  ],
  [
    "INF0125051708",
    "Grace",
    "Stelluna",
    "300",
    "-",
    "5",
    "Sold",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051708",
  ],
  [
    "INF0125051709",
    "Heather",
    "Stelluna",
    "300",
    "-",
    "5",
    "Sold",
    "https://store.infjew.com/INF-00-00000000",
    "INF0125051709",
  ],
  [
    "INF0125051710",
    "Isaac",
    "Adornment",
    "300",
    "-",
    "5",
    "Sold",
    "",
    "INF0125051710",
  ],
];

new gridjs.Grid({
  columns: [
    {
      name: "ID",
      width: "200px",
      formatter: function (e) {
        return gridjs.html('<span class="fw-semibold">' + e + "</span>");
      },
    },
    { name: "Title", width: "250px" },
    { name: "Tag", width: "120px" },
    { name: "Price", width: "50px" },
    {
      name: "Discount",
      width: "50px",
    },
    { name: "Rating", width: "50px" },
    {
      name: "Status",
      width: "100px",
      formatter: function (e) {
        return gridjs.html(
          e === "Active"
            ? '<span class="badge bg-success fs-12 p-1">Active</span>'
            : e === "Sold"
            ? '<span class="badge bg-primary fs-12 p-1">Sold</span>'
            : e === "Sale"
            ? '<span class="badge bg-warning fs-12 p-1">Sale</span>'
            : e === "Unavailable"
            ? '<span class="badge bg-danger fs-12 p-1">Unavailable</span>'
            : '<span class="badge bg-secondary-subtle text-secondary fs-12 p-1">Unknown</span>'
        );
      },
    },
    {
      name: "Url",
      width: "50px",
      formatter: function (e) {
        return gridjs.html(
          e != ""
            ? '<a href="javascript: void(0);" class="link-reset fs-20 p-1 text-infjew"><i class="ti ti-link"></i></a>'
            : '<a href="javascript: void(0);" class="link-reset fs-20 p-1 text-light"><i class="ti ti-link"></i></a>'
        );
      },
    },
    {
      name: "Action",
      width: "100px",
      formatter: function (e) {
        return gridjs.html(
          '<div class="hstack gap-2"><a data-bs-toggle="modal" data-bs-target="#EditPreciousModal" data-id="' +
            e +
            '" target="_blank" class="btn btn-soft-success btn-icon btn-sm rounded-circle table-edit-precious-btn"><i class="ti ti-edit fs-16"></i></a><a href="javascript:void(0);" class="btn btn-soft-danger btn-icon btn-sm rounded-circle sweet-delete-btn" data-id="' +
            e +
            '"><i class="ti ti-trash"></i></a></div>'
        );
      },
    },
  ],
  pagination: { limit: 10 },
  sort: !0,
  search: !0,
  data: preciousList,
}).render(document.getElementById("table-gridjs"));
