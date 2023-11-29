import { createStackNavigator } from "@react-navigation/stack";
import { Orders } from "../screens/orders/Orders";
import { OrdersInfo } from "../screens/ordersInfo/OrdersInfo";

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
    </Stack.Navigator>
  );
}
