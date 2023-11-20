import { useRoute } from "@react-navigation/native";
import { StackContainer } from "../../components/StackContainer";
import { Button, Dialog, Portal, Surface, Text } from "react-native-paper";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";

export { RestaurantsInfo };

function RestaurantsInfo() {
  const route = useRoute();
  const { restaurant } = route.params;
  const [visible, setVisible] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: restaurant.coordX, // Latitud inicial
    longitude: restaurant.coordY, // Longitud inicial
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Location.setGoogleApiKey("AIzaSyABEUNbIkn64iI2zlSWrc2h8A8E1T1KOw8");

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // showDialog();
      }
      setMarkerCoordinate({
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude,
      });
      // console.log("status", status);
    };
    getPermissions();
  }, []);

  return (
    <>
      <StackContainer>
        <Image
          source={{
            uri:
              restaurant.profilePic == "algo/Ruta"
                ? "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png"
                : restaurant.profilePic,
          }}
          style={styles.backgroundImage}
        />
        <Text variant="displaySmall" style={styles.texts}>
          {restaurant.nombre}
        </Text>
        <Text variant="titleSmall" style={styles.texts}>
          Email: {restaurant.email}
        </Text>
        <Text variant="titleSmall" style={styles.texts}>
          Type of establishment: {restaurant.tipo}
        </Text>
        <Text variant="titleSmall" style={styles.texts}>
          Phone: {restaurant.telefono}
        </Text>
        <Text variant="titleSmall" style={styles.texts}>
          Address: {restaurant.direccion}
        </Text>
        <Text variant="titleSmall" style={styles.texts}>
          City: {restaurant.ciudad}
        </Text>
        <Text variant="titleSmall" style={styles.texts}>
          Postal Code: {restaurant.codigoPostal}
        </Text>
        <Text variant="titleSmall" style={styles.texts}>
          State: {restaurant.estado}
        </Text>
        <Text variant="titleSmall" style={styles.texts}>
          Country: {restaurant.pais}
        </Text>
        {/* <MapView style={{ flex: 0.7, width: "100%" }} region={mapRegion}>
          {markerCoordinate && (
            <Marker
              coordinate={markerCoordinate}
              title="Restaurant location"
              description="This is the restaurant location"
            />
          )}
        </MapView> */}
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
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  backgroundImage: {
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: 200,
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
