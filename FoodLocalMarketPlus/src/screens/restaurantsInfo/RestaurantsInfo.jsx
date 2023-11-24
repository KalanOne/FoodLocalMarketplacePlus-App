import { useRoute } from "@react-navigation/native";
import { StackContainer } from "../../components/StackContainer";
import {
  Button,
  Dialog,
  Divider,
  Icon,
  MD3Colors,
  Portal,
  Surface,
  Text,
} from "react-native-paper";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Reviews } from "../../components/Reviews";

export { RestaurantsInfo };

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

function RestaurantsInfo() {
  const route = useRoute();
  const { restaurant } = route.params;
  const [visible, setVisible] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: restaurant.coordY, // Latitud inicial
    longitude: restaurant.coordX, // Longitud inicial
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Location.setGoogleApiKey("AIzaSyABEUNbIkn64iI2zlSWrc2h8A8E1T1KOw8");

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       // showDialog();
  //     }
  //     setMarkerCoordinate({
  //       latitude: mapRegion.latitude,
  //       longitude: mapRegion.longitude,
  //     });
  //     // console.log("status", status);
  //   };
  //   getPermissions();
  // }, []);

  return (
    <>
      <StackContainer>
        <Image
          source={{
            uri:
              restaurant.profilePic == "providerDefault.png"
                ? "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png"
                : restaurant.profilePic,
          }}
          style={styles.backgroundImage}
        />
        <Surface style={{ marginBottom: 10 }}>
          <View style={styles.titleWithStarsContainer}>
            <Text variant="displaySmall" style={styles.title}>
              {restaurant.nombre}
            </Text>
            <Icon source="star" color={MD3Colors.primary10} size={25} />
            <Text variant="titleLarge">
              {(
                restaurant.resenas.reduce(
                  (acc, review) => acc + parseInt(review.stars),
                  0
                ) / REVIEWS.length
              ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.textsContainer}>
            <Text variant="titleSmall" style={styles.texts}>
              Email: {restaurant.email}
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
              Type of establishment: {restaurant.tipo}
            </Text>
          </View>
          <View style={styles.textsContainer}>
            <Text variant="titleSmall" style={styles.texts}>
              Phone: {restaurant.telefono}
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
              Address: {restaurant.direccion}
            </Text>
          </View>
          <View style={styles.textsContainer}>
            <Text variant="titleSmall" style={styles.texts}>
              City: {restaurant.ciudad}
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
              Postal Code: {restaurant.codigoPostal}
            </Text>
          </View>
          <View style={styles.textsContainer}>
            <Text variant="titleSmall" style={styles.texts}>
              State: {restaurant.estado}
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
              Country: {restaurant.pais}
            </Text>
          </View>
        </Surface>
        <MapView
          style={{ flex: 0.5, width: "100%", marginBottom: 10 }}
          region={mapRegion}
        >
          {markerCoordinate && (
            <Marker
              coordinate={markerCoordinate}
              title="Restaurant location"
              description="This is the restaurant location"
            />
          )}
        </MapView>
        <Reviews reviews={restaurant.resenas} />
      </StackContainer>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Location permissions are necessary, to allow it go to the
              application permissions section in the device settings
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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

// f8f7fa f8f7fa efefef

// Structure of teh restaurant object:
// "email": "mc@gmail.com",
// "createdAt": "2023-11-20T00:52:41.617Z",
// "updatedAt": "2023-11-20T00:52:41.617Z",
// "nombre": "McDonalds",
// "password": "$2b$10$1rbeIwSW0RXrgHwQuXMRKelj.khuFbn/.EoL/9E8GDYA/DeGTLyzC",
// "tipo": "proveedor",
// "telefono": "4435815700",
// "direccion": "R. San Andres",
// "ciudad": "Morelia",
// "codigoPostal": "58056",
// "estado": "Michoacán",
// "pais": "México",
// "profilePic": "algo/Ruta",
// "coordX": 19.67961133807865,
// "coordY": -101.2175383387966
