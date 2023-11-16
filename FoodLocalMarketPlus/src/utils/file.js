export { downloadFile };

function downloadFile(response) {
  const a = document.createElement("a");
  const href = window.URL.createObjectURL(new Blob([response.data]));
  a.href = href;
  let fileName = response.headers["content-disposition"].split("=")[1];
  fileName = fileName.replaceAll(/[\s"]/g, "");
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}
