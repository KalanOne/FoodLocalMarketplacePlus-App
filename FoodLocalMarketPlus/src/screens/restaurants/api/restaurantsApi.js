import { http } from "../../../api/api";

export { getRestaurantsProvs };

async function getRestaurantsProvs() {
  return await http({
    method: "GET",
    path: "proveedor",
  });
}
