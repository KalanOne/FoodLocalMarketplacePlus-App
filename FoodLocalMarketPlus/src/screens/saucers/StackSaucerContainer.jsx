import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import {
  Button,
  Dialog,
  Icon,
  IconButton,
  MD3Colors,
  Portal,
  Surface,
  Text,
} from "react-native-paper";
import useCartStore from "../../contexts/CartStore";
import { moneyFormatter } from "../../utils/formatters";

export { StackSaucerContainer };

function StackSaucerContainer({ children }) {
  const navigation = useNavigation();
  const { montoTotal, productos, resetCart } = useCartStore();
  const [visible, setVisible] = useState(false);
  const totalProducts = productos.filter((item) => item.cantidad > 0).length;

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleGoBack = () => {
    if (totalProducts > 0) {
      showDialog();
    } else {
      resetCart();
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.StackNavigationContainer}>
        <View style={styles.StackNavigation}>
          <IconButton
            icon="keyboard-backspace"
            mode="text"
            onPress={handleGoBack}
          ></IconButton>
        </View>
      </Surface>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Surface style={styles.CarInfoContainer}>
          <Icon source="cart" color={MD3Colors.primary50} size={25} />
          <Text variant="titleMedium">{totalProducts} productos</Text>
          <Text variant="titleMedium">{moneyFormatter(montoTotal)}</Text>
        </Surface>
      </TouchableOpacity>
      {children}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              You have items in the cart, if you exit your cart will be reset
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                hideDialog();
                resetCart();
                navigation.goBack();
              }}
            >
              Exit
            </Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f7fa",
    flex: 1,
  },
  StackNavigationContainer: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
  StackNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CarInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: MD3Colors.primary80,
  },
});
