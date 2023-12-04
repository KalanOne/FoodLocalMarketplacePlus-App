import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { DrawerContainer } from "../../components/DrawerContainer";
import { Button, Surface, Text } from "react-native-paper";
import { useQuery, useQueryClient } from "react-query";
import { getUserInfo } from "../profile/api/profileApi";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useAuthStore from "../../contexts/AuthStore";
import { format, compareAsc } from "date-fns";
import { localhost } from "../../utils/constans";

export { Orders };

function Orders() {
  const isFocused = useIsFocused();
  const { email } = useAuthStore();
  const navigation = useNavigation();

  const profileQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getUserInfo(email);
    },
    keepPreviousData: true,
    retry: 5,
    enabled: isFocused,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  const profileData = profileQuery.data;

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

  if (!profileData) {
    return (
      <DrawerContainer>
        <Text variant="headlineLarge" style={styles.title}>
          Orders
        </Text>
        <Text style={styles.errorText}>Orders not found</Text>
      </DrawerContainer>
    );
  }
  return (
    <DrawerContainer>
      <ScrollView style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Orders
        </Text>
        {profileData.pedidos.map((order) => {
          // console.log(
          //   "order.pedidoProveedor[0].proveedor.profilePic",
          //   order.pedidoProveedor[0].proveedor.profilePic
          // );
          return (
            <Surface key={order.id} style={styles.surface}>
              <Image
                source={
                  order.pedidoProveedor[0].proveedor.profilePic ==
                    "providerDefault.png" ||
                  order.pedidoProveedor[0].proveedor.profilePic == "algo/Ruta"
                    ? {
                        uri: "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png",
                      }
                    : {
                        uri: `http://${localhost}:3000${order.pedidoProveedor[0].proveedor.profilePic}`,
                      }
                }
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  {statusOrder(order.estado)} -{" "}
                  {format(new Date(order.createdAt), "MMM dd HH:mm")}
                </Text>
                <Text style={styles.infoText}>
                  {order.pagado ? "Pagado" : "Pendiente de pago"}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.infoText}>
                    Total: $
                    {order.productos.reduce((total, producto) => {
                      return total + producto.precio * producto.cantidad;
                    }, 0)}
                  </Text>
                  <Text style={styles.infoText}>
                    {order.pagado ? "Pagado" : "Pendiente de pago"}
                  </Text>
                </View>
                <Text style={styles.infoText}>
                  {order.pedidoProveedor.map((pedidoProveedor, index) => {
                    return (
                      <Text key={pedidoProveedor.id}>
                        {index == 0 ? "" : ", "}
                        {pedidoProveedor.proveedor.nombre}
                      </Text>
                    );
                  })}
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("OrdersInfo", {
                      orderID: order.id,
                    });
                  }}
                >
                  See details
                </Button>
              </View>
            </Surface>
          );
        })}
      </ScrollView>
    </DrawerContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
  surface: {
    // padding: 20,
    elevation: 4,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
  infoContainer: {
    padding: 10,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: "rgb(186, 26, 26)",
    textAlign: "center",
    marginTop: 50,
  },
});
