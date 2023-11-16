import { Image } from "react-native";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import Logo from "../../../assets/Logo.png";
import { Login } from "./Login";
import { Register } from "./Register";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export { LoginRegister };

function LoginRegister({ setDisplay, setStarted }) {
  const [loginRegister, setLoginRegister] = useState("login");
  // const [userToken, setUserToken] = useState("");

  // useEffect(() => {
  //   const getUserToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("USER_TOKEN");
  //       console.log("token", token);
  //       setUserToken(token);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getUserToken();
  //   console.log("USER_TOKEN", userToken);
  // }, [loginRegister]);

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      // style={styles.container}
      style={{ height: "100%", width: "100%", backgroundColor: "#efefef" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Surface style={styles.surface} elevation={4}>
          <View style={styles.imageContainer}>
            <Image source={Logo} style={styles.image} />
          </View>
          <View style={styles.loginRegisterButtonsContainer}>
            <Button mode="contained" onPress={() => setLoginRegister("login")}>
              Login
            </Button>
            <Button
              mode="contained"
              onPress={() => setLoginRegister("register")}
            >
              Register
            </Button>
          </View>
        </Surface>
        <View style={styles.formsContainer}>
          {loginRegister === "login" ? (
            <Login setDisplay={setDisplay} setStarted={setStarted} />
          ) : (
            <Register />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  surface: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    height: 300,
    padding: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  loginRegisterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
