import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { Button, IconButton, Surface } from "react-native-paper";

export { DrawerContainer };

function DrawerContainer({ children }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Surface style={styles.drawerNavigationContainer}>
        <View style={styles.drawerNavigation}>
          <IconButton
            icon="menu"
            mode="text"
            onPress={() => navigation.toggleDrawer()}
          ></IconButton>
        </View>
      </Surface>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f7fa",
    flex: 1,
  },
  drawerNavigationContainer: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
  drawerNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});