import { http } from "../../../api/api";

export { resenaProduct, resenaRestaurant };

async function resenaProduct(data) {
  // console.log(data);
  return await http({
    method: "POST",
    path: `producto/resena`,
    data: data,
  });
}

async function resenaRestaurant(data) {
  // console.log(data);
  return await http({
    method: "POST",
    path: `proveedor/resena`,
    data: data,
  });
}
