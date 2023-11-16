import { createStackNavigator } from "@react-navigation/stack";
import { Restaurants } from "../screens/restaurants/Restaurants";

export { StoreStackNavigation };

const Stack = createStackNavigator();

function StoreStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={"Restaurants"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Restaurants" component={Restaurants} />
    </Stack.Navigator>
  );
}
