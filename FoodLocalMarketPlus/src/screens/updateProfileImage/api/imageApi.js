import { http } from "../../../api/api";

export { updateUserImage };

async function updateUserImage(data) {
  return await http({
    method: "POST",
    path: `upload/`,
    data: data,
    dataWithFiles: true,
  });
}
