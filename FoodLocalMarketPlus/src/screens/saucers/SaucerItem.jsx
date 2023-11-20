import { Image, StyleSheet, View } from "react-native";
import { IconButton, MD3Colors, Surface, Text } from "react-native-paper";
import { memo, useState } from "react";
import { moneyFormatter } from "../../utils/formatters";

export { SaucerItem, SaucerItemMemo };

function SaucerItem({ saucer, handleUpdateCartItemQuantity }) {
  //   const { productos, updateCartItemQuantity } = useCartStore();
  //   const cartItem = productos.find((item) => item.id === saucer.id);
  console.log("saurcerID", saucer.id);
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    // Incrementar el valor
    // cartItem.cantidad = cartItem.cantidad + 1;
    // updateCartItemQuantity(saucer.id, cartItem.cantidad);
    handleUpdateCartItemQuantity(saucer.id, value + 1);
    setValue(value + 1);
  };

  const handleDecrement = () => {
    // Decrementar el valor, evitando que sea menor que el mínimo
    // cartItem.cantidad = Math.max(cartItem.cantidad - 1, 0);
    // updateCartItemQuantity(saucer.id, cartItem.cantidad);
    if (value === 0) return;
    handleUpdateCartItemQuantity(saucer.id, Math.max(value - 1, 0));
    setValue(Math.max(value - 1, 0));
  };

  return (
    <Surface style={styles.container}>
      <Image
        source={{
          uri: "https://cdn7.kiwilimon.com/recetaimagen/1277/640x960/17199.jpg.webp",
          //   uri: "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png",
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoTextsContainer}>
          <Text variant="headlineMedium">{saucer.title}</Text>
          <Text variant="titleSmall">{saucer.description}</Text>
          <Text variant="titleLarge">{moneyFormatter(saucer.price)}</Text>
        </View>
        <View style={styles.quantityConatinarer}>
          <IconButton
            icon="minus"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={handleDecrement}
          />
          <Text variant="titleLarge" style={styles.quantityText}>
            {value ?? 0}
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

const SaucerItemMemo = memo(({ saucer, handleUpdateCartItemQuantity }) => {
  console.log("saurcerID", saucer.id);
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    // Incrementar el valor
    // cartItem.cantidad = cartItem.cantidad + 1;
    // updateCartItemQuantity(saucer.id, cartItem.cantidad);
    handleUpdateCartItemQuantity(saucer.id, value + 1);
    setValue(value + 1);
  };

  const handleDecrement = () => {
    // Decrementar el valor, evitando que sea menor que el mínimo
    // cartItem.cantidad = Math.max(cartItem.cantidad - 1, 0);
    // updateCartItemQuantity(saucer.id, cartItem.cantidad);
    if (value === 0) return;
    handleUpdateCartItemQuantity(saucer.id, Math.max(value - 1, 0));
    setValue(Math.max(value - 1, 0));
  };

  return (
    <Surface style={styles.container}>
      <Image
        source={{
          uri: "https://cdn7.kiwilimon.com/recetaimagen/1277/640x960/17199.jpg.webp",
          //   uri: "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png",
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoTextsContainer}>
          <Text variant="headlineMedium">{saucer.title}</Text>
          <Text variant="titleSmall">{saucer.description}</Text>
          <Text variant="titleLarge">{moneyFormatter(saucer.price)}</Text>
        </View>
        <View style={styles.quantityConatinarer}>
          <IconButton
            icon="minus"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={handleDecrement}
          />
          <Text variant="titleLarge" style={styles.quantityText}>
            {value ?? 0}
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
});

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
    width: "40%",
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
