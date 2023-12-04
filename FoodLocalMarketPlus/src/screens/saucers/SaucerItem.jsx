import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, MD3Colors, Surface, Text } from "react-native-paper";
import { memo } from "react";
import { moneyFormatter } from "../../utils/formatters";
import { useNavigation } from "@react-navigation/native";
import { localhost } from "../../utils/constans";

export { SaucerItemMemo };

const SaucerItemMemo = memo(
  ({
    saucer,
    handleUpdateCartItemQuantity,
    cuantity,
    handleDeleteFromCart,
    handleAddToCart,
  }) => {
    // console.log("saurcerID", saucer.id);
    const navigation = useNavigation();
    // console.log("SaucerItemMemo", saucer);

    const handleIncrement = () => {
      // Incrementar el valor
      // cartItem.cantidad = cartItem.cantidad + 1;
      // updateCartItemQuantity(saucer.id, cartItem.cantidad);
      if (cuantity === 0) {
        handleAddToCart({
          id: saucer.id,
          precio: saucer.precio,
          cantidad: 1,
          restaurante: saucer.idProveedor,
        });
        return;
      }
      handleUpdateCartItemQuantity(saucer.id, cuantity + 1);
    };

    const handleDecrement = () => {
      // Decrementar el valor, evitando que sea menor que el mínimo
      // cartItem.cantidad = Math.max(cartItem.cantidad - 1, 0);
      // updateCartItemQuantity(saucer.id, cartItem.cantidad);
      if (cuantity === 0) return;
      if (cuantity === 1) {
        handleDeleteFromCart(saucer.id);
        return;
      }
      handleUpdateCartItemQuantity(saucer.id, Math.max(cuantity - 1, 0));
    };

    return (
      <Surface style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SaucersInfo", { saucer: saucer });
          }}
          style={{
            width: "40%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri:
                saucer.imagen == "algo/Ruta"
                  ? "https://cdn7.kiwilimon.com/recetaimagen/1277/640x960/17199.jpg.webp"
                  : `http://${localhost}:3000${saucer.imagen}`,
              //   uri: "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.infoTextsContainer}>
            <Text variant="headlineSmall">{saucer.nombre}</Text>
            <Text variant="titleSmall">{saucer.descripcion}</Text>
            <Text variant="titleLarge">{moneyFormatter(saucer.precio)}</Text>
          </View>
          <View style={styles.quantityConatinarer}>
            <IconButton
              icon="minus"
              iconColor={MD3Colors.primary50}
              size={20}
              onPress={handleDecrement}
            />
            <Text variant="titleLarge" style={styles.quantityText}>
              {cuantity}
            </Text>
            <IconButton
              icon="plus"
              iconColor={MD3Colors.primary50}
              size={20}
              onPress={handleIncrement}
            />
          </View>
        </View>
      </Surface>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    // height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
    aspectRatio: 1,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  infoTextsContainer: {
    flex: 1,
    gap: 10,
  },
  quantityConatinarer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: MD3Colors.primary90,
    borderRadius: 100,
    width: "100%",
  },
  quantityText: {
    marginHorizontal: 10,
  },
});
