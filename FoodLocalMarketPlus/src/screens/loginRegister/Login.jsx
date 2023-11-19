import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { CustomTextInput } from "../../components/CustomTextInput";
import { useMutation } from "react-query";
import { loginUser } from "./api/loginRegisterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import useAuthStore from "../../contexts/AuthStore";

export { Login };

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    userToken,
    email,
    display,
    started,
    setUserToken,
    setEmail,
    setDisplay,
    setStarted,
    reset: resetAuthStore,
  } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      setEmail(data.email);
      await AsyncStorage.setItem("USER_EMAIL", data.email);
      return await loginUser(data);
    },
    onSuccess: async (token) => {
      // try {
      //   await AsyncStorage.setItem("USER_TOKEN", token);
      //   useAuthStore.setState({ userToken: token });
      //   reset();
      //   Toast.show({
      //     type: "success",
      //     text1: "Message:",
      //     text2: "Login successfull",
      //   });
      //   setDisplay("Start");
      //   setStarted(true);
      //   // console.log("Datos guardados con éxito");
      // } catch (error) {
      //   console.error("Error al guardar datosssssss:", error);
      //   Toast.show({
      //     type: "error",
      //     text1: "Message:",
      //     text2: "Login failed, please try again",
      //   });
      // }
      await AsyncStorage.setItem("USER_TOKEN", token);
      // useAuthStore.setState({ userToken: token });
      setUserToken(token);
      setStarted(true);
      setDisplay("App");
      reset();
      Toast.show({
        type: "success",
        text1: "Message:",
        text2: "Login successfull",
        autoHide: false,
      });
    },
    onError: async (error) => {
      // const errorData = error.msg;
      // console.log("errorData", errorData);
      console.log("error", error.response.data.msg);
      console.log("error2", error.response);
      setEmail(null);
      await AsyncStorage.removeItem("USER_EMAIL");
      Toast.show({
        type: "error",
        text1: "Message:",
        text2: `Login failed, please try again - ${error.response.data.msg}`,
        autoHide: false,
      });
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <CustomTextInput
          control={control}
          name="email"
          label="Email"
          rules={{
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          errors={errors}
        />
        <CustomTextInput
          control={control}
          name="password"
          label="Password"
          rules={{
            required: "This field is required",
            // validate: (value) => validatePassword(value) || "Invalid password",
          }}
          errors={errors}
          secureTextEntry={true}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
  },
  inputsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginTop: 60,
  },
});
