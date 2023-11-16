import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";
import { Text, TextInput } from "react-native-paper";

export { CustomTextInput };

function CustomTextInput({
  control,
  name,
  label,
  rules,
  errors,
  secureTextEntry = false,
}) {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={{ marginTop: 30 }}>
          <TextInput
            label={label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors[name]}
            secureTextEntry={secureTextEntry}
          />
          {errors[name] && (
            <Text style={{ color: "rgb(186, 26, 26)" }}>
              {errors[name].message}
            </Text>
          )}
        </View>
      )}
      name={name}
    />
  );
}
