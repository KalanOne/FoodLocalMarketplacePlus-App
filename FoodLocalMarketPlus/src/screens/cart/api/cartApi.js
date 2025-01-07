import { http } from "../../../api/api";

export { createOrder };

async function createOrder(data) {
  return await http({
    method: "POST",
    path: "pedido",
    data: data,
  });
}
