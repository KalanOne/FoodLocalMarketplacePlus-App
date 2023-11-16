import { PaperProvider } from "react-native-paper";
import { LoginRegister } from "./src/screens/loginRegister/LoginRegister";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import { Welcome } from "./src/screens/welcome/Welcome";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Start } from "./src/screens/start/Start";
import useAuthStore from "./src/contexts/AuthStore";
import { MainDrawerNavigation } from "./src/routes/MainDrawerNavigation";

const queryClient = new QueryClient();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("Login");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const getUserToken = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("USER_TOKEN");
        if (token) {
          useAuthStore.setState({ userToken: token });
          setDisplay("Start");
        } else {
          setDisplay("Login");
          useAuthStore.setState({ userToken: null });
        }
        setLoading(false);
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
        {started && display === "Start" && (
          <MainDrawerNavigation
            setDisplay={setDisplay}
            setStarted={setStarted}
          />
        )}
        {!started && (
          <Welcome loading={loading} onStarted={() => setStarted(true)} />
        )}
        {/* <LoginRegister /> */}
      </PaperProvider>
      <Toast />
    </QueryClientProvider>
  );
}
