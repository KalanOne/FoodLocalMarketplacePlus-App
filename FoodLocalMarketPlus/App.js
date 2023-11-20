import {
  Button,
  Dialog,
  PaperProvider,
  Portal,
  Text,
} from "react-native-paper";
import { LoginRegister } from "./src/screens/loginRegister/LoginRegister";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import { Welcome } from "./src/screens/welcome/Welcome";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "./src/contexts/AuthStore";
import { MainDrawerNavigation } from "./src/routes/MainDrawerNavigation";
import * as Location from "expo-location";
import { Alert } from "react-native";

const queryClient = new QueryClient();

export default function App() {
  // const [loading, setLoading] = useState(false);
  // const [display, setDisplay] = useState("Login");
  // const [started, setStarted] = useState(false);
  const {
    userToken,
    email,
    display,
    started,
    setUserToken,
    setEmail,
    setDisplay,
    setStarted,
    reset,
  } = useAuthStore();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const getUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem("USER_TOKEN");
        const email = await AsyncStorage.getItem("USER_EMAIL");
        if (token) {
          setUserToken(token);
          setEmail(email);
          setDisplay("App");
        } else {
          setDisplay("Login");
          setUserToken(null);
          setEmail(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserToken();
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showDialog();
      }
    };
    getPermissions();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        {started && display === "Login" && (
          <LoginRegister setDisplay={setDisplay} setStarted={setStarted} />
        )}
        {started && display === "App" && <MainDrawerNavigation />}
        {!started && <Welcome onStarted={() => setStarted(true)} />}
        {/* <LoginRegister /> */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Location permissions are necessary, to allow it go to the
                application permissions section in the device settings
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaperProvider>
      <Toast />
    </QueryClientProvider>
  );
}