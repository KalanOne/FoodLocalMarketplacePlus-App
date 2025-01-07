import { createStackNavigator } from "@react-navigation/stack";
import { Restaurants } from "../screens/restaurants/Restaurants";
import { Saucers } from "../screens/saucers/Saucers";
import { Cart } from "../screens/cart/Cart";
import { RestaurantsInfo } from "../screens/restaurantsInfo/RestaurantsInfo";
import { SaucersInfo } from "../screens/saucersInfo/SaucersInfo";

export { StoreStackNavigation };

const Stack = createStackNavigator();

function StoreStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={"Restaurants"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Restaurants" component={Restaurants} />
      <Stack.Screen name="RestaurantsInfo" component={RestaurantsInfo} />
      <Stack.Screen name="Saucers" component={Saucers} />
      <Stack.Screen name="SaucersInfo" component={SaucersInfo} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
