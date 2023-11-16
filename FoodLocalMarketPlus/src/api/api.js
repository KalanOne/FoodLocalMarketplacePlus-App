import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export { http };

const http = async ({ path, method = "POST", data = {}, params = {} }) => {
  for (const k in params) {
    if (params[k] === null || params[k] === undefined) {
      delete params[k];
    }
  }

  const request = {
    method,
    params,
    data,
    // url: `http://10.27.45.22:3000/${path}`,
    url: `http://192.168.1.78:3000/${path}`,
    // url: `${process.env.REACT_APP_API_URL}/api/${path}`,
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("USER_TOKEN")}`,
    },
  };

  const response = await axios(request);

  return response.data.data;
};
