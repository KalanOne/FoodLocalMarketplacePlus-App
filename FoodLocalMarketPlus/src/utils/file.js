export { downloadFile, getMimeTypeFromExtension };

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

function getMimeTypeFromExtension(extension) {
  const extensionToMimeTypeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    // Puedes agregar más extensiones y sus tipos MIME según sea necesario
  };

  // Convierte la extensión a minúsculas para manejar diferentes casos
  const lowercasedExtension = extension.toLowerCase();

  // Devuelve el tipo MIME correspondiente o 'application/octet-stream' si no se encuentra
  return (
    extensionToMimeTypeMap[lowercasedExtension] || "application/octet-stream"
  );
}
