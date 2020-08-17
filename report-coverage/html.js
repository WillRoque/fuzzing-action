module.exports.renderTables = function (covDataArr) {
  const htmlArr = [];

  for (let covData of covDataArr) {
    const tableData = [];

    for (let report of covData.fileCoverageReports) {
      if (
        !report.summary ||
        !report.summary.lines ||
        report.file.startsWith("..")
      ) {
        continue;
      }
      let summary = report.summary;
      if (!summary.lines.totalCount) {
        continue;
      }
      if (!summary.lines.coveredCount) {
        summary.lines.coveredCount = 0;
      }
      tableData.push([
        report.file,
        Math.round(
          (summary.lines.coveredCount * 100) / summary.lines.totalCount
        ),
      ]);
    }

    sortArray(tableData, 1);

    const html = `<table>
  <thead>
    <tr>
      <td>File</td>
      <td>Percentage</td>
    </td>
  </thead>
  <tbody>
    ${tableData
      .map(
        (row) =>
          `<tr>
        <td><span class="file">${row[0]}</span></td>
        <td class="percentage">${row[1]}</td>
      </tr>`
      )
      .join("")}
  </tbody>
</table>`;

    htmlArr.push(html);
  }

  return htmlArr.join("<br><br>");
};

// Sorts the file coverage data
function sortArray(tableData, sortColumn) {
  tableData.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return 1;
    }
    return -1;
  });
}
