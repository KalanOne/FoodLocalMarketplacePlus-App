import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import {
  Button,
  Icon,
  IconButton,
  MD3Colors,
  Surface,
  Text,
} from "react-native-paper";
import useCartStore from "../../contexts/CartStore";
import { moneyFormatter } from "../../utils/formatters";

export { DrawerRestaurantContainer };

function DrawerRestaurantContainer({ children }) {
  const navigation = useNavigation();
  const { montoTotal, productos, resetCart } = useCartStore();
  const totalProducts = productos.filter((item) => item.cantidad > 0).length;

  return (
    <View style={styles.container}>
      <Surface style={styles.drawerNavigationContainer}>
        <View style={styles.drawerNavigation}>
          <IconButton
            icon="menu"
            mode="text"
            onPress={() => navigation.toggleDrawer()}
            iconColor={MD3Colors.primary50}
            // backgroundColor={MD3Colors.primary80}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f7fa",
    flex: 1,
  },
  drawerNavigationContainer: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
  drawerNavigation: {
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
