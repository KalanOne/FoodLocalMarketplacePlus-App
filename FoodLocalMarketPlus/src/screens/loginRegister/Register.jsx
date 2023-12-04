import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { CustomTextInput } from "../../components/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { validatePassword } from "../../utils/validations";
import { useMutation } from "react-query";
import { registerUser } from "./api/loginRegisterApi";
import Toast from "react-native-toast-message";

export { Register };

function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      telefono: "",
      direccion: "",
      ciudad: "Morelia",
      estado: "Michoacán",
      pais: "México",
      codigoPostal: "",
      profilePic: "algo/Ruta",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      return await registerUser(data);
    },
    onSuccess: (response) => {
      Toast.show({
        type: "success",
        text1: "Message:",
        text2: "Register successfull, please login",
      });
      reset();
    },
    onError: (error) => {
      // console.log(error.response.data.msg);
      // const errorData = error.msg;
      // console.log("errorData", errorData);
      // console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Message:",
        text2: `Register failed - ${error.response.data.msg}`,
        autoHide: false,
      });
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
    registerMutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <CustomTextInput
          control={control}
          name="nombre"
          label="Name"
          rules={{
            required: "This field is required",
          }}
          errors={errors}
        />
        <CustomTextInput
          control={control}
          name="apellido"
          label="Apellido"
          rules={{
            required: "This field is required",
          }}
          errors={errors}
        />
        <CustomTextInput
          control={control}
          name="email"
          label="Email"
          rules={{
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          errors={errors}
          keyboardType="email-address"
        />
        <CustomTextInput
          control={control}
          name="password"
          label="Password"
          rules={{
            required: "This field is required",
            validate: (value) => validatePassword(value) || "Invalid password",
          }}
          errors={errors}
          secureTextEntry={true}
        />

        <CustomTextInput
          control={control}
          name="telefono"
          label="Phone"
          rules={{
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Must be 10 digits",
            },
            maxLength: {
              value: 10,
              message: "Must be 10 digits",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "Must be only digits",
            },
          }}
          errors={errors}
          keyboardType="numeric"
        />
        <CustomTextInput
          control={control}
          name="direccion"
          label="Address"
          rules={{
            required: "This field is required",
          }}
          errors={errors}
        />
        <CustomTextInput
          control={control}
          name="ciudad"
          label="City"
          rules={{
            required: "This field is required",
          }}
          errors={errors}
        />
        <CustomTextInput
          control={control}
          name="estado"
          label="State"
          rules={{
            required: "This field is required",
          }}
          errors={errors}
        />
        <CustomTextInput
          control={control}
          name="pais"
          label="Country"
          rules={{
            required: "This field is required",
          }}
          errors={errors}
        />
        <CustomTextInput
          control={control}
          name="codigoPostal"
          label="Zip Code"
          rules={{
            required: "This field is required",
            minLength: {
              value: 5,
              message: "Must be 5 digits",
            },
            maxLength: {
              value: 5,
              message: "Must be 5 digits",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "Must be only digits",
            },
          }}
          errors={errors}
          keyboardType="numeric"
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        loading={registerMutation.isLoading}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  inputsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginTop: 60,
  },
});
