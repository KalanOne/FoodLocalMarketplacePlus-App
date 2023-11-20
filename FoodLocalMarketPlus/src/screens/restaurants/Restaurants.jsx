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
import { useQuery } from "react-query";
import { getRestaurantsProvs } from "./api/restaurantsApi";

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

const TIPOS = [
  {
    id: "1",
    title: "Proveedor",
  },
  {
    id: "2",
    title: "Restaurante",
  },
];

function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();
  // const [restaurantsData, setRestaurantsData] = useState([]);
  // const { userToken } = useAuthStore();
  // console.log(userToken);
  // console.log("Hola");

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSelectCategory = (title) => {
    if (category.includes(title)) {
      setCategory(category.filter((item) => item !== title));
    } else {
      setCategory([...category, title]);
    }
  };

  const restaurantsQuery = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      return await getRestaurantsProvs();
    },
    keepPreviousData: true,
    onSuccess: (data) => {
      // console.log("data", data);
      // setRestaurantsData(data.data);
    },
    onError: (error) => {
      // console.log("error", error);
    },
  });

  const restaurantsData = restaurantsQuery.data;
  // console.log("restaurantsData", restaurantsData);
  // console.log("restaurantsQuery", restaurantsQuery.data);

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
            {TIPOS.map((categorie) => (
              <Chip
                // icon="information"
                mode="outlined"
                key={categorie.id}
                selected={category.includes(categorie.title.toLowerCase())}
                showSelectedOverlay={true}
                showSelectedCheck={true}
                onPress={() =>
                  handleSelectCategory(categorie.title.toLowerCase())
                }
                style={{ marginRight: 10 }}
              >
                {categorie.title}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {restaurantsData ? (
            restaurantsData.map((item) => {
              if (
                (category.length > 0 && !category.includes(item.tipo)) ||
                !item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                return null;
              }
              return (
                <TouchableOpacity
                  key={item.email}
                  style={styles.restaurantConatiner}
                  onPress={() => {
                    navigation.navigate("Saucers", { restaurant: item });
                  }}
                >
                  <Image
                    source={{
                      uri:
                        item.profilePic == "algo/Ruta"
                          ? "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png"
                          : item.profilePic,
                    }}
                    style={styles.backgroundImage}
                  />
                  <View style={styles.restaurantInfoContainer}>
                    <Text variant="headlineMedium" style={{ marginBottom: 10 }}>
                      {item.nombre}
                    </Text>
                    <Text variant="titleSmall" style={{ marginBottom: 10 }}>
                      {item.direccion}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Chip mode="flat">{item.tipo}</Chip>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text
              variant="displaySmall"
              style={{ textAlign: "center", marginTop: 30 }}
            >
              No restaurants found
            </Text>
          )}
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
