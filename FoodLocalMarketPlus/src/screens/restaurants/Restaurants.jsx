import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DrawerContainer } from "../../components/DrawerContainer";
import { Button, Chip, Searchbar, Text } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../contexts/AuthStore";

export { Restaurants };

const DATA = [
  {
    id: "1",
    title: "First Item",
    description: "First Item description",
    category: "Cafe",
  },
  {
    id: "2",
    title: "Second Item",
    description: "Second Item description",
    category: "Restaurant",
  },
  {
    id: "3",
    title: "Third Item",
    description: "Third Item description",
    category: "Cafe",
  },
  {
    id: "4",
    title: "Fourth Item",
    description: "Fourth Item description",
    category: "Bar",
  },
  {
    id: "5",
    title: "Fifth Item",
    description: "Fifth Item description",
    category: "Bakery",
  },
  {
    id: "6",
    title: "Sixth Item",
    description: "Sixth Item description",
    category: "Burger",
  },
  {
    id: "7",
    title: "Seventh Item",
    description: "Seventh Item description",
    category: "Pizza",
  },
  {
    id: "8",
    title: "First Item",
    description: "First Item description",
    category: "Bar",
  },
];

const CATEGORIES = [
  {
    id: "1",
    title: "Cafe",
  },
  {
    id: "2",
    title: "Restaurant",
  },
  {
    id: "3",
    title: "Bar",
  },
  {
    id: "4",
    title: "Bakery",
  },
  {
    id: "5",
    title: "Burger",
  },
  {
    id: "6",
    title: "Pizza",
  },
];

function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();
  console.log("Hola");

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSelectCategory = (title) => {
    if (category.includes(title)) {
      setCategory(category.filter((item) => item !== title));
    } else {
      setCategory([...category, title]);
    }
  };

  return (
    <DrawerContainer>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Delicious food for you
        </Text>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <View>
          <ScrollView
            horizontal
            style={styles.scrollContainerHorizontal}
            showsHorizontalScrollIndicator={false}
          >
            {CATEGORIES.map((categorie) => (
              <Chip
                // icon="information"
                mode="outlined"
                key={categorie.id}
                selected={category.includes(categorie.title)}
                showSelectedOverlay={true}
                showSelectedCheck={true}
                onPress={() => handleSelectCategory(categorie.title)}
                style={{ marginRight: 10 }}
              >
                {categorie.title}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {DATA.map((item) => {
            if (
              (category.length > 0 && !category.includes(item.category)) ||
              !item.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              return null;
            }
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.restaurantConatiner}
                onPress={() => {
                  navigation.navigate("Saucers", { restaurant: item });
                }}
              >
                <Image
                  source={{
                    uri: "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png",
                  }} // Ruta de tu imagen
                  style={styles.backgroundImage}
                />
                <View style={styles.restaurantInfoContainer}>
                  <Text variant="headlineMedium" style={{ marginBottom: 10 }}>
                    {item.title}
                  </Text>
                  <Text variant="titleLarge" style={{ marginBottom: 10 }}>
                    {item.description}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Chip mode="flat">{item.category}</Chip>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </DrawerContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 150,
  },
  scrollContainerHorizontal: {
    marginTop: 10,
    // backgroundColor: "#fff",
    paddingVertical: 10,
  },
  restaurantConatiner: {
    backgroundColor: "#dddddd",
    // backgroundColor: "rgb(240, 219, 255)",
    // padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#66339936",
  },
  restaurantInfoContainer: {
    padding: 10,
  },
});
