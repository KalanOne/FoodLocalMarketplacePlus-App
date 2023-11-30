import React from "react";
import { StackContainer } from "../../components/StackContainer";
import { useForm, useWatch } from "react-hook-form";
import {
  Button,
  IconButton,
  MD3Colors,
  Surface,
  Text,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CustomTextInput } from "../../components/CustomTextInput";
import { StyleSheet, View } from "react-native";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import useAuthStore from "../../contexts/AuthStore";
import { resenaProduct, resenaRestaurant } from "./api/reviewApi";

export { Review };

function Review() {
  const route = useRoute();
  const { id, productOrRestaurant, idrel, nombre } = route.params;
  console.log("id", id);
  const { email } = useAuthStore();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      calificacion: 0,
      resena: "",
    },
  });

  const calif = useWatch({ control, name: "calificacion" });

  const handleIncrement = () => {
    if (calif === 5) {
      return;
    }
    setValue("calificacion", calif + 1);
  };

  const handleDecrement = () => {
    if (calif === 0) {
      return;
    }
    setValue("calificacion", calif - 1);
  };

  const reviewMutation = useMutation({
    mutationKey: ["review", id],
    mutationFn: async (data) => {
      if (productOrRestaurant === "Product") {
        const newData = {
          ...data,
          idUsuario: email,
          idProducto: id,
          idProductosPedido: idrel,
        };
        return await resenaProduct(newData);
      } else {
        const newData = {
          ...data,
          idUsuario: email,
          idProveedor: id,
          idPedidoProveedor: idrel,
        };
        return await resenaRestaurant(newData);
      }
    },
    onSuccess: () => {
      reset();
      Toast.show({
        type: "success",
        text1: "Review sent",
        text2: "Your review has been sent successfully",
        autoHide: false,
      });
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error.response.data);
      Toast.show({
        type: "error",
        text1: "Message:",
        text2: `Review failed - ${error.response.data.msg}`,
        autoHide: false,
      });
    },
  });

  return (
    <StackContainer>
      <Surface style={styles.surface}>
        <Text variant="headlineLarge" style={styles.title}>
          Review {productOrRestaurant}
        </Text>
        <Text
          variant="headlineSmall"
          style={[styles.title, { marginBottom: 40 }]}
        >
          {nombre}
        </Text>
        <Text variant="titleMedium" style={styles.label}>
          calificacion
        </Text>
        <View style={styles.quantityConatinarer}>
          <IconButton
            icon="minus"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={handleDecrement}
          />
          <Text variant="titleLarge" style={styles.quantityText}>
            {calif}
          </Text>
          <IconButton
            icon="plus"
            iconColor={MD3Colors.primary50}
            size={20}
            onPress={handleIncrement}
          />
        </View>
        <CustomTextInput
          control={control}
          name="resena"
          label="Review"
          rules={{
            required: "This field is required",
          }}
          errors={errors}
        />
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            mode="contained"
            onPress={handleSubmit((data) => {
              reviewMutation.mutate(data);
            })}
            style={{
              width: "45%",
            }}
          >
            Send
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{
              width: "45%",
            }}
          >
            Cancel
          </Button>
        </View>
      </Surface>
    </StackContainer>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 20,
    elevation: 4,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    // marginBottom: 40,
    textAlign: "center",
  },
  quantityConatinarer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: MD3Colors.primary90,
    borderRadius: 100,
    width: "100%",
  },
  quantityText: {
    marginHorizontal: 10,
  },
  label: {
    // marginBottom: 10,
  },
});
