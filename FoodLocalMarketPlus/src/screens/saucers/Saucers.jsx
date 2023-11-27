import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SaucerItemMemo } from "./SaucerItem";
import { StackSaucerContainer } from "./StackSaucerContainer";
import useCartStore from "../../contexts/CartStore";

export { Saucers };

function Saucers() {
  const route = useRoute();
  const { restaurant } = route.params;
  const { productos, updateCartItemQuantity, deleteFromCart, addToCart } =
    useCartStore();
  const navigation = useNavigation();
  // console.log("productos", productos);

  const handleUpdateCartItemQuantity = useCallback(
    (id, cantidad) => {
      updateCartItemQuantity(id, cantidad);
    },
    [updateCartItemQuantity]
  );

  const handleDeleteFromCart = useCallback(
    (productoId) => {
      deleteFromCart(productoId);
    },
    [deleteFromCart]
  );

  const handleAddToCart = useCallback(
    (producto) => {
      addToCart(producto);
    },
    [addToCart]
  );

  return (
    <StackSaucerContainer restaurant={restaurant}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate("RestaurantsInfo", { restaurant: restaurant });
        }}
      >
        <Image
          source={{
            uri:
              restaurant.profilePic == "providerDefault.png"
                ? "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png"
                : restaurant.profilePic,
          }} // Ruta de tu imagen
          style={styles.image}
        />
      </TouchableOpacity> */}
      <View style={styles.container}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {restaurant.productos.map((saucer) => (
              <SaucerItemMemo
                key={saucer.id}
                saucer={saucer}
                handleUpdateCartItemQuantity={handleUpdateCartItemQuantity}
                cuantity={
                  productos.find((item) => item.id === saucer.id)?.cantidad || 0
                }
                handleDeleteFromCart={handleDeleteFromCart}
                handleAddToCart={handleAddToCart}
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
