import { useRoute } from "@react-navigation/native";
import { StackContainer } from "../../components/StackContainer";
import { Icon, MD3Colors, Surface, Text } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { Reviews } from "../../components/Reviews";
import { moneyFormatter } from "../../utils/formatters";
import { localhost } from "../../utils/constans";

export { SaucersInfo };

function SaucersInfo() {
  const route = useRoute();
  const { saucer } = route.params;

  return (
    <>
      <StackContainer>
        <Image
          source={{
            uri:
              saucer.imagen == "algo/Ruta"
                ? "https://cdn7.kiwilimon.com/recetaimagen/1277/640x960/17199.jpg.webp"
                : `http://${localhost}:3000${saucer.imagen}`,
          }}
          style={styles.backgroundImage}
        />
        <Surface style={{ marginBottom: 10 }}>
          <View style={styles.titleWithStarsContainer}>
            <Text variant="displaySmall" style={styles.title}>
              {saucer.nombre}
            </Text>
            <Icon source="star" color={MD3Colors.primary10} size={25} />
            <Text variant="titleLarge">
              {saucer.resenas.length != 0
                ? (
                    saucer.resenas.reduce(
                      (acc, review) => acc + parseInt(review.calificacion),
                      0
                    ) / saucer.resenas.length
                  ).toFixed(2)
                : 0}
            </Text>
          </View>
          <View style={styles.textsContainer}>
            <Text variant="titleSmall" style={styles.texts}>
              Description: {saucer.descripcion}
            </Text>
            <Text
              variant="titleSmall"
              style={[
                styles.texts,
                {
                  textAlign: "right",
                },
              ]}
            >
              Price: {moneyFormatter(saucer.precio)}
            </Text>
          </View>
        </Surface>
        <Reviews reviews={saucer.resenas} />
      </StackContainer>
    </>
  );
}

const styles = StyleSheet.create({
  texts: {
    // textAlign: "center",
    // marginTop: 10,
    // marginBottom: 10,
    width: "50%",
  },
  backgroundImage: {
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: 150,
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    marginHorizontal: 10,
  },
  textsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  titleWithStarsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
