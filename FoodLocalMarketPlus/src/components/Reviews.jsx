import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Icon, MD3Colors, Surface, Text } from "react-native-paper";

export { Reviews };

function Reviews({ reviews }) {
  const renderReviewPair = (review1, review2) => {
    return (
      <View
        style={styles.reviewPairContainer}
        key={`pair-${review1.id}-${review2.id}`}
      >
        {renderReview(review1)}
        {renderReview(review2)}
      </View>
    );
  };

  const renderReview = (review) => {
    const stars = Array.from({ length: review.stars }, (_, index) => (
      <Icon key={index} source="star" color={MD3Colors.primary10} size={20} />
    ));

    return (
      <View style={styles.reviewContainer} key={review.id}>
        <View style={styles.starsContainer}>{stars}</View>
        <Text style={styles.reviewText}>{review.descripcion}</Text>
      </View>
    );
  };

  const renderReviews = () => {
    if (reviews.length === 0) {
      // Mostrar mensaje si no hay reseñas
      return (
        <View style={styles.noReviewsContainer}>
          <Text style={styles.noReviewsText}>Aún no hay reseñas.</Text>
        </View>
      );
    }

    const rows = [];

    for (let i = 0; i < reviews.length; i += 2) {
      const review1 = reviews[i];
      const review2 = reviews[i + 1];

      if (review2) {
        rows.push(renderReviewPair(review1, review2));
      } else {
        rows.push(renderReview(review1));
      }
    }

    return rows;
  };
  return (
    <Surface style={styles.reviewsContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderReviews()}
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: {
    flex: 1,
    // marginVertical: 10,
  },
  reviewPairContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    // flex: 1,
  },
  reviewContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  reviewText: {
    marginTop: 8,
  },
  starsContainer: {
    flexDirection: "row", // Para mostrar íconos de estrellas en una fila
    marginRight: 8, // Espacio entre íconos de estrellas y texto
  },
  noReviewsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noReviewsText: {
    fontSize: 16,
    color: MD3Colors.grey600,
  },
});
