import { http } from "../../../api/api";

export { getOrderInfo };

async function getOrderInfo(id) {
  return await http({
    method: "GET",
    path: `pedido/${id}`,
  });
}

// async function updateUserInfo(email, data) {
//   return await http({
//     method: "PUT",
//     path: `usuario/${email}`,
//     data: data,
//   });
// }
