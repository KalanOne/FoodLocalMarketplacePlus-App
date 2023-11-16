import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Start } from "../screens/start/Start";
import { Restaurants } from "../screens/restaurants/Restaurants";
import { StoreStackNavigation } from "./StoreStackNavigation";

export { MainDrawerNavigation };

const Drawer = createDrawerNavigator();

function MainDrawerNavigation({ setDisplay, setStarted }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={"StoreStackNavigation"}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen
          name="StoreStackNavigation"
          component={StoreStackNavigation}
          options={{ title: "Store" }}
        />
        {/* <Drawer.Screen name="Article" component={Article} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
