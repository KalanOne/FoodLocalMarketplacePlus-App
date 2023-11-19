import { useRoute } from "@react-navigation/native";
import { Text, TextInput } from "react-native-paper";
import { StackContainer } from "../../components/StackContainer";
import { useState } from "react";
import { Button } from "react-native";

export { Saucers };

function Saucers() {
  const route = useRoute();
  const { restaurant } = route.params;
  const [value, setValue] = useState("0"); // Valor inicial

  const handleInputChange = (text) => {
    // Validar que solo se ingresen números
    const numericValue = text.replace(/[^0-9]/g, "");
    // Aplicar el mínimo (en este caso, 0)
    const minValue = Math.max(Number(numericValue), 0);
    setValue(minValue.toString());
  };

  const handleIncrement = () => {
    // Incrementar el valor
    setValue((prevValue) => (Number(prevValue) + 1).toString());
  };

  const handleDecrement = () => {
    // Decrementar el valor, evitando que sea menor que el mínimo
    setValue((prevValue) => Math.max(Number(prevValue) - 1, 0).toString());
  };

  return (
    <StackContainer>
      <Button title="Decrementar" onPress={handleDecrement} />
      <TextInput
        value={`${value}`}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        label={"Cantidad"}
      />
      <Button title="Incrementar" onPress={handleIncrement} />
    </StackContainer>
  );
}
