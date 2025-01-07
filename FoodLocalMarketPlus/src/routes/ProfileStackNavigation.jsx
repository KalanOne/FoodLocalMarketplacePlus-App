import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/profile/Profile";
import { ChangePassword } from "../screens/changePassword/ChangePassword";
import { UpdateProfileImage } from "../screens/updateProfileImage/UpdateProfileImage";

export { ProfileStackNavigation };

const Stack = createStackNavigator();

function ProfileStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={"Profile"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="UpdateProfileImage" component={UpdateProfileImage} />
    </Stack.Navigator>
  );
}
