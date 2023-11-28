import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export { http };

const http = async ({
  path,
  method = "POST",
  data = {},
  params = {},
  dataWithFiles = false,
}) => {
  for (const k in params) {
    if (params[k] === null || params[k] === undefined) {
      delete params[k];
    }
  }

  const request = {
    method,
    params,
    data,
    url: !dataWithFiles
      ? `http://192.168.1.78:3000/${path}`
      : `http://192.168.1.78:4000/${path}`,
    // url: `${process.env.REACT_APP_API_URL}/api/${path}`,
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("USER_TOKEN")}`,
      "Content-Type": dataWithFiles
        ? "multipart/form-data"
        : "application/json",
    },
  };

  const response = await axios(request);

  console.log("response", response);

  return response.data.data;
};
