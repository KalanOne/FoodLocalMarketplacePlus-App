import React, { useState } from "react";
import { DrawerContainer } from "../../components/DrawerContainer";
import { useQuery } from "react-query";
import { getUserInfo } from "../profile/api/profileApi";
import useAuthStore from "../../contexts/AuthStore";
import { ScrollView, StyleSheet, View, Share } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  MD2Colors,
  MD3Colors,
  Searchbar,
  Surface,
  Text,
} from "react-native-paper";
import { format } from "date-fns";
import Toast from "react-native-toast-message";

export { MyReviews };

function MyReviews() {
  const { email } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const myReviewsQuery = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => {
      return await getUserInfo(email);
    },
    keepPreviousData: false,
    retry: 5,
  });
  const myReviewsData = myReviewsQuery.data;

  const renderStars = (calificacion) => {
    const stars = Array.from({ length: calificacion }, (_, index) => (
      <Icon key={index} source="star" color={MD3Colors.primary10} size={20} />
    ));
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const shareReview = async (review) => {
    try {
      const message = `Check out my review for ${review.nombre}:\n${review.calificacion} starts!!!\n${review.resena}`;
      await Share.share({
        message: message,
      });

      // Si la operación de compartir es exitosa, devuelve true
      return true;
    } catch (error) {
      // Si ocurre un error o el usuario cancela, devuelve false
      console.error("Error sharing review", error.message);
      return false;
    }
  };

  const handleShareReview = async (review) => {
    const sharedSuccessfully = await shareReview(review);

    if (sharedSuccessfully) {
      Toast.show({
        type: "success",
        text1: "Review shared",
        text2: "Your review was shared successfully",
        autoHide: true, // Cambiado a true para que se oculte automáticamente
      });
    }
  };

  if (!myReviewsData) {
    return (
      <DrawerContainer>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            animating={true}
            color={MD2Colors.indigo50}
            size={"large"}
          />
        </View>
      </DrawerContainer>
    );
  }

  const extractedReviews = [
    ...myReviewsData?.resenasProducto.map((review) => ({
      calificacion: review.calificacion,
      createdAt: review.createdAt,
      resena: review.resena,
      nombre: `${review.producto.nombre} -> ${review.producto.proveedor.nombre}`,
      tipo: "Product",
    })),
    ...myReviewsData?.resenasProveedor.map((review) => ({
      calificacion: review.calificacion,
      createdAt: review.createdAt,
      resena: review.resena,
      nombre: review.proveedor.nombre,
      tipo: "Restaurant",
    })),
  ];

  const sortedReviews = extractedReviews.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  });

  const filteredReviews = sortedReviews.filter((item) => {
    const searchLowerCase = searchQuery.toLowerCase();
    const nombreIncludes = item.nombre.toLowerCase().includes(searchLowerCase);
    const resenaIncludes = item.resena.toLowerCase().includes(searchLowerCase);
    const tipoIncludes = item.tipo.toLowerCase().includes(searchLowerCase);

    return nombreIncludes || resenaIncludes || tipoIncludes;
  });

  if (sortedReviews.length === 0) {
    return (
      <DrawerContainer>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="displaySmall">No reviews here</Text>
        </View>
      </DrawerContainer>
    );
  }

  return (
    <DrawerContainer>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ margin: 10 }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredReviews.map((item, index) => (
          <Surface style={styles.surface} key={index}>
            <Text variant="headlineLarge" style={styles.title}>
              {item.nombre.replace("->", "\n")}
            </Text>
            {renderStars(item.calificacion)}
            <Text variant="bodyLarge" style={{ marginTop: 10 }}>
              {item.resena}
            </Text>
            <Text variant="bodyLarge" style={{ marginTop: 10 }}>
              {format(new Date(item.createdAt), "MMM dd HH:mm")}
            </Text>
            <Text variant="bodyLarge" style={styles.resena}>
              {item.tipo}
            </Text>
            <Button mode="contained" onPress={() => handleShareReview(item)}>
              Share Review
            </Button>
          </Surface>
        ))}
      </ScrollView>
    </DrawerContainer>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    elevation: 4,
    margin: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    // marginRight: 8,
    justifyContent: "center",
  },
  resena: {
    marginBottom: 30,
    marginTop: 10,
    // textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "red",
  },
});
