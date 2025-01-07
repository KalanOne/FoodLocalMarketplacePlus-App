import { useEffect } from "react";
import useAuthStore from "../../contexts/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export { LogOut };

function LogOut() {
  const { reset } = useAuthStore();

  useEffect(() => {
    AsyncStorage.removeItem("USER_EMAIL");
    AsyncStorage.removeItem("USER_TOKEN");
    reset();
    Toast.show({
      type: "success",
      text1: "Message:",
      text2: "Logout successfull",
      autoHide: false,
    });
  }, []);

  return <></>;
}
