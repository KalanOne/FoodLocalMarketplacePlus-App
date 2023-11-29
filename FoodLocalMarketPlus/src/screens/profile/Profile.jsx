import { useMutation, useQuery, useQueryClient } from "react-query";
import { DrawerContainer } from "../../components/DrawerContainer";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getUserInfo } from "./api/profileApi";
import useAuthStore from "../../contexts/AuthStore";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  MD2Colors,
  Surface,
  Text,
} from "react-native-paper";
import userImage from "../../../assets/user.jpg";
import { CustomTextInput } from "../../components/CustomTextInput";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
export { Profile };

function Profile() {
  const isFocused = useIsFocused();
  const { email } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      ciudad: "",
      codigoPostal: "",
      estado: "",
      pais: "",
    },
  });

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
  // console.log("profileData", profileData);

  const updateInfoMutation = useMutation({
    mutationFn: async (data) => {
      return await updateUserInfo(email, data);
    },
    onSuccess: async (response) => {
      console.log("response", response);
      setIsEditing(false);
      queryClient.invalidateQueries("profile");
      Toast.show({
        type: "success",
        text1: "Message:",
        text2: "Info edited successfully",
        autoHide: false,
      });
    },
    onError: async (error) => {
      Toast.show({
        type: "error",
        text1: "Message:",
        text2: `Info not edited, please try again - ${error.response.data.msg}`,
        autoHide: false,
      });
    },
  });

  useEffect(() => {
    if (profileData && !isEditing) {
      setValue("nombre", profileData.nombre);
      setValue("apellido", profileData.apellido);
      setValue("telefono", profileData.telefono);
      setValue("direccion", profileData.direccion);
      setValue("ciudad", profileData.ciudad);
      setValue("codigoPostal", profileData.codigoPostal);
      setValue("estado", profileData.estado);
      setValue("pais", profileData.pais);
    }
  }, [profileData, isEditing]);

  if (!profileData) {
    return (
      <DrawerContainer>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            animating={true}
            color={MD2Colors.indigo50}
            size={"large"}
          />
        </View>
      </DrawerContainer>
    );
  }

  return (
    <DrawerContainer>
      <ScrollView style={styles.container}>
        <View style={styles.surface}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UpdateProfileImage");
            }}
          >
            {profileData.profilePic != "algo/Ruta" ? (
              <Avatar.Image
                size={100}
                source={{ uri: profileData.profilePic }}
              />
            ) : (
              <Avatar.Image size={100} source={userImage} />
            )}
          </TouchableOpacity>
          <Text style={styles.text}>{`Email: ${profileData.email}`}</Text>
          <View
            style={{
              width: "100%",
            }}
          >
            <CustomTextInput
              control={control}
              name="nombre"
              label="Name"
              rules={{
                required: "This field is required",
              }}
              errors={errors}
              disabled={!isEditing}
            />
            <CustomTextInput
              control={control}
              name="apellido"
              label="Last Name"
              rules={{
                required: "This field is required",
              }}
              errors={errors}
              disabled={!isEditing}
            />
            <CustomTextInput
              control={control}
              name="telefono"
              label="Phone Number"
              rules={{
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must be at most 10 digits",
                },
              }}
              errors={errors}
              disabled={!isEditing}
            />
            <CustomTextInput
              control={control}
              name="direccion"
              label="Address"
              rules={{
                required: "This field is required",
              }}
              errors={errors}
              disabled={!isEditing}
            />
            <CustomTextInput
              control={control}
              name="ciudad"
              label="City"
              rules={{
                required: "This field is required",
              }}
              errors={errors}
              disabled={!isEditing}
            />
            <CustomTextInput
              control={control}
              name="codigoPostal"
              label="Zip Code"
              rules={{
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Zip code must be at least 5 digits",
                },
                maxLength: {
                  value: 5,
                  message: "Zip code must be at most 5 digits",
                },
              }}
              errors={errors}
              disabled={!isEditing}
            />
            <CustomTextInput
              control={control}
              name="estado"
              label="State"
              rules={{
                required: "This field is required",
              }}
              errors={errors}
              disabled={!isEditing}
            />
            <CustomTextInput
              control={control}
              name="pais"
              label="Country"
              rules={{
                required: "This field is required",
              }}
              errors={errors}
              disabled={!isEditing}
            />
            {!isEditing && (
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => setIsEditing(true)}
                  style={{
                    width: "45%",
                  }}
                >
                  Edit Info
                </Button>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate("ChangePassword")}
                  style={{
                    width: "45%",
                  }}
                >
                  Edit Password
                </Button>
              </View>
            )}
            {isEditing && (
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => setIsEditing(false)}
                  style={{
                    width: "45%",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit((data) => {
                    updateInfoMutation.mutate(data);
                  })}
                  style={{
                    width: "45%",
                  }}
                >
                  Edit
                </Button>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </DrawerContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: 10,
  },
  surface: {
    padding: 16,
    elevation: 4,
    alignItems: "center",
    width: "100%",
  },
  text: {
    marginVertical: 8,
  },
  errorText: {
    fontSize: 18,
    color: "rgb(186, 26, 26)",
    textAlign: "center",
    marginTop: 50,
  },
});
