import { http } from "../../../api/api";

export { getUserInfo };

async function getUserInfo(email) {
  return await http({
    method: "GET",
    path: `usuario/${email}`,
  });
}
