import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { StoreStackNavigation } from "./StoreStackNavigation";
import { LogOut } from "../screens/logOut/LogOut";
import useAuthStore from "../contexts/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export { MainDrawerNavigation };

const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
  const { reset } = useAuthStore();
  const handleLogOut = () => {
    AsyncStorage.removeItem("USER_EMAIL");
    AsyncStorage.removeItem("USER_TOKEN");
    reset();
    Toast.show({
      type: "success",
      text1: "Message:",
      text2: "Logout successfull",
      autoHide: false,
    });
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={"StoreStackNavigation"}
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => (
          <CustomDrawerContent {...props} handleLogOut={handleLogOut} />
        )}
      >
        <Drawer.Screen
          name="StoreStackNavigation"
          component={StoreStackNavigation}
          options={{ title: "Store" }}
        />
        {/* <Drawer.Screen name="LogOut" component={LogOut} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent({ handleLogOut, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="LogOut" onPress={handleLogOut} />
    </DrawerContentScrollView>
  );
}
