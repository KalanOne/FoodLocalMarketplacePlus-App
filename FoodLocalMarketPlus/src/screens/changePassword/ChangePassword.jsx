import React from "react";
import { StyleSheet, View } from "react-native";
import { StackContainer } from "../../components/StackContainer";
import { useForm, useWatch } from "react-hook-form";
import { CustomTextInput } from "../../components/CustomTextInput";
import { Button, Surface, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";

export { ChangePassword };

function ChangePassword() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control, name: "password" });

  const passwordMatch = (value) =>
    value === password || "Passwords do not match";

  const updatePasswordMutation = useMutation({
    mutationFn: async (data) => {
      return await updateUserPassword(email, { password: data.password });
    },
    onSuccess: async (response) => {
      console.log("response", response);
      queryClient.invalidateQueries("profile");
      reset();
      Toast.show({
        type: "success",
        text1: "Message:",
        text2: "Password edited successfully",
        autoHide: false,
      });
    },
    onError: async (error) => {
      Toast.show({
        type: "error",
        text1: "Message:",
        text2: `Password not edited, please try again - ${error.response.data.msg}`,
        autoHide: false,
      });
    },
  });

  return (
    <StackContainer>
      <Surface style={styles.surface}>
        <Text variant="headlineLarge" style={styles.title}>
          Change Password
        </Text>
        <CustomTextInput
          control={control}
          name="password"
          label="Password"
          rules={{
            required: "This field is required",
          }}
          errors={errors}
          secureTextEntry
        />
        <CustomTextInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          rules={{
            required: "This field is required",
            validate: passwordMatch,
          }}
          errors={errors}
          secureTextEntry
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
              console.log(data);
              updatePasswordMutation.mutate(data);
            })}
            style={{
              width: "45%",
            }}
          >
            Save
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
    marginBottom: 10,
    textAlign: "center",
  },
});
