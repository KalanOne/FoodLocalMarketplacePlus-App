import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip, Searchbar, Text } from "react-native-paper";
import { useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import {
  getCategoriesRestaurants,
  getRestaurantsProvs,
} from "./api/restaurantsApi";
import { DrawerRestaurantContainer } from "./DrawerRestaurantContainer";

export { Restaurants };

function Restaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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
    retry: 5,
    refetchInterval: 60000,
    enabled: isFocused,
  });
  const restaurantsData = restaurantsQuery.data;

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getCategoriesRestaurants();
    },
    keepPreviousData: true,
    retry: 5,
  });
  const categoriesData = categoriesQuery.data;

  // console.log("restaurantsData", restaurantsData);
  // console.log("restaurantsQuery", restaurantsQuery.data);

  return (
    <DrawerRestaurantContainer>
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
            {categoriesData &&
              categoriesData.map((categorie) => (
                <Chip
                  // icon="information"
                  mode="outlined"
                  key={categorie.id}
                  selected={category.includes(categorie.id)}
                  showSelectedOverlay={true}
                  showSelectedCheck={true}
                  onPress={() => handleSelectCategory(categorie.id)}
                  style={{ marginRight: 10 }}
                >
                  {categorie.nombre}
                </Chip>
              ))}
          </ScrollView>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {restaurantsData ? (
            restaurantsData.map((item) => {
              if (
                (category.length > 0 && !category.includes(item.idCategoria)) ||
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
                        item.profilePic == "providerDefault.png"
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
                      <Chip mode="flat">
                        {categoriesData &&
                          categoriesData.find((cat) => {
                            return cat.id == item.idCategoria;
                          }).nombre}
                      </Chip>
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
    </DrawerRestaurantContainer>
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
