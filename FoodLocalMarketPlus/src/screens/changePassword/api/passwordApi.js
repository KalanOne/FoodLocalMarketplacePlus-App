import { http } from "../../../api/api";

export { updateUserPassword };

async function updateUserPassword(data) {
  return await http({
    method: "PUT",
    path: `usuario/contrasena`,
    data: data,
  });
}
