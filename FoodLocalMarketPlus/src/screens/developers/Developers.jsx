import { Avatar, Surface, Text } from "react-native-paper";
import { DrawerContainer } from "../../components/DrawerContainer";
import { StyleSheet, View } from "react-native";
import Arturo from "../../../assets/Arturo.jpg";

export { Developers };

function Developers() {
  return (
    <DrawerContainer>
      <View></View>
      <Text variant="headlineLarge" style={styles.title}>
        Developers & Unique Contributors
      </Text>
      <Surface
        style={[styles.surface, { backgroundColor: "rgb(240, 219, 255)" }]}
      >
        <Text
          variant="headlineSmall"
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          Alan Garcia Diaz
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Avatar.Image
            size={100}
            source={{
              uri: "https://media.licdn.com/dms/image/D5603AQH7-fZrr8eGqg/profile-displayphoto-shrink_800_800/0/1686113473485?e=1707350400&v=beta&t=TBKiGTwycQAIQXo0Cbh9rE7Of0DvL6s1KwK7bo2fDoY",
            }}
          />
        </View>
      </Surface>
      <Surface style={styles.surface}>
        <Text
          variant="headlineSmall"
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          Ulises Rojas Ferreyra
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Avatar.Image
            size={100}
            source={{
              uri: "https://media.licdn.com/dms/image/D5603AQGByF7gJ7Sg9w/profile-displayphoto-shrink_800_800/0/1682824242364?e=1707350400&v=beta&t=lrAjGaZ3uW9lRkoCoELCGTZFhV_Cfj47c5yHccPhh7Y",
            }}
          />
        </View>
      </Surface>
      <Surface style={styles.surface}>
        <Text
          variant="headlineSmall"
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          Arturo Martinez Fuentes
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Avatar.Image size={100} source={Arturo} />
        </View>
      </Surface>
    </DrawerContainer>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    elevation: 5,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    marginVertical: 15,
    textAlign: "center",
  },
});
