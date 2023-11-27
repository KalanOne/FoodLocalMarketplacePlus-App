import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/profile/Profile";

export { ProfileStackNavigation };

const Stack = createStackNavigator();

function ProfileStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={"Profile"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
