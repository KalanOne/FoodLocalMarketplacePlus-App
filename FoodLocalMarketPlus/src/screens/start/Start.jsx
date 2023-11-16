import { View } from "react-native";
import { Text } from "react-native-paper";
import useAuthStore from "../../contexts/AuthStore";

export { Start };

function Start() {
  const { userToken } = useAuthStore.getState();
  return (
    <View>
      <Text variant="displayLarge">
        userToken en otro componente: {userToken}
      </Text>
    </View>
  );
}
