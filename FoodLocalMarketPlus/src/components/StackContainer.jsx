import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { Button, IconButton, Surface } from "react-native-paper";

export { StackContainer };

function StackContainer({ children }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Surface style={styles.StackNavigationContainer}>
        <View style={styles.StackNavigation}>
          <IconButton
            icon="keyboard-backspace"
            mode="text"
            onPress={() => navigation.goBack()}
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
  StackNavigationContainer: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
  StackNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
