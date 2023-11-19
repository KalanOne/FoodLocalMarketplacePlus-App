import { PaperProvider } from "react-native-paper";
import { LoginRegister } from "./src/screens/loginRegister/LoginRegister";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import { Welcome } from "./src/screens/welcome/Welcome";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "./src/contexts/AuthStore";
import { MainDrawerNavigation } from "./src/routes/MainDrawerNavigation";

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

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        {started && display === "Login" && (
          <LoginRegister setDisplay={setDisplay} setStarted={setStarted} />
        )}
        {started && display === "App" && <MainDrawerNavigation />}
        {!started && <Welcome onStarted={() => setStarted(true)} />}
        {/* <LoginRegister /> */}
      </PaperProvider>
      <Toast />
    </QueryClientProvider>
  );
}
