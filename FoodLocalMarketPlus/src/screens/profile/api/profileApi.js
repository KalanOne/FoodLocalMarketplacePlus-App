import { http } from "../../../api/api";

export { getUserInfo, updateUserInfo };

async function getUserInfo(email) {
  return await http({
    method: "GET",
    path: `usuario/${email}`,
  });
}

async function updateUserInfo(data) {
  return await http({
    method: "PUT",
    path: `usuario/update`,
    data: data,
  });
}
