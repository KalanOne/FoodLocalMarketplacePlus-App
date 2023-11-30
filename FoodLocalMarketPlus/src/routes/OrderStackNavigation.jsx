import { createStackNavigator } from "@react-navigation/stack";
import { Orders } from "../screens/orders/Orders";
import { OrdersInfo } from "../screens/ordersInfo/OrdersInfo";
import { OrderRestaurants } from "../screens/orderRestaurants/OrderRestaurants";
import { OrderProducts } from "../screens/orderProducts/OrderProducts";
import { Review } from "../screens/review/Review";

export { OrderStackNavigation };

const Stack = createStackNavigator();

function OrderStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={"Orders"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrdersInfo" component={OrdersInfo} />
      <Stack.Screen name="OrderRestaurants" component={OrderRestaurants} />
      <Stack.Screen name="OrderProducts" component={OrderProducts} />
      <Stack.Screen name="Review" component={Review} />
    </Stack.Navigator>
  );
}
