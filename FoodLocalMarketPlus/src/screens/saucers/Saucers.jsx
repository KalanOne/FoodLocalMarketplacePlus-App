import { useNavigation, useRoute } from "@react-navigation/native";
import { MD3Colors } from "react-native-paper";
import { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SaucerItem, SaucerItemMemo } from "./SaucerItem";
import { StackSaucerContainer } from "./StackSaucerContainer";
import useCartStore from "../../contexts/CartStore";
import { useEffect } from "react";

export { Saucers };

const SAUCERS = [
  {
    id: "1",
    title: "Saucer 1",
    description: "Saucer 1 description",
    price: 100,
  },
  {
    id: "2",
    title: "Saucer 2",
    description: "Saucer 2 description",
    price: 200,
  },
  {
    id: "3",
    title: "Saucer 3",
    description: "Saucer 3 description",
    price: 300,
  },
  {
    id: "4",
    title: "Saucer 4",
    description: "Saucer 4 description",
    price: 400,
  },
  {
    id: "5",
    title: "Saucer 5",
    description: "Saucer 5 description",
    price: 500,
  },
  {
    id: "6",
    title: "Saucer 6",
    description: "Saucer 6 description",
    price: 600,
  },
  {
    id: "7",
    title: "Saucer 7",
    description: "Saucer 7 description",
    price: 700,
  },
  {
    id: "8",
    title: "Saucer 8",
    description: "Saucer 8 description",
    price: 800,
  },
  {
    id: "9",
    title: "Saucer 9",
    description: "Saucer 9 description",
    price: 900,
  },
  {
    id: "10",
    title: "Saucer 10",
    description: "Saucer 10 description",
    price: 1000,
  },
];

function Saucers() {
  const route = useRoute();
  const { restaurant } = route.params;
  const { updateCartItemQuantity, addRestaurantId, initCart } = useCartStore();
  const navigation = useNavigation();

  const handleUpdateCartItemQuantity = useCallback(
    (id, cantidad) => {
      updateCartItemQuantity(id, cantidad);
    },
    [updateCartItemQuantity]
  );

  useEffect(() => {
    addRestaurantId(restaurant.id);
    const newSaucers = SAUCERS.map((item) => ({
      id: item.id,
      precio: item.price,
      cantidad: 0,
    }));
    initCart(newSaucers, 0);
  }, []);

  return (
    <StackSaucerContainer>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RestaurantsInfo", { restaurant: restaurant });
        }}
      >
        <Image
          source={{
            uri:
              restaurant.profilePic == "algo/Ruta"
                ? "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png"
                : restaurant.profilePic,
          }} // Ruta de tu imagen
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {SAUCERS.map((saucer) => (
              <SaucerItemMemo
                key={saucer.id}
                saucer={saucer}
                handleUpdateCartItemQuantity={handleUpdateCartItemQuantity}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </StackSaucerContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 100,
  },
});
