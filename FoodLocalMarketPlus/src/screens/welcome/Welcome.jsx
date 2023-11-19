import { Image } from "react-native";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import Logo from "../../../assets/Logo.png";
import { StyleSheet } from "react-native";
import useAuthStore from "../../contexts/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export { Welcome };

function Welcome({ onStarted }) {
  const handleLogout = () => {
    useAuthStore.setState({ userToken: null });
    AsyncStorage.removeItem("USER_TOKEN");
  };
  return (
    <Surface style={styles.container}>
      <Text variant="displayLarge" style={styles.title}>
        Food for Everyone
      </Text>
      <Image source={Logo} style={styles.image} />
      <Button
        mode="elevated"
        // loading={loading}
        // labelStyle={{ fontSize: 20 }}
        onPress={onStarted}
        style={styles.button}
      >
        Get started
      </Button>
      <Button icon="camera" mode="contained" onPress={handleLogout}>
        Borrar token
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 20,
    // width: 200,
    // height: 50,
  },
});
