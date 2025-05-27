window.preciousListData = [];

fetch("https://www.infjew.com/api/preciouslist", {
  method: "GET",
  credentials: "include", // 确保带上 cookie
})
  .then((res) => res.json())
  .then((data) => {
    if (!data.success) {
      console.error("❌ 获取失败：", data.message);
      return;
    }

    preciousListData = data.data.map((item) => [
      item.id,
      item.title,
      item.tag,
      item.price,
      item.discount,
      item.rating,
      item.status,
      item.url,
      item.id, // 用于 Action 按钮（传 ID）
    ]);

    new gridjs.Grid({
      columns: [
        {
          name: "ID",
          width: "200px",
          formatter: (e) =>
            gridjs.html('<span class="fw-semibold">' + e + "</span>"),
        },
        { name: "Title", width: "250px" },
        { name: "Tag", width: "120px" },
        { name: "Price", width: "50px" },
        { name: "Discount", width: "50px" },
        { name: "Rating", width: "50px" },
        {
          name: "Status",
          width: "100px",
          formatter: (e) =>
            gridjs.html(
              e === 1
                ? '<span class="badge bg-success fs-12 p-1">Active</span>'
                : e === 0
                ? '<span class="badge bg-primary fs-12 p-1">Sold</span>'
                : e === 2
                ? '<span class="badge bg-warning fs-12 p-1">Sale</span>'
                : e === 3
                ? '<span class="badge bg-danger fs-12 p-1">Unavailable</span>'
                : '<span class="badge bg-secondary-subtle text-secondary fs-12 p-1">Unknown</span>'
            ),
        },
        {
          name: "Url",
          width: "50px",
          formatter: (e) =>
            gridjs.html(
              e !== ""
                ? '<a href="' +
                    e +
                    '" class="link-reset fs-20 p-1 text-infjew" target="_blank"><i class="ti ti-link"></i></a>'
                : '<a href="javascript:void(0);" class="link-reset fs-20 p-1 text-light"><i class="ti ti-link"></i></a>'
            ),
        },
        {
          name: "Action",
          width: "100px",
          formatter: (e) =>
            gridjs.html(
              '<div class="hstack gap-2">' +
                '<a data-bs-toggle="modal" data-bs-target="#EditPreciousModal" data-id="' +
                e +
                '" class="btn btn-soft-success btn-icon btn-sm rounded-circle table-edit-precious-btn">' +
                '<i class="ti ti-edit fs-16"></i></a>' +
                '<a href="javascript:void(0);" class="btn btn-soft-danger btn-icon btn-sm rounded-circle sweet-delete-btn" data-id="' +
                e +
                '"><i class="ti ti-trash"></i></a></div>'
            ),
        },
      ],
      pagination: { limit: 10 },
      sort: true,
      search: true,
      data: preciousListData,
    }).render(document.getElementById("table-gridjs"));
  });
