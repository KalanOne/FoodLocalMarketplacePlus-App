import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { StackContainer } from "../../components/StackContainer";
import { Button, Surface, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { getMimeTypeFromExtension } from "../../utils/file";
import { useMutation } from "react-query";
import { updateUserImage } from "./api/imageApi";
import { localhost } from "../../utils/constans";

export { UpdateProfileImage };

function UpdateProfileImage() {
  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);

  const updateImageMutation = useMutation({
    mutationFn: async (data) => {
      return await updateUserImage(data);
    },
    onSuccess: async (response) => {
      console.log("response", response);
      setUrlImage(`http://${localhost}:3000${response}`);
      Toast.show({
        type: "success",
        text1: "Message:",
        text2: "Image Profile edited successfully",
        autoHide: false,
      });
    },
    onError: async (error) => {
      // console.log("error", error.response.data.msg);
      Toast.show({
        type: "error",
        text1: "Message:",
        text2: `Image Profile not edited, please try again - ${error.response.data.msg}`,
        autoHide: false,
      });
    },
  });

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("result", result);
      setImage(result.assets[0]);
    } else {
      Toast.show({
        type: "error",
        text1: "Message:",
        text2: "No image selected",
        autoHide: true,
      });
    }
  };

  const handleUpload = () => {
    const extension = image.uri.split(".").pop();
    const imageType = getMimeTypeFromExtension(extension);
    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      type: imageType,
      name: `image.${extension}`,
    });
    updateImageMutation.mutate(formData);
    // console.log("imageType", imageType);
    // console.log("extension", extension);
    // console.log("image", image);
    // console.log("image.uri", image.uri);
    // console.log("formData", formData);
  };

  return (
    <StackContainer>
      <Surface style={styles.surface}>
        <Button
          mode="contained"
          onPress={pickImageAsync}
          style={styles.buttonTop}
        >
          Select an Image
        </Button>
        {image && (
          <View>
            <Image source={{ uri: image.uri }} style={styles.image} />
            {/* <Text>{image.type}</Text> */}
            <Button mode="contained" onPress={handleUpload}>
              Upload
            </Button>
          </View>
        )}
        {urlImage && (
          <View>
            <Image source={{ uri: urlImage }} style={styles.image} />
          </View>
        )}
      </Surface>
    </StackContainer>
  );
}

const styles = StyleSheet.create({
  buttonTop: {
    // marginTop: 20,
  },
  surface: {
    padding: 20,
    elevation: 4,
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    resizeMode: "cover",
  },
});
