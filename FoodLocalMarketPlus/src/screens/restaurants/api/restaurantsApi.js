import { http } from "../../../api/api";

export { getRestaurantsProvs, getCategoriesRestaurants };

async function getRestaurantsProvs() {
  return await http({
    method: "GET",
    path: "proveedor",
  });
}

async function getCategoriesRestaurants() {
  return await http({
    method: "GET",
    path: "categoriaProveedor",
  });
}
