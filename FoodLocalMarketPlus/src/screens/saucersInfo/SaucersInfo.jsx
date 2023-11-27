import { useRoute } from "@react-navigation/native";
import { StackContainer } from "../../components/StackContainer";
import { Icon, MD3Colors, Surface, Text } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { Reviews } from "../../components/Reviews";
import { moneyFormatter } from "../../utils/formatters";

export { SaucersInfo };

const REVIEWS = [
  {
    description: "Great food and friendly service.",
    stars: "5",
    id: "1",
  },
  {
    description: "The atmosphere was cozy and the food was delicious.",
    stars: "4",
    id: "2",
  },
  {
    description:
      "Disappointing experience. The food was cold and the service was slow.",
    stars: "2",
    id: "3",
  },
  {
    description:
      "Highly recommend this place. The staff was attentive and the food was excellent.",
    stars: "5",
    id: "4",
  },
  {
    description: "Average food with average service.",
    stars: "3",
    id: "5",
  },
  {
    description:
      "Terrible experience. The food was overcooked and the staff was rude.",
    stars: "1",
    id: "6",
  },
  {
    description: "The portions were small but the flavors were amazing.",
    stars: "4",
    id: "7",
  },
  {
    description: "Decent food but the prices were too high.",
    stars: "3",
    id: "8",
  },
  {
    description:
      "The service was outstanding and the food exceeded my expectations.",
    stars: "5",
    id: "9",
  },
  {
    description:
      "I wouldn't recommend this place. The food was tasteless and the atmosphere was dull.",
    stars: "2",
    id: "10",
  },
  {
    description: "The food was fresh and the presentation was beautiful.",
    stars: "4",
    id: "11",
  },
  {
    description: "Great value for money. The portion sizes were generous.",
    stars: "5",
    id: "12",
  },
  {
    description: "The service was slow and the food was mediocre.",
    stars: "2",
    id: "13",
  },
  {
    description: "The staff was friendly and the ambiance was relaxing.",
    stars: "4",
    id: "14",
  },
  {
    description: "Overrated restaurant. The food was nothing special.",
    stars: "3",
    id: "15",
  },
];

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
                ? "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png"
                : saucer.imagen,
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
                      (acc, review) => acc + parseInt(review.stars),
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
