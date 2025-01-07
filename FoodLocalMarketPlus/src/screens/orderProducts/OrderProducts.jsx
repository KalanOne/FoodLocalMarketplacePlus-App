import React from "react";
import { StackContainer } from "../../components/StackContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getOrderInfo } from "../ordersInfo/api/orderApi";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  MD2Colors,
  MD3Colors,
  Surface,
  Text,
} from "react-native-paper";
import { moneyFormatter } from "../../utils/formatters";
import { localhost } from "../../utils/constans";

export { OrderProducts };

function OrderProducts() {
  const route = useRoute();
  const { orderID } = route.params;
  const navigation = useNavigation();

  const orderQuery = useQuery({
    queryKey: ["ordersInfoProducts", orderID],
    queryFn: async () => {
      return await getOrderInfo(orderID);
    },
    keepPreviousData: false,
    retry: 5,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  const order = orderQuery.data;
  // console.log("order", JSON.stringify(order, null, 2));

  if (!order) {
    return (
      <StackContainer>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            animating={true}
            color={MD2Colors.indigoA700}
            size={"large"}
          />
        </View>
      </StackContainer>
    );
  }
  return (
    <StackContainer>
      <ScrollView>
        {order.productos.map((item) => (
          <Surface style={styles.surface2} key={item.id}>
            <Image
              source={
                item.producto.imagen == "algo/Ruta"
                  ? {
                      uri: "https://cdn7.kiwilimon.com/recetaimagen/1277/640x960/17199.jpg.webp",
                    }
                  : { uri: `http://${localhost}:3000${item.producto.imagen}` }
              }
              style={styles.image}
            />
            <View style={styles.textsContainer}>
              <Text variant="titleLarge" style={styles.title}>
                {item.producto.nombre}{" "}
                <Icon source="star" color={MD3Colors.primary10} size={25} />
                {item.producto.resenas.length != 0
                  ? (
                      item.producto.resenas.reduce(
                        (acc, review) => acc + parseInt(review.calificacion),
                        0
                      ) / item.producto.resenas.length
                    ).toFixed(2)
                  : 0}
              </Text>
              <Text variant="bodyLarge" style={styles.texts}>
                {item.producto.descripcion}
              </Text>
              <Text variant="bodyLarge" style={styles.texts}>
                {item.cantidad} unit
              </Text>
              <Text variant="bodyLarge" style={styles.texts}>
                Cost: {moneyFormatter(item.precio)}
              </Text>
              <Text variant="bodyLarge" style={styles.texts}>
                Total: {moneyFormatter(item.precio * item.cantidad)}
              </Text>
              {item.resena ? (
                <Button mode="contained" style={styles.button} disabled>
                  Reviewed
                </Button>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("Review", {
                      idrel: item.id,
                      id: item.producto.id,
                      productOrRestaurant: "Product",
                      nombre: item.producto.nombre,
                    });
                  }}
                  style={styles.button}
                >
                  Review
                </Button>
              )}
            </View>
          </Surface>
        ))}
      </ScrollView>
    </StackContainer>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    elevation: 4,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  texts: {
    margin: 5,
  },
  container: {
    // flex: 1,
    // padding: 10,
  },
  surface2: {
    elevation: 4,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
  },
  title: {
    textAlign: "center",
    padding: 10,
  },
  textsContainer: {
    padding: 10,
  },
  button: {
    margin: 10,
  },
});
