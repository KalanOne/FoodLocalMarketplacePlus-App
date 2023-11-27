import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
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
import { getContrast } from "../../utils/colors";

export { StackSaucerContainer };

function StackSaucerContainer({ restaurant, children }) {
  const navigation = useNavigation();
  const { montoTotal, productos } = useCartStore();
  const totalProducts = productos.filter((item) => item.cantidad > 0).length;

  return (
    <View style={styles.container}>
      <Surface style={styles.StackNavigationContainer}>
        <ImageBackground
          source={{
            uri:
              restaurant.profilePic == "providerDefault.png"
                ? "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png"
                : restaurant.profilePic,
          }}
          style={styles.imageBackground}
        >
          <View style={styles.mask} />
          <TouchableOpacity
            style={styles.StackNavigation}
            onPress={() => {
              navigation.navigate("RestaurantsInfo", {
                restaurant: restaurant,
              });
            }}
          >
            <View style={styles.StackNavigation}>
              <IconButton
                icon="keyboard-backspace"
                mode="contained"
                onPress={navigation.goBack}
                containerColor={MD3Colors.primary80}
                iconColor={MD3Colors.primary50}
              />
              <View>
                <Text variant="displaySmall" style={styles.restaurantName}>
                  {restaurant.nombre}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon source="star" color={"white"} size={25} />
                  <Text
                    variant="titleLarge"
                    // style={{ color: getContrast("rgba(255, 80, 80, 0.3)") }}
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {restaurant.resenas.length != 0
                      ? (
                          restaurant.resenas.reduce(
                            (acc, review) => acc + parseInt(review.stars),
                            0
                          ) / restaurant.resenas.length
                        ).toFixed(2)
                      : 0}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
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
  StackNavigationContainer: {
    // paddingTop: StatusBar.currentHeight,
    // paddingHorizontal: 10,
  },
  StackNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  CarInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: MD3Colors.primary80,
  },
  imageBackground: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(120, 69, 172, 0.3)", // Ajusta el color y la opacidad según tus preferencias
    backgroundColor: "rgba(188, 135, 241, 0.3)",
  },
  restaurantName: {
    color: getContrast("rgba(255, 80, 80, 0.3)"),
    fontWeight: "bold",
  },
});
