import { Button, RadioButton, Text } from "react-native-paper";
import { StackContainer } from "../../components/StackContainer";
import useCartStore from "../../contexts/CartStore";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { moneyFormatter } from "../../utils/formatters";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomTextInput } from "../../components/CustomTextInput";

export { Cart };

function Cart() {
  const { resetCart, productos, montoTotal } = useCartStore();
  const [value, setValue] = useState("Cash");
  const totalProducts = productos.filter((item) => item.cantidad > 0).length;
  const restaurantes = productos.reduce((restaurantes, producto) => {
    // Agrega el restaurante al conjunto si aún no está presente
    if (!restaurantes.includes(producto.restaurante)) {
      restaurantes.push(producto.restaurante);
    }
    return restaurantes;
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      card: "",
      cvc: "",
    },
  });

  const onSubmitCard = (data) => {
    // console.log("card", data);
    const productosData = productos
      .filter((item) => item.cantidad > 0)
      .map((item) => ({
        id: item.id,
        precio: item.precio,
        cantidad: item.cantidad,
      }));
    const sendData = {
      restaurantes: restaurantes,
      productos: productosData,
      pagado: true,
    };
    console.log("sendDataCard", sendData);
    reset();
  };

  const onSubmitCash = () => {
    console.log("cash");
    const productosData = productos
      .filter((item) => item.cantidad > 0)
      .map((item) => ({
        id: item.id,
        precio: item.precio,
        cantidad: item.cantidad,
      }));
    const sendData = {
      restaurantes: restaurantes,
      productos: productosData,
      pagado: false,
    };
    console.log("sendDataCash", sendData);
  };

  return (
    <StackContainer>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textsContainer}>
            <Text variant="displayLarge" style={styles.title}>
              Cart
            </Text>
            <View style={styles.detailsContainer}>
              <Text variant="displaySmall" style={styles.subtitle}>
                {totalProducts} products
              </Text>
              <Text variant="displaySmall" style={styles.subtitle}>
                Total: {moneyFormatter(montoTotal)}
              </Text>
            </View>
          </View>
          {totalProducts > 0 ? (
            // <KeyboardAvoidingView
            //   style={{
            //     flex: 1,
            //     backgroundColor: "#efefef",
            //   }}
            // >
            //   <ScrollView>
            <>
              <View style={styles.paymentMethodContainer}>
                <Text variant="titleMedium" style={styles.paymentTitle}>
                  Payment Method
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => {
                    setValue(value);
                    if (value === "Cash") {
                      reset();
                    }
                  }}
                  value={value}
                >
                  <RadioButton.Item label="Cash" value="Cash" />
                  <RadioButton.Item label="Credit/Debit Card" value="Card" />
                  {value === "Card" && (
                    <View style={styles.cardContainer}>
                      <CustomTextInput
                        control={control}
                        name="card"
                        label="Credit Card Number"
                        rules={{
                          required: "This field is required",
                        }}
                        errors={errors}
                      />
                      <CustomTextInput
                        control={control}
                        name="cvc"
                        label="CVV/CVC"
                        rules={{
                          required: "This field is required",
                        }}
                        errors={errors}
                      />
                    </View>
                  )}
                </RadioButton.Group>
              </View>
              <Button
                mode="contained"
                onPress={() => {
                  if (value === "Cash") {
                    onSubmitCash();
                  } else {
                    handleSubmit(onSubmitCard)();
                  }
                }}
                style={{ marginTop: 30 }}
              >
                Proceed
              </Button>
              <Button
                mode="contained"
                onPress={resetCart}
                style={{ marginTop: 30 }}
              >
                Reset Cart
              </Button>
            </>
          ) : (
            //   </ScrollView>
            // </KeyboardAvoidingView>
            <>
              <Text variant="displaySmall" style={styles.noProductsText}>
                There are no products in the cart
              </Text>
              <Text variant="displaySmall" style={styles.noProductsText}></Text>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </StackContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
  },
  textsContainer: {
    marginTop: 20,
  },
  title: {
    textAlign: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
  },
  paymentMethodContainer: {
    justifyContent: "space-between",
  },
  paymentTitle: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  cardContainer: {
    marginTop: 0,
  },
  noProductsText: {
    paddingTop: 20,
    textAlign: "center",
  },
});
