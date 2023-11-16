export { validatePassword };

function validatePassword(password) {
  // Verificar longitud mínima de 10 caracteres
  if (password.length < 10) {
    // console.log("Longitud mínima de 10 caracteres");
    return "Minimum length of 10 characters";
  }

  // Verificar al menos 2 letras mayúsculas
  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  if (uppercaseCount < 2) {
    // console.log("Al menos 2 letras mayúsculas");
    return "At least 2 uppercase letters";
  }

  // Verificar al menos 2 letras minúsculas
  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  if (lowercaseCount < 2) {
    // console.log("Al menos 2 letras minúsculas");
    return "At least 2 lowercase letters";
  }

  // Verificar al menos 3 números no consecutivos
  // const consecutiveNumbers = password.match(/\d{3,}/g);
  // if (consecutiveNumbers) {
  //   // console.log("Al menos 3 números no consecutivos");
  //   return "At least 3 non-consecutive numbers";
  // }

  // Verificar al menos 2 caracteres especiales
  const specialCharacterCount = (
    password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []
  ).length;
  if (specialCharacterCount < 2) {
    // console.log("Al menos 2 caracteres especiales");
    return "At least 2 special characters";
  }

  // Si pasa todas las validaciones, la contraseña es válida
  return true;
}
