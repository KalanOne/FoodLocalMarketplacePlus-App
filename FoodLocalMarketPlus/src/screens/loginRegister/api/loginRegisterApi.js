import { http } from "../../../api/api";

export { registerUser, loginUser };

async function registerUser(data = {}) {
  return await http({
    method: "POST",
    path: "usuario",
    data: data,
  });
}

async function loginUser(data = {}) {
  return await http({
    method: "POST",
    path: "usuario/login",
    data: data,
  });
}
