import { useQuery } from "react-query";
import { DrawerContainer } from "../../components/DrawerContainer";
import { useIsFocused } from "@react-navigation/native";
import { getUserInfo } from "./api/profileApi";
import useAuthStore from "../../contexts/AuthStore";
import { StyleSheet, View } from "react-native";
import { Avatar, Surface, Text } from "react-native-paper";
import userImage from "../../../assets/user.jpg";
export { Profile };

function Profile() {
  const isFocused = useIsFocused();
  const { email } = useAuthStore();
  console.log("email", email);
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await getUserInfo(email);
    },
    keepPreviousData: true,
    retry: 5,
    enabled: isFocused,
  });
  const profileData = profileQuery.data;
  console.log("profileData", profileData);

  if (!profileData) {
    // Mostrar mensaje cuando profileData es undefined
    return (
      <DrawerContainer>
        <View style={styles.container}>
          <Text style={styles.errorText}>Perfil no encontrado</Text>
        </View>
      </DrawerContainer>
    );
  }
  return (
    <DrawerContainer>
      <View style={styles.container}>
        <Surface style={styles.surface}>
          {/* Puedes agregar una imagen de perfil si tienes la URL en profilePic */}
          {profileData.profilePic != "algo/Ruta" ? (
            <Avatar.Image size={100} source={{ uri: profileData.profilePic }} />
          ) : (
            <Avatar.Image size={100} source={userImage} />
          )}
          <Text style={styles.text}>{`Nombre: ${profileData.nombre}`}</Text>
          <Text style={styles.text}>{`Apellido: ${profileData.apellido}`}</Text>
          <Text
            style={styles.text}
          >{`Correo Electrónico: ${profileData.email}`}</Text>
          <Text style={styles.text}>{`Teléfono: ${profileData.telefono}`}</Text>
          <Text
            style={styles.text}
          >{`Dirección: ${profileData.direccion}`}</Text>
          <Text style={styles.text}>{`Ciudad: ${profileData.ciudad}`}</Text>
          <Text
            style={styles.text}
          >{`Código Postal: ${profileData.codigoPostal}`}</Text>
          <Text style={styles.text}>{`Estado: ${profileData.estado}`}</Text>
          <Text style={styles.text}>{`País: ${profileData.pais}`}</Text>
          {/* Puedes agregar más campos según sea necesario */}
        </Surface>
      </View>
    </DrawerContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  surface: {
    padding: 16,
    elevation: 4,
    alignItems: "center",
  },
  text: {
    marginVertical: 8,
  },
  errorText: {
    fontSize: 18,
    color: "rgb(186, 26, 26)",
  },
});
