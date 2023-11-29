import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { StackContainer } from "../../components/StackContainer";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getOrderInfo } from "./api/orderApi";
import {
  ActivityIndicator,
  MD2Colors,
  Surface,
  Text,
} from "react-native-paper";
import { format } from "date-fns";

export { OrdersInfo };

function OrdersInfo() {
  const route = useRoute();
  const { orderID } = route.params;

  const orderQuery = useQuery({
    queryKey: ["ordersInfo", orderID],
    queryFn: async () => {
      return await getOrderInfo(orderID);
    },
    keepPreviousData: false,
    retry: 5,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  const order = orderQuery.data;
  //   console.log("order", JSON.stringify(order, null, 2));

  const statusOrder = (status) => {
    switch (status) {
      case "pedidoRealizado":
        return "Pedido realizado";
      case "enviado":
        return "Enviado";
      case "enReparto":
        return "En reparto";
      case "entregado":
        return "Entregado";
      default:
        return "Pendiente";
    }
  };

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
      <ScrollView style={styles.container}>
        <TouchableOpacity>
          <Surface style={styles.surface2}>
            <Image
              source={
                order.pedidoProveedor[0].proveedor.profilePic ==
                "providerDefault.png"
                  ? {
                      uri: "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png",
                    }
                  : { uri: order.pedidoProveedor[0].proveedor.profilePic }
              }
              style={styles.image}
            />
            <Text variant="displaySmall" style={styles.title}>
              Restaurants
            </Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity>
          <Surface style={styles.surface2}>
            <Image
              source={
                order.productos[0].producto.imagen == "algo/Ruta"
                  ? {
                      uri: "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png",
                    }
                  : { uri: order.productos[0].producto.imagen }
              }
              style={styles.image}
            />
            <Text variant="displaySmall" style={styles.title}>
              Products
            </Text>
          </Surface>
        </TouchableOpacity>
        <Surface style={styles.surface}>
          <Text variant="labelLarge" style={styles.texts}>
            Order ID: {orderID}
          </Text>
          <Text variant="labelLarge" style={styles.texts}>
            Order Status: {statusOrder(order.estado)}
          </Text>
          <Text variant="labelLarge" style={styles.texts}>
            Order Date: {format(new Date(order.createdAt), "MMM dd HH:mm")}
          </Text>
          <Text variant="labelLarge" style={styles.texts}>
            Order Total:{" $"}
            {order.productos.reduce((total, producto) => {
              return total + producto.precio * producto.cantidad;
            }, 0)}{" "}
            {order.pagado ? "Pagado" : "Pendiente de pago"}
          </Text>
        </Surface>
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
});
